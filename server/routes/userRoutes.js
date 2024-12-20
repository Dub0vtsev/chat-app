import express from 'express';
import {
    getUsersWithNoConversation,
    getUsersAndLastMessage,
    getConversationDetails,
    updateName
}
    from '../controllers/userController.js';
import isAuth from '../middleware/isAuth.js';

const router = express.Router();

router.get("/", isAuth, getUsersAndLastMessage);
router.get("/getUsersWithNoConversation", isAuth, getUsersWithNoConversation);
router.get("/getConversationDetails/:convId", isAuth, getConversationDetails);
router.patch("/updateName/:userId", isAuth, updateName);

export default router;