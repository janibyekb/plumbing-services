import express from "express";
import {
  deleteUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  getBookings,
} from "../controllers/user.controller.js";

import { restrict, verifyToken } from "../auth/verifyToken.js";

const router = express.Router();
router.get("/", verifyToken, restrict(["admin"]), getAllUsers);

router.put("/:id", verifyToken, restrict(["user"]), updateUser);
router.delete("/:id", verifyToken, restrict(["user"]), deleteUser);

router.get("/bookings", verifyToken, restrict(["user"]), getBookings);
router.put("/:id", verifyToken, restrict(["user"]), updateUser);
router.delete("/:id", verifyToken, restrict(["user"]), deleteUser);
router.get("/:id", verifyToken, restrict(["user"]), getSingleUser);

export default router;
