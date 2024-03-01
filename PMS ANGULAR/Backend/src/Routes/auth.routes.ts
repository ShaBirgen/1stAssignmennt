// authRoutes.ts
import { Router } from "express";
import { loginUser, registerUser } from "../Controllers/auth.controllers";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
// router.post("/reset-password", resetPassword);

export default router;
