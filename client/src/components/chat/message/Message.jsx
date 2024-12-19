import React, { useContext } from 'react';
import './Message.css';
import Avatar from '../../avatar/Avatar';
import { AuthContext } from '../../../context/AuthContext';

const Message = ({ src, message }) => {

    const { authUser } = useContext(AuthContext);
    const isFromCurrentUser = authUser._id === message.sender;

    const formatDateTime = (isoDate) => {
        const date = new Date(isoDate);
        return date.toLocaleString('en-US', {
            month: '2-digit', // "12"
            day: '2-digit',   // "16"
            year: 'numeric',  // "2024"
            hour: '2-digit',  // "03"
            minute: '2-digit',// "28"
            hour12: true      // AM/PM формат
        });
    };

    return (
        <div className='messageContainer'>
            {!isFromCurrentUser ?
                <div className="message chatStart">
                    <Avatar src={src} width={40} height={40} />
                    <p>{message.message}</p>
                    <span className='messageDate'>{formatDateTime(message.createdAt)}</span>
                </div>
                :
                <div className="message chatEnd">
                    <p>{message.message}</p>
                    <span className='messageDate'>{formatDateTime(message.createdAt)}</span>
                </div>
            }
        </div>
    )
}

export default Message