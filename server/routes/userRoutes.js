import express from 'express';
import { getUsersAndLastMessage } from '../controllers/userController.js';
import isAuth from '../middleware/isAuth.js';

const router = express.Router();

router.get("/", isAuth, getUsersAndLastMessage);

export default router;