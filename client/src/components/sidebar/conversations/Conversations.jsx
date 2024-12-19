import React from 'react';
import Conversation from '../conversation/Conversation.jsx';
import './Conversations.css';
import useGetConversations from '../../../hooks/useGetConversations.js';

const Conversations = () => {

    const { conversations } = useGetConversations();
    return (
        <div className='conversationsContainer'>
            <h1>Chats</h1>
            {
                conversations.map((el) => {
                    return (
                        <Conversation lastMessage={el.lastMessage} userInfo={el.userInfo} conv={el} key={el._id} />
                    )
                })
            }
        </div>
    )
}

export default Conversations