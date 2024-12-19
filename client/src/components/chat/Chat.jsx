import React from 'react';
import './Chat.css';
import Avatar from '../avatar/Avatar';
import Messages from './messages/Messages';
import MessageInput from './messageInput/MessageInput';
import useConversations from '../../store/useConversations';

const Chat = () => {
    const { selectedConv, setSelectedConv } = useConversations();
    return (
        <div className='chatContainer'>
            {
                selectedConv
                    ?
                    <>
                        <header className='userTo' >
                            <Avatar src={selectedConv.userInfo.profilePicture} width={45} height={45} />
                            <p className="userName">
                                {selectedConv.userInfo.fullName}
                            </p>
                        </header >
                        <Messages />
                        <MessageInput />
                    </>
                    :
                    <NoChat />
            }
        </div >

    )
}

const NoChat = () => {
    return (
        <div className='noChat'>
            <span>Pick a chat</span>
            <p>and</p>
            Start messaging right now!
        </div>
    );
}

export default Chat