import React, { useState } from 'react';
import './MessageInput.css';
import useSendMessage from '../../../hooks/useSendMessage';

const MessageInput = () => {

    const [message, setMessage] = useState('');
    const { sendMessage } = useSendMessage();

    const handleSendMessage = async () => {

        if (!message)
            return;

        await sendMessage(message);
        setMessage('');
    }

    return (
        <div className='inputContainer'>
            <input
                type='text'
                placeholder='Type your message'
                id='sendMessage'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleSendMessage();
                    }
                }} />
            <button className="sendIcon" onClick={() => handleSendMessage()}></button>
        </div>
    )
}

export default MessageInput