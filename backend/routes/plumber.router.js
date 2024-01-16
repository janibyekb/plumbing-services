import express from "express";
import {
  deletePlumber,
  getAllPlumbers,
  getSinglePlumber,
  updatePlumber,
} from "../controllers/plumber.controller.js";

import { authenticate, restrict } from "../auth/verifyToken.js";

import reviewRouter from "./review.router.js";

const router = express.Router();

router.use("/:plumberId/reviews", reviewRouter);

router.get("/", getAllPlumbers);
router.get("/:id", getSinglePlumber);
router.put("/:id", authenticate, restrict(["plumber"]), updatePlumber);
router.delete("/:id", authenticate, restrict(["plumber"]), deletePlumber);

export default router;
