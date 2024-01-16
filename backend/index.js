import express from "express";

import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();

import authRoute from "./routes/auth.router.js";
import userRoute from "./routes/user.router.js";
import reviewRoute from "./routes/review.router.js";
import plumberRoute from "./routes/plumber.router.js";
import PlumberSchema from "./models/PlumberSchema.js";
//app config
const port = process.env.PORT || 9090;
const app = express();

const corsOptions = {
  origin: true,
};
//db config
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO, {}).then(() => {
      console.log("Connected to MongoDB");
    });
  } catch (err) {
    console.log(err);
  }
};

app.use(express.json());
app.use(cookieParser());

app.use(function (req, res, next) {
  res.set("Access-Control-Allow-Origin", req.headers.origin);
  res.set("Access-Control-Allow-Credentials", "true");
  res.set(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,PATCH,DELETE"
  );
  res.set(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method,Access-Control-Allow-Methods, Access-Control-Request-Headers"
  );
  next();
});

app.get("/", (req, res) => res.send("Ok"));

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/plumbers", plumberRoute);
app.use("/api/reviews", reviewRoute);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(port, () => {
  connectDb();
  console.log("Server is running on port", port);
});
