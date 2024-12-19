import React from 'react';
import './MessageInput.css';

const MessageInput = () => {
    return (
        <div className='inputContainer'>
            <input
                type='text'
                placeholder='Type your message'
                id='sendMessage'
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        console.log("ENTER");
                    }
                }} />
            <button className="sendIcon" onClick={() => { console.log("ASDASDAs") }}></button>
        </div>
    )
}

export default MessageInput