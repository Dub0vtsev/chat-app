import express from 'express';
import { sendMessage } from '../controllers/messageController.js';
import isAuth from '../middleware/isAuth.js';

const router = express.Router();

router.post("/send/:recieverId", isAuth, sendMessage);

export default router;