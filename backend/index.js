import express from "express";

import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import path from "path";
import { basename } from "path";
import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();

import authRoute from "./routes/auth.router.js";
import userRoute from "./routes/user.router.js";
import reviewRoute from "./routes/review.router.js";
import vendorRoute from "./routes/vendor.router.js";

//app config
const port = process.env.PORT || 9090;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
console.log(__dirname);
app.use("/", express.static(path.join(__dirname, "../frontend/build/")));

app.get("/", (req, res) => res.send("Ok"));

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/vendors", vendorRoute);
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

app.all("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

app.listen(port, () => {
  connectDb();
  console.log("Server is running on port", port);
});
