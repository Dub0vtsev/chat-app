import express from 'express';
import { login, logout, signup, googleAuth } from '../controllers/authControllers.js'

const router = express.Router();

router.get("/login", login);

router.get("/signup", signup);

router.get("/logout", logout);

router.post("/google-auth", googleAuth);

export default router;