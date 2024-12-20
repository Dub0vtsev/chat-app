import useConversations from "../store/useConversations";
import useGetConversations from "./useGetConversations.js";
import { $host } from '../http/index.js';

const useCreateConversation = () => {
    const { setUsersWithoutConversation, setConversations, setSelectedConv } = useConversations();

    const createConversation = async (reciever) => {
        try {
            const { data: conversation } = await $host.post(
                `messages/createConversation/${reciever}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const { data: detailedConversation } = await $host.get(
                `users/getConversationDetails/${conversation._id}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            setConversations((prevConversations) => [
                ...prevConversations,
                detailedConversation,
            ]);

            setUsersWithoutConversation((prevUsers) =>
                prevUsers.filter((user) => user._id !== reciever)
            );

            setSelectedConv(detailedConversation);

        } catch (error) {
            console.log(error.message);
        }
    };

    return { createConversation };
};

export default useCreateConversation;