import React from 'react';

import UserControls from './userControls/UserControls.jsx';
import Search from './search/Search.jsx';
import Conversations from './conversations/Conversations.jsx';

import './Sidebar.css';

const Sidebar = () => {
    return (
        <div className='sidebarContainer'>
            <header>
                <UserControls />
                <Search />
            </header>
            <Conversations />
        </div>
    )
}

export default Sidebar;