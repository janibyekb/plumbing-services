import express from "express";
import { register, login, signOut } from "../controllers/auth.controller.js";

const router = express.Router();

//Auth routes
router.post("/register", register);
router.post("/login", login);
router.get("/signout", signOut);

export default router;
