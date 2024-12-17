import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const GoogleAuth = () => {

    return (
        <GoogleLogin
            onSuccess={credentialResponse => {
                console.log(credentialResponse);
            }}
            onError={() => {
                console.log('Login Failed');
            }}
            type='icon'
            shape='circle'
            size='large'
        />);
};
export default GoogleAuth;