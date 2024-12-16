import express from 'express';
import { sendMessage, getMessages } from '../controllers/messageController.js';
import isAuth from '../middleware/isAuth.js';

const router = express.Router();

router.post("/send/:recieverId", isAuth, sendMessage);
router.get("/:recieverId", isAuth, getMessages); // sender id is already known

export default router;