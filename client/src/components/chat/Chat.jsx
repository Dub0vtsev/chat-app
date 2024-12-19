import React from 'react';
import './Chat.css';
import Avatar from '../avatar/Avatar';
import Messages from './messages/Messages';
import MessageInput from './messageInput/MessageInput';

const Chat = () => {
    let isChatSelected = false;
    return (
        <div className='chatContainer'>
            {
                isChatSelected
                    ?
                    <>
                        <header className='userTo' >
                            <Avatar src={'https://www.svgrepo.com/show/492688/avatar-boy.svg'} width={45} height={45} />
                            <p className="userName">
                                Test User
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