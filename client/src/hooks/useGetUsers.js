import { useEffect } from 'react';
import { $host } from '../http/index.js';
import useConversations from '../store/useConversations.js';

const useGetUsers = () => {
    const { usersWithoutConversation, setUsersWithoutConversation } = useConversations();

    useEffect(() => {
        const getUsers = async () => {
            try {
                const { data } = await $host.get('users/getUsersWithNoConversation', {
                    headers: {
                        "Content-Type": "application/json",
                    }
                })

                setUsersWithoutConversation(data);
            } catch (error) {
                console.log(error.message);
            }
        }

        getUsers();
    }, []);

    return { usersWithoutConversation };
}

export default useGetUsers