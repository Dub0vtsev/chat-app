import React from 'react';
import styles from './Login.module.css';
import GoogleAuth from '../../components/googleAuth.jsx';

// TODO: smth like right pic design
// https://uxdworld.com/wp-content/uploads/2021/12/banner-5-696x531.png

const Login = () => {
    return (
        <div className={styles.container}>
            <h1>Login</h1>

            <div className={styles.inputs}>
                <span>Email</span>
                <input type="email" id="email" />
                <span>Password</span>
                <input type="password" id="password" />
            </div>


            <button>Login</button>
            <div className={styles.divider}>
                <span>Or</span>
            </div>
            <div className={styles.socialsContainer}>
                <GoogleAuth />
                <a>asdasd</a>
            </div>
        </div>
    )
}

export default Login