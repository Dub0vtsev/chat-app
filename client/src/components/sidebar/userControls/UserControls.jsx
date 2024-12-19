import React from 'react';
import { useContext } from 'react';

import Avatar from '../../avatar/Avatar.jsx';
import { AuthContext } from '../../../context/AuthContext.jsx';
import './UserControls.css';

const UserControls = () => {
    const { handleLogout, authUser } = useContext(AuthContext);

    return (
        <div className='userControlsContainer'>
            <div className="user">
                <Avatar src={authUser?.picture} width={45} height={45} />
                <p className='userName'>{authUser?.name}</p>
            </div>
            <button className='logoutBtn' onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default UserControls;