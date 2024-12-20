import React, { useState } from 'react';
import Modal from '../../modal/Modal';
import write from '../../../assets/write.svg';
import './Search.css';
import useGetUsers from '../../../hooks/useGetUsers';
import Avatar from '../../avatar/Avatar';
import useConversations from '../../../store/useConversations';
import useCreateConversation from '../../../hooks/useCreateConversation';

const Search = () => {
    const [modalIsOpen, setModalOpen] = useState(false);
    const { usersWithoutConversation } = useGetUsers();
    const { createConversation } = useCreateConversation();
    const { selectedConv, setSelectedConv } = useConversations();

    const handleCreateConv = async (reciever) => {
        if (!reciever)
            return;

        await createConversation(reciever);
        setModalOpen(false);
        //setSelectedConv('');
    }

    return (
        <div className='searchContainer'>
            <label className='searchIcon'>
                <input type='text' placeholder='Search...' className='search' />
            </label>
            <button className='createConversation' onClick={() => setModalOpen(true)}>
                <img src={write} alt='write' id='write' />
            </button>

            <Modal
                isOpen={modalIsOpen}
                onClose={() => setModalOpen(false)}
            >
                <h2>Start chatting with others!</h2>
                <label className='searchIcon'>
                    <input type='text' placeholder='Enter a full name...' className='search' />
                </label>
                <div className="userList">
                    <ul>
                        {usersWithoutConversation.map((user) => {
                            return <li
                                key={user._id}
                                className='user'
                                onClick={() => handleCreateConv(user._id)}
                            >
                                <Avatar src={user?.profilePicture} width={45} height={45} />
                                <p className='userName'>{user?.fullName}</p>
                            </li>
                        })}
                    </ul>
                </div>
            </Modal>
        </div>
    )
}

export default Search;