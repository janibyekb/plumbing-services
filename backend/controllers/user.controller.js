import User from "../models/UserSchema.js";
import Appointment from "../models/AppointmentSchema.js";
import { errorHandler } from "../utils/error.js";
import VendorSchema from "../models/VendorSchema.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).select("-password");

    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ success: false, message: "No user found!" });
  }
};
export const getSingleUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only get your account data!"));
  try {
    const user = await User.findById(req.params.id).select("-password");

    // const { password, ...rest } = user._doc;

    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ success: false, message: "No user found!" });
  }
};

export const updateUser = async (req, res, next) => {
  //   if (req.user.id !== req.params.id)
  //     return next(errorHandler(401, "You can only update your own account!"));
  console.log(req.body);
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only delete your own account!"));
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    res.status(200).json("User has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const getAppointments = async (req, res, next) => {
  try {
    const appointments = await Appointment.find({ user: req.params.id });

    const vendorIds = appointments.map((el) => el.vendor.id);

    const vendors = await VendorSchema.find({
      _id: { $in: vendorIds },
    }).select("-password");

    res.status(200).json({ data: vendors });
  } catch (error) {
    next(error);
  }
};
