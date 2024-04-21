import jwt from "jsonwebtoken";

import User from "../models/UserSchema.js";
import { errorHandler } from "../utils/error.js";
import VendorSchema from "../models/VendorSchema.js";

export const authenticate = async (req, res, next) => {
  const authToken = req.headers.authorization;

  if (!authToken || !authToken.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token, authorization failed" });
  }

  const token = authToken.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(403, "Forbidden"));

    req.user = user;
    next();
  });
};

export const restrict = (roles) => async (req, res, next) => {
  const userId = req.user.id;
  console.log(userId);

  let user;
  const client = await User.findById(userId);
  const plumber = await VendorSchema.findById(userId);
  if (client) {
    user = client;
  }
  if (plumber) {
    user = plumber;
  }
  console.log(user);

  if (user && roles.includes(user.role)) {
    return next();
  } else {
    return res.status(403).json({ message: "You are not authorized!" });
  }
};

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return next(errorHandler(401, "Unauthorized"));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return next(errorHandler(403, "Forbidden"));
    }

    req.user = user;

    next();
  });
};
