import { restrict, verifyToken } from "../auth/verifyToken.js";
import {
  createAppointment,
  deleteAppointment,
  getAllAppointments,
  updateAppointment,
} from "../controllers/appointment.controller.js";

import express from "express";

const router = express.Router({ mergeParams: true });

router.get("/", getAllAppointments);
router.post("/", verifyToken, restrict(["user"]), createAppointment);
router.patch("/:id", verifyToken, updateAppointment);
router.delete("/:id", verifyToken, deleteAppointment);

export default router;
