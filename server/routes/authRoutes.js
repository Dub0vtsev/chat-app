import express from 'express';
import { login, logout, signup, googleAuth, verifyToken } from '../controllers/authController.js'

const router = express.Router();

router.get("/login", login);

router.get("/signup", signup);

router.get("/logout", logout);

router.post("/google-auth", googleAuth);

router.post("/verify-token", verifyToken);

export default router;