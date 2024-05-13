import express from "express";
import {
  deleteVendor,
  getAllVendors,
  getSingleVendor,
  updateVendor,
} from "../controllers/vendor.controller.js";

import { restrict, verifyToken } from "../auth/verifyToken.js";

import reviewRouter from "./review.router.js";
import appointmentRouter from "./appointment.router.js";

const router = express.Router();

router.use("/:vendorId/reviews", reviewRouter);
router.use("/:vendorId/appointments", appointmentRouter);

router.get("/", getAllVendors);
router.get("/:id", getSingleVendor);
router.patch("/:id", verifyToken, restrict(["VENDOR"]), updateVendor);
router.delete("/:id", verifyToken, restrict(["VENDOR"]), deleteVendor);

export default router;
