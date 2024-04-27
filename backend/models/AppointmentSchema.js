import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    vendor: {
      type: mongoose.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },

    jobPrice: { type: String },
    date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "done"],
      default: "pending",
    },
    isPaid: {
      type: Boolean,
      default: true,
    },
    duration: {
      type: Number,
      default: 1,
    },
    location: {
      type: String,
    },
    imgUrls: {
      type: Array,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Appointment", appointmentSchema);
