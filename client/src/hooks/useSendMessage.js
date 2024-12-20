import useConversations from "../store/useConversations";
import { $host } from '../http/index.js';

const useSendMessage = () => {
    const { setMessages, selectedConv, setConversations } = useConversations();

    const sendMessage = async (message) => {
        try {
            const { data } = await $host.post(
                `messages/send/${selectedConv.userInfo._id}`,
                { "message": message },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            // Добавляем отправленное сообщение в список
            setMessages((prevMessages) => {
                return [...prevMessages, data.userMessage];
            });

            // Обновляем информацию о последнем сообщении в диалоге
            setConversations((prevConversations) => {
                return prevConversations.map((conv) =>
                    conv._id === selectedConv._id
                        ? { ...conv, lastMessage: data.userMessage }
                        : conv
                );
            });

            console.log(data.botMessage)

            // Если есть автоответ от бота, добавляем его через 3 секунды
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
                }, 3000); // Задержка 3 секунды перед добавлением автоответа
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return { sendMessage };
};

export default useSendMessage;
