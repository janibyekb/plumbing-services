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

router.put("/:id", verifyToken, restrict(["user"]), updateUser);
router.delete("/:id", verifyToken, restrict(["user"]), deleteUser);

router.get("/appointments", verifyToken, restrict(["user"]), getAppointments);
router.patch("/:id", verifyToken, restrict(["user"]), updateUser);
router.delete("/:id", verifyToken, restrict(["user"]), deleteUser);
router.get("/:id", verifyToken, restrict(["user"]), getSingleUser);

export default router;
