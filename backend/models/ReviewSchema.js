import mongoose from "mongoose";
import Plumber from "./PlumberSchema.js";

const reviewSchema = new mongoose.Schema(
  {
    plumber: {
      type: mongoose.Types.ObjectId,
      ref: "Plumber",
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
    select: "name photo",
  });

  next();
});

reviewSchema.statics.calcAverageRatings = async function (plumberId) {
  const stats = await this.aggregate([
    {
      $match: { plumber: plumberId },
    },
    {
      $group: {
        _id: "$plumber",
        numOfRating: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);

  await Plumber.findByIdAndUpdate(plumberId, {
    totalRating: stats[0].numOfRating,
    averageRating: stats[0].avgRating,
  });
};

reviewSchema.post("save", function () {
  this.constructor.calcAverageRatings(this.plumber);
});

export default mongoose.model("Review", reviewSchema);
