import mongoose from "mongoose";
import config from "../config/index.js";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phoneNumber: { type: Number },
  profileImageUrl: { type: String },
  role: {
    type: String,
    enum: ["user", "vendor"],
    default: "user",
  },
  address: {
    type: String,
  },
  gender: { type: String, enum: ["male", "female"] },
  bloodType: { type: String },
  appointments: [{ type: mongoose.Types.ObjectId, ref: "Appointment" }],
});

export default mongoose.model("User", UserSchema);
