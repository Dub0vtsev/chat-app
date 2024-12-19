import { useEffect } from 'react';
import useConversations from '../store/useConversations.js';
import { $host } from '../http/index.js';

const useGetMessages = () => {
    const { messages, setMessages, selectedConv } = useConversations();

    useEffect(() => {

        const getMessages = async () => {
            try {
                const { data } = await $host.get(
                    `messages/${selectedConv.userInfo._id}`, {
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
                )
                setMessages(data);
            } catch (error) {
                console.log(error.message);
            }
        }

        if (selectedConv?.userInfo?._id) {
            getMessages();
        }

    }, [selectedConv?.userInfo?._id, setMessages]);

    return { messages }
}

export default useGetMessages