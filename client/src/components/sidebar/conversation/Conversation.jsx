import React from 'react';
import './Conversation.css';
import Avatar from '../../avatar/Avatar';

const Conversation = () => {
    return (
        <div className='conversation'>
            <Avatar src={'https://www.svgrepo.com/show/492688/avatar-boy.svg'} width={45} height={45} />
            <div className="shortInfo">
                <p className="userName">
                    Test User
                </p>
                <p className="lastMessage">
                    hello
                </p>
            </div>
            <p className='date'>Aug 17, 2022</p>
        </div>
    )
}

export default Conversation