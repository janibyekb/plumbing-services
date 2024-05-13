import mongoose from "mongoose";

const VendorSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phoneNumber: { type: Number },
  profileImageUrl: { type: String },
  serviceFee: { type: Number },
  role: {
    type: String,
    enum: ["USER", "VENDOR"],
    default: "user",
  },
  specialization: { type: String },
  qualifications: {
    type: Array,
  },
  address: {
    type: String,
  },
  workingRange: {
    type: Number,
    default: 1,
  },
  bio: { type: String, maxLength: 50 },
  about: { type: String },
  timeSlots: { type: Array },
  reviews: [{ type: mongoose.Types.ObjectId, ref: "Review" }],
  averageRating: {
    type: Number,
    default: 0,
  },
  totalRating: {
    type: Number,
    default: 0,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },

  appointments: [{ type: mongoose.Types.ObjectId, ref: "Appointment" }],
});

export default mongoose.model("Vendor", VendorSchema);
