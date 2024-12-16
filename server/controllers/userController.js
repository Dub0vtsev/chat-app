import Conversation from '../models/conversationModel.js';

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