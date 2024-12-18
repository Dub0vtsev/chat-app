import React from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Chat from '../../components/chat/Chat';

import './Main.css';

const Main = () => {
    return (
        <div className='mainContainer'>
            <Sidebar />
            <Chat />
        </div>
    )
}

export default Main;