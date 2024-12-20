import Conversation from '../models/conversationModel.js';
import User from '../models/userModel.js';
import Message from '../models/messageModel.js';

export const getUsersAndLastMessage = async (req, res) => {
    try {
        const currUserId = req.user._id;

        const conversations = await Conversation.aggregate([
            {
                $match: {
                    participants: currUserId
                }
            },
            {
                $project: {
                    participants: 1,
                    lastMessage: { $arrayElemAt: ['$messages', -1] }
                }
            },
            {
                $lookup: {
                    from: 'messages',
                    localField: 'lastMessage',
                    foreignField: '_id',
                    as: 'lastMessage'
                }
            },
            {
                $project: {
                    participants: 1,
                    lastMessage: { $arrayElemAt: ['$lastMessage', 0] }
                }
            },
            {
                $unwind: '$participants'
            },
            {
                $match: {
                    participants: { $ne: currUserId }
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'participants',
                    foreignField: '_id',
                    as: 'userInfo'
                }
            },
            {
                $project: {
                    userInfo: { $arrayElemAt: ['$userInfo', 0] },
                    lastMessage: 1
                }
            }
        ]);

        res.status(200).json(conversations);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: `Error: ${err.message}` });
    }
};

export const getUsersWithNoConversation = async (req, res) => {
    try {
        const currUserId = req.user._id;

        const conversations = await Conversation.find({
            participants: currUserId
        }).select('participants');

        const userIdsInConversations = new Set();
        conversations.forEach(conversation => {
            conversation.participants.forEach(participant => {
                if (participant.toString() !== currUserId.toString()) {
                    userIdsInConversations.add(participant.toString());
                }
            });
        });

        const usersWithoutConversation = await User.find({
            _id: {
                $nin: [...userIdsInConversations, currUserId]
            }
        });

        res.status(200).json(usersWithoutConversation);

    } catch (err) {
        console.error(err);
        res.status(400).json({ error: `Error: ${err.message}` });
    }
};

export const getConversationDetails = async (req, res) => {
    try {
        const { convId } = req.params;

        const conversation = await Conversation.findById(convId).populate('participants', 'fullName profilePicture email');
        const lastMessage = await Message.findOne({ convId }).sort({ createdAt: -1 });

        res.status(200).json({
            ...conversation.toObject(),
            lastMessage,
            userInfo: conversation.participants.find((user) => user._id.toString() !== req.user.id),
        });

    } catch (err) {
        console.error(err);
        res.status(400).json({ error: `Error: ${err.message}` });
    }
};

export const updateName = async (req, res) => {
    try {
        const { userId } = req.params;
        const { fullName } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { fullName },
            { new: true }
        );

        res.status(200).json(updatedUser);

    } catch (err) {
        console.error(err);
        res.status(400).json({ error: `Error: ${err.message}` });
    }
};