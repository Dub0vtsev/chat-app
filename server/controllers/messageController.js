import Conversation from '../models/conversationModel.js';
import Message from '../models/messageModel.js';

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { recieverId } = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, recieverId] }
        });

        // if first message is sent
        if (!conversation) {
            conversation = Conversation.create({
                participants: [senderId, recieverId]
            });
        }

        const newMessage = new Message({
            sender: senderId,
            reciever: recieverId,
            message
        });

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        await Promise.all([conversation.save(), newMessage.save()]);

        res.status(200).json(newMessage);

    } catch (err) {
        res.status(400).json({ error: `Error: ${err.message}` });
    }
}