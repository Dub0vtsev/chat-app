import { useState, useEffect } from 'react';
import { $host } from '../http/index.js';
import useConversations from '../store/useConversations.js';

const useGetConversations = () => {
    const { conversations, setConversations } = useConversations();

    useEffect(() => {
        const getConversations = async () => {
            try {
                const { data } = await $host.get('users/', {
                    headers: {
                        "Content-Type": "application/json",
                    }
                })

                setConversations(data);
            } catch (error) {
                console.log(error.message);
            }
        }

        getConversations();
    }, []);

    return { conversations };
}

export default useGetConversations