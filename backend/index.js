import express from "express";

import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import path from "path";
import { basename } from "path";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import methodOverride from "method-override";
import morgan from "morgan";

import authRoute from "./routes/auth.router.js";
import userRoute from "./routes/user.router.js";
import reviewRoute from "./routes/review.router.js";
import vendorRoute from "./routes/vendor.router.js";
import appointmentRoute from "./routes/appointment.router.js";

import dotenv from "dotenv";
dotenv.config();

//app config
const port = process.env.PORT || 9090;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const corsOptions = {
  origin: true,
};
//Connecting to MongoDb using mongoose
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

//Cors setup
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

app.use(bodyParser.urlencoded({ extended: false })); // use body parser so we can grab information from POST requests
app.use(bodyParser.json());
app.use(methodOverride("X-HTTP-Method-Override"));
app.use(morgan("combined")); //request info logging

//Serving statis client side from the frontend build folder
app.use("/", express.static(path.join(__dirname, "../frontend/build/")));

//Api Routes for specific entities
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/vendors", vendorRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/appointments", appointmentRoute);

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
