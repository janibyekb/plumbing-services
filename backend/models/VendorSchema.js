import mongoose from "mongoose";

const VendorSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phoneNumber: { type: Number },
  profileImageUrl: { type: String },
  serviceFee: { type: Number },
  role: {
    type: String,
    enum: ["user", "vendor"],
    default: "user",
  },

  specialization: { type: String },
  qualifications: {
    type: Array,
  },

  address: {
    type: String,
  },

  username: {
    type: String,
  },

  bio: { type: String, maxLength: 50 },
  about: { type: String },
  timeSlots: { type: Array },
  reviews: [{ type: mongoose.Types.ObjectId, ref: "Review" }],
  gender: { type: String, enum: ["male", "female"] },
  averageRating: {
    type: Number,
    default: 0,
  },
  totalRating: {
    type: Number,
    default: 0,
  },
  isApproved: {
    type: String,
    enum: ["pending", "approved", "cancelled"],
    default: "pending",
  },
  appointments: [{ type: mongoose.Types.ObjectId, ref: "Appointment" }],
});

export default mongoose.model("Vendor", VendorSchema);
