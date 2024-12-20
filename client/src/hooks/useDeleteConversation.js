import { $host } from '../http/index.js';
import useConversations from '../store/useConversations.js';

const useDeleteConversation = () => {
    const { selectedConv, setConversations, setSelectedConv } = useConversations();

    const deleteConversation = async () => {
        try {
            const { data } = await $host.delete(
                `/messages/deleteConversation/${selectedConv?._id}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log(data);

            setConversations((prevConversations) =>
                prevConversations.filter((conv) => conv._id !== selectedConv?._id)
            );

            setSelectedConv(null);

        } catch (error) {
            console.log(error.message);
        }
    }

    return { deleteConversation };
}

export default useDeleteConversation;