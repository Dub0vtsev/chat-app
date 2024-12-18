import React from 'react';

import './Login.css';

import GoogleAuth from '../../components/GoogleAuth.jsx';
import Marquee from '../../components/marquee/Marquee.jsx';

import linkedin from '../../assets/linkedin.svg';
import facebook from '../../assets/facebook.svg';
import github from '../../assets/github.svg';

// reference: (right picture)
// https://uxdworld.com/wp-content/uploads/2021/12/banner-5-696x531.png

const Login = () => {
    return (
        <div className="container">
            <Marquee text='only Google authentication works - ' />
            <h1>Login</h1>

            <div className="inputs">
                <span>Email</span>
                <input type="email" id="email" />
                <span>Password</span>
                <input type="password" id="password" />
            </div>


            <button>Login</button>
            <div className="divider">
                <span>Or</span>
            </div>
            <div className="socialsContainer">
                <GoogleAuth />
                <img src={facebook} width='38px' height='38px' alt='facebook auth' id='facebook' />
                <img src={linkedin} width='38px' height='38px' alt='linkedin auth' id='linkedin' />
                <img src={github} width='38px' height='38px' alt='github auth' id='github' />
            </div>
        </div >
    )
}

export default Login