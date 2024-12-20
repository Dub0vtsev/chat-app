import React, { useState } from 'react';

import Avatar from '../avatar/Avatar';
import Messages from './messages/Messages';
import MessageInput from './messageInput/MessageInput';
import Modal from '../modal/Modal.jsx';

import useConversations from '../../store/useConversations';
import useChangeName from '../../hooks/useChangeName.js';
import useDeleteConversation from '../../hooks/useDeleteConversation.js';

import settings from '../../assets/settings.svg';
import bin from '../../assets/bin.svg';

import './Chat.css';

const Chat = () => {
    const { selectedConv } = useConversations();
    const { updateName } = useChangeName();
    const { deleteConversation } = useDeleteConversation();
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [newName, setNewName] = useState('');

    const handleUpdateName = async (newName) => {

        if (!newName || !newName.trim())
            return;

        await updateName(newName);

        setNewName('');
        setEditModalOpen(false);
    }

    return (
        <div className='chatContainer'>
            {
                selectedConv
                    ?
                    <>
                        <header className='userTo' >
                            <div className='infoContainer'>
                                <Avatar src={selectedConv?.userInfo?.profilePicture} width={45} height={45} />
                                <p className="userName">
                                    {selectedConv?.userInfo?.fullName}
                                </p>
                            </div>
                            <div className='infoContainer'>
                                {
                                    selectedConv?.userInfo?.fullName.includes("Bot")
                                        ?
                                        <></>
                                        :
                                        <>
                                            <img
                                                src={settings}
                                                width='40px'
                                                height='40px'
                                                alt='change name'
                                                id='settings'
                                                onClick={() => { setEditModalOpen(true) }}
                                            />
                                            <img
                                                src={bin}
                                                width='36px'
                                                height='36px'
                                                alt='delete chat'
                                                id='deleteChat'
                                                onClick={() => { setDeleteModalOpen(true) }}
                                            />
                                        </>
                                }
                            </div>

                        </header >
                        <Messages />
                        <MessageInput />
                    </>
                    :
                    <NoChat />
            }

            <Modal
                isOpen={isEditModalOpen}
                onClose={() => setEditModalOpen(false)}
            >
                <h2>Edit Name</h2>
                <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Enter new name"
                    className='newNameInput'
                />
                <button
                    onClick={() => handleUpdateName(newName)}
                >
                    Save
                </button>
            </Modal>

            <Modal
                isOpen={isDeleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
            >
                <h2>Are you sure you want to delete this chat?</h2>
                <button
                    onClick={() => deleteConversation(selectedConv?._id) && setDeleteModalOpen(false)}
                >
                    Delete
                </button>
            </Modal>
        </div >

    )
}

const NoChat = () => {
    return (
        <div className='noChat'>
            <span>Pick a chat</span>
            <p>and</p>
            Start messaging right now!
        </div>
    );
}

export default Chat