import express from "express";
import {
  getAllReviews,
  createReview,
} from "../controllers/review.controller.js";

import { restrict, verifyToken } from "../auth/verifyToken.js";

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(getAllReviews)
  .post(verifyToken, restrict(["USER"]), createReview);

export default router;
