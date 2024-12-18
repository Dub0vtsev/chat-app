import React from 'react';
import Conversation from '../conversation/Conversation.jsx';
import './Conversations.css';

const Conversations = () => {
    return (
        <div className='conversationsContainer'>
            <h1>Chats</h1>
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
        </div>
    )
}

export default Conversations