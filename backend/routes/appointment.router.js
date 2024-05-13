import { restrict, verifyToken } from "../auth/verifyToken.js";
import {
  createAppointment,
  deleteAppointment,
  getAllAppointments,
  updateAppointment,
} from "../controllers/appointment.controller.js";
import express from "express";

//To access the mounted params before the route
const router = express.Router({ mergeParams: true });

router.get("/", getAllAppointments); //Getting all the appointment
router.post("/", verifyToken, restrict(["USER"]), createAppointment); //Restricing the creation only by clients
router.patch("/:id", verifyToken, updateAppointment);
router.delete("/:id", verifyToken, deleteAppointment);

export default router;
