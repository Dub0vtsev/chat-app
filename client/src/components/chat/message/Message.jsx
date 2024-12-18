import React from 'react';
import './Message.css';
import Avatar from '../../avatar/Avatar';

const Message = ({ src, content, date }) => {
    return (
        <div className='messageContainer'>
            {src ?
                <div className="message chatStart">
                    <Avatar src={src} width={40} height={40} />
                    <p>{content}</p>
                    <span className='messageDate'>{date}</span>
                </div>
                :
                <div className="message chatEnd">
                    <p>{content}</p>
                    <span className='messageDate'>{date}</span>
                </div>
            }
        </div>
    )
}

export default Message