import React from 'react';
import './Conversation.css';
import Avatar from '../../avatar/Avatar';
import useConversations from '../../../store/useConversations.js';

const Conversation = ({ conv, lastMessage, userInfo }) => {

    const { selectedConv, setSelectedConv } = useConversations();
    const isSelected = selectedConv?._id === conv._id;

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
        });
    };

    return (
        <div
            className={`conversation ${isSelected ? "selected" : ""}`}
            onClick={() => { setSelectedConv(conv) }}
        >
            <Avatar src={userInfo.profilePicture} width={45} height={45} />
            <div className="shortInfo">
                <p className="userName">
                    {userInfo.fullName}
                </p>
                <p className="lastMessage">
                    {
                        (lastMessage.message.length >= 25) ?
                            lastMessage.message.slice(0, 25) + '...'
                            :
                            lastMessage.message
                    }
                </p>
            </div>
            <p className='date'>{formatDate(lastMessage.createdAt)}</p>
        </div>
    )
}

export default Conversation