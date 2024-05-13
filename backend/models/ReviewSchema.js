import mongoose from "mongoose";
import Vendor from "./VendorSchema.js";

const reviewSchema = new mongoose.Schema(
  {
    vendor: {
      type: mongoose.Types.ObjectId,
      ref: "Vendor",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    reviewText: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
      default: 0,
    },
  },
  { timestamps: true }
);

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name profileImageUrl",
  });

  next();
});

reviewSchema.statics.calcAverageRatings = async function (vendorId) {
  const stats = await this.aggregate([
    {
      $match: { vendor: vendorId },
    },
    {
      $group: {
        _id: "$vendor",
        numOfRating: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);

  await Vendor.findByIdAndUpdate(vendorId, {
    totalRating: stats[0].numOfRating,
    averageRating: stats[0].avgRating,
  });
};

reviewSchema.post("save", function () {
  this.constructor.calcAverageRatings(this.vendor);
});

export default mongoose.model("Review", reviewSchema);
