import React from 'react';
import './Marquee.css';


const Marquee = ({ text, repeatCount = 100 }) => {

    const repeatedText = Array(repeatCount).fill(text);

    return (
        <div className="marquee-container">
            <div className="marquee-content">
                {repeatedText.map((item, index) => (
                    <span key={index}>{item}</span>
                ))}
            </div>
        </div>
    );
};

export default Marquee;