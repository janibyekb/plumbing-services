import { restrict, verifyToken } from "../auth/verifyToken.js";
import {
  createAppointment,
  getAllAppointments,
} from "../controllers/appointment.controller.js";

import express from "express";

const router = express.Router({ mergeParams: true });

router.get("/", getAllAppointments);
router.post("/", verifyToken, restrict(["user"]), createAppointment);
// router.put("/:id", authenticate, restrict(["vendor"]), updateVendor);
// router.delete("/:id", authenticate, restrict(["vendor"]), deleteVendor);

export default router;
