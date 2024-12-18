import React from 'react';
import write from '../../../assets/write.svg';
import './Search.css';

const Search = () => {
    return (
        <div className='searchContainer'>
            <label className='searchIcon'>
                <input type='text' placeholder='Search...' className='search' />
            </label>
            <button className='createConversation'>
                <img src={write} alt='write' id='write' />
            </button>
        </div>
    )
}

export default Search;