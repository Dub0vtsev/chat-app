import React from 'react';
// import './Avatar.css';

const Avatar = ({ src, width, height }) => {
    return (
        <img className='avatar'
            src={src} alt='avatar'
            width={width}
            height={height} />
    )
}

export default Avatar