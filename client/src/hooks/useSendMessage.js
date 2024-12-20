import useConversations from "../store/useConversations";
import { $host } from '../http/index.js';

const useSendMessage = () => {
    const { messages, setMessages, selectedConv, setConversations, conversations } = useConversations();

    const sendMessage = async (message) => {
        try {
            const { data } = await $host.post(
                `messages/send/${selectedConv.userInfo._id}`,
                { message },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (data) {
                if (data.userMessage) {
                    setMessages((prevMessages) => {
                        return [...prevMessages, data.userMessage];
                    });

                    setConversations((prevConversations) => {
                        return prevConversations.map((conv) =>
                            conv._id === selectedConv._id
                                ? { ...conv, lastMessage: data.userMessage }
                                : conv
                        );
                    });
                } else {
                    setMessages((prevMessages) => {
                        return [...prevMessages, data];
                    });

                    setConversations((prevConversations) => {
                        return prevConversations.map((conv) =>
                            conv._id === selectedConv._id
                                ? { ...conv, lastMessage: data }
                                : conv
                        );
                    });
                }
            }

            // Если есть автоответ от бота, добавляем его с задержкой
            if (data.botMessage) {
                setTimeout(() => {
                    setMessages((prevMessages) => {
                        return [...prevMessages, data.botMessage];
                    });

                    setConversations((prevConversations) => {
                        return prevConversations.map((conv) =>
                            conv._id === selectedConv._id
                                ? { ...conv, lastMessage: data.botMessage }
                                : conv
                        );
                    });
                }, 3000); // Задержка 3 секунды
            }

        } catch (error) {
            console.error("Error sending message:", error.message);
        }
    };

    return { sendMessage };
};

export default useSendMessage;
