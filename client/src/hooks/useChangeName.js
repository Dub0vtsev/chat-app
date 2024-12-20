
import { $host } from '../http/index.js';
import useConversations from '../store/useConversations.js';

const useChangeName = () => {
    const { selectedConv, setConversations, setSelectedConv } = useConversations();

    const updateName = async (newName) => {
        try {
            const { data: updatedUser } = await $host.patch(
                `/users/updateName/${selectedConv?.userInfo?._id}`,
                { fullName: newName },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            setConversations((prevConversations) =>
                prevConversations.map((conv) => {
                    if (conv.userInfo._id === selectedConv?.userInfo?._id) {
                        return {
                            ...conv,
                            userInfo: {
                                ...conv.userInfo,
                                fullName: updatedUser.fullName,
                            },
                        };
                    }
                    return conv;
                })
            );
            setSelectedConv(null)

        } catch (error) {
            console.log(error.message);
        }
    }

    return { updateName };
}

export default useChangeName;