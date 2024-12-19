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
        } catch (error) {
            console.log(error.message);
        }
    };

    return { sendMessage };
};

export default useSendMessage;
