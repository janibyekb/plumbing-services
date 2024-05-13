import User from "../models/UserSchema.js";
import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";
import Vendor from "../models/VendorSchema.js";
import { errorHandler } from "../utils/error.js";

//Sign out endpoint for all the users
export const register = async (req, res) => {
  const { name, email, password, role, profileImageUrl, gender } = req.body;
  console.log(req.body);
  try {
    let user = null;

    if (role === "USER") {
      user = await User.findOne({ email });
    } else if (role === "VENDOR") {
      user = await Vendor.findOne({ email });
    }

    if (user) return res.status(400).send({ message: "user already exist" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    if (role == "USER") {
      user = new User({
        name,
        email,
        password: hashedPassword,
        profileImageUrl,
        gender,
        role,
      });
    }
    if (role == "VENDOR") {
      user = new Vendor({
        name,
        email,
        password: hashedPassword,
        profileImageUrl,
        gender,
        role,
        specialization: "Plumber",
      });
    }

    await user.save();
    res.status(200).send({ message: "User created successfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ sucess: false, message: "Internal server error!" });
  }
};

//Login endpoint
export async function login(req, res, next) {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    let validUser = null;
    const user = await User.findOne({ email });
    const plumber = await Vendor.findOne({ email });

    if (user) {
      validUser = user;
    }
    if (plumber) validUser = plumber;

    console.log(validUser);

    if (!validUser) return next(errorHandler(404, "User not found!"));
    const validPassword = bcrypt.compare(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong credentials!"));
    const token = jwt.sign(
      { id: validUser._id, role: validUser.role },
      process.env.JWT_SECRET
    );

    //Extracting the password from the user info
    const { password: pass, appointments, ...rest } = validUser._doc;

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .send({ ...rest });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

//Log out endpoint
export const signOut = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).send("User has been logged out!");
  } catch (error) {
    console.log(error);
    next(error);
  }
};
