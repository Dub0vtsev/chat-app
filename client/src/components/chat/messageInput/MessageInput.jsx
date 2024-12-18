import React from 'react';
import './MessageInput.css';

const MessageInput = () => {
    return (
        <div className='inputContainer'>
            <input type='text' placeholder='Type your message' id='sendMessage' />
            <span className="sendIcon" onClick={() => { console.log("ASDASDAs") }}></span>
        </div>
    )
}

export default MessageInput