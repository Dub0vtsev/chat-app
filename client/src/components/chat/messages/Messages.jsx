import React from 'react';
import Message from '../message/Message.jsx';
import './Messages.css';
import useConversations from '../../../store/useConversations';
import useGetMessages from '../../../hooks/useGetMessages.js';

const Messages = () => {
    const { selectedConv } = useConversations();
    const { messages } = useGetMessages();

    return (
        <div className='messagesContainer'>
            {
                messages.map((message) => {
                    return <Message src={selectedConv.userInfo.profilePicture} message={message} key={message._id} />
                })
            }
        </div>
    )
}

export default Messages