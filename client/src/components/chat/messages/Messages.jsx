import React from 'react';
import Message from '../message/Message.jsx';
import './Messages.css';
import useConversations from '../../../store/useConversations';

const Messages = () => {
    const { selectedConv, setSelectedConv } = useConversations();

    return (
        <div className='messagesContainer'>
            <Message src={selectedConv.userInfo.profilePicture} content='asdasdasd' date='8/17/2022, 7:45 AM' />
            <Message content='asdasdasd' date='8/17/2022, 7:45 AM' />
            <Message content='asdasdasd' date='8/17/2022, 7:45 AM' />
            <Message content='asdasdasd' date='8/17/2022, 7:45 AM' />
            <Message content='asdasdasd' date='8/17/2022, 7:45 AM' />
            <Message content='asdasdasd' date='8/17/2022, 7:45 AM' />
            <Message content='asdasdasd' date='8/17/2022, 7:45 AM' />
            <Message src={selectedConv.userInfo.profilePicture} content='asdasdasd' date='8/17/2022, 7:45 AM' />
            <Message content='asdasdasd' date='8/17/2022, 7:45 AM' />
            <Message src={selectedConv.userInfo.profilePicture} content='asdasdasd' date='8/17/2022, 7:45 AM' />
            <Message src={selectedConv.userInfo.profilePicture} content='asdasdasd' date='8/17/2022, 7:45 AM' />
            <Message src={selectedConv.userInfo.profilePicture} content='asdasdasd' date='8/17/2022, 7:45 AM' />
            <Message content='asdasdasd' date='8/17/2022, 7:45 AM' />

        </div>
    )
}

export default Messages