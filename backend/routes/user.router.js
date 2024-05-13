import express from "express";
import {
  deleteUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  getAppointments,
} from "../controllers/user.controller.js";

import { restrict, verifyToken } from "../auth/verifyToken.js";
import appointmentRouter from "./appointment.router.js";

const router = express.Router();

router.use("/:userId/appointments", appointmentRouter);

router.get(
  "/",
  //verifyToken, restrict(["admin"]),
  getAllUsers
);

router.put("/:id", verifyToken, restrict(["USER"]), updateUser);
router.delete("/:id", verifyToken, restrict(["USER"]), deleteUser);

router.get("/appointments", verifyToken, restrict(["USER"]), getAppointments);
router.patch("/:id", verifyToken, restrict(["USER"]), updateUser);
router.delete("/:id", verifyToken, restrict(["USER"]), deleteUser);
router.get("/:id", verifyToken, restrict(["USER"]), getSingleUser);

export default router;
