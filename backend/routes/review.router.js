import express from "express";
import {
  getAllReviews,
  createReview,
} from "../controllers/review.controller.js";

import { restrict, verifyToken } from "../auth/verifyToken.js";

//To access the mounted params before the route
const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(getAllReviews)
  .post(verifyToken, restrict(["USER"]), createReview); //Restricing the creation only by clients

export default router;
