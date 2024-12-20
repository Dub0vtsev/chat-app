import axios from 'axios';

import Conversation from '../models/conversationModel.js';
import Message from '../models/messageModel.js';

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { recieverId } = req.params;
        const senderId = req.user._id;

        const botIds = [process.env.BOT_1_ID, process.env.BOT_2_ID, process.env.BOT_3_ID];
        const isBotMessage = botIds.includes(recieverId);

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, recieverId] }
        });

        // if first message is sent
        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, recieverId],
            });
        };

        const newMessage = new Message({
            sender: senderId,
            reciever: recieverId,
            message
        });

        if (newMessage) {
            conversation?.messages.push(newMessage._id);
        };

        await Promise.all([conversation.save(), newMessage.save()]);

        // Если сообщение отправлено боту, запрашиваем автоответ
        if (isBotMessage) {
            try {
                // Получаем случайную цитату с API
                const response = await axios.get('http://api.quotable.io/random');
                const botMessage = response.data.content;

                // Создаём сообщение автоответа от бота
                const botMessageData = new Message({
                    sender: recieverId, // ID бота
                    reciever: senderId,  // Отправляется пользователю
                    message: botMessage
                });

                // Добавляем его в диалог
                conversation.messages.push(botMessageData._id);
                await botMessageData.save();
                await conversation.save();

                // Отправляем автоответ
                res.status(200).json({
                    userMessage: newMessage,
                    botMessage: botMessageData
                });
            } catch (err) {
                console.error("Error fetching quote:", err.message);
                res.status(200).json(newMessage); // Если не получилось получить цитату, возвращаем просто сообщение
            }
        } else {
            res.status(200).json(newMessage);
        }

    } catch (err) {
        res.status(400).json({ error: `Error: ${err.message}` });
    }
};

export const getMessages = async (req, res) => {
    try {
        const { recieverId } = req.params; // person to who messages were sent
        const senderId = req.user._id; // person who makes request to get messages

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, recieverId] }
        }).populate("messages");

        if (!conversation) {
            return res.status(200).json([]);
        }

        return res.status(200).json(conversation.messages);
    } catch (err) {
        res.status(400).json({ error: `Error: ${err.message}` });
    }
};

export const createConversation = async (req, res) => {
    try {
        const { recieverId } = req.params; // person to who messages were sent
        const senderId = req.user._id; // person who makes request to get messages

        const conversation = await Conversation.create({
            participants: [senderId, recieverId]
        })

        if (!conversation) {
            return res.status(200).json([]);
        }

        return res.status(200).json(conversation);
    } catch (err) {
        res.status(400).json({ error: `Error: ${err.message}` });
    }
};

export const deleteConversation = async (req, res) => {
    try {
        const { selectedConv } = req.params;

        const conversation = await Conversation.findById(selectedConv);
        console.log(selectedConv)

        if (!conversation) {
            return res.status(404).json({ error: "Conversation not found" });
        }

        await Message.deleteMany({ _id: { $in: conversation.messages } });
        await Conversation.findByIdAndDelete(selectedConv);

        res.status(200).json({ message: "Conversation and its messages deleted successfully" });

    } catch (err) {
        res.status(400).json({ error: `Error: ${err.message}` });
    }
}