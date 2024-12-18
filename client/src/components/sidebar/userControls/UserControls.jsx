import React from 'react';
import Avatar from '../../avatar/Avatar.jsx';
import './UserControls.css';

const UserControls = () => {
    return (
        <div className='userControlsContainer'>
            <div className="user">
                <Avatar src='https://www.svgrepo.com/show/492688/avatar-boy.svg' width={45} height={45} />
                <p className='userName'>Kostiantyn Dubovtsev</p>
            </div>
            <button className='logoutBtn'>Logout</button>
        </div>
    )
}

export default UserControls;