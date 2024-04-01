import express from "express";
import {
  deleteVendor,
  getAllVendors,
  getSingleVendor,
  updateVendor,
} from "../controllers/vendor.controller.js";

import { authenticate, restrict } from "../auth/verifyToken.js";

import reviewRouter from "./review.router.js";

const router = express.Router();

router.use("/:vendorId/reviews", reviewRouter);

router.get("/", getAllVendors);
router.get("/:id", getSingleVendor);
router.put("/:id", authenticate, restrict(["vendor"]), updateVendor);
router.delete("/:id", authenticate, restrict(["vendor"]), deleteVendor);

export default router;
