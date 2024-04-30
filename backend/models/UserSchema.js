import mongoose from "mongoose";
import config from "../config/index.js";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phoneNumber: { type: Number },
  profileImageUrl: { type: String },
  role: {
    type: String,
    enum: ["USER", "VENDOR"],
    default: "USER",
  },
  address: {
    type: String,
  },
  appointments: [{ type: mongoose.Types.ObjectId, ref: "Appointment" }],
});

export default mongoose.model("User", UserSchema);
