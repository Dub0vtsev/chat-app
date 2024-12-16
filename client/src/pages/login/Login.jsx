import React from 'react';
import styles from './Login.module.css';
import GoogleAuth from '../../components/googleAuth.jsx';

// TODO: smth like right pic design
// https://uxdworld.com/wp-content/uploads/2021/12/banner-5-696x531.png

const Login = () => {
    return (
        <div>
            <p>Login</p>
            <input />
            <input />
            <button>Login</button>
            <div>
                <span>Or</span>
            </div>
            <div>
                <GoogleAuth />
                <a>Facebook</a>
                <a>LinkedIn</a>
            </div>
        </div>
    )
}

export default Login