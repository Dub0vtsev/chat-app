import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import useLoginWithGoogle from '../../hooks/useLoginWithGoogle';

const GoogleAuth = () => {

    const { loginWithGoogle } = useLoginWithGoogle();

    const handleLogin = async (credentialResponse) => {
        await loginWithGoogle(credentialResponse);
    }

    return (
        <GoogleLogin
            onSuccess={credentialResponse => {
                handleLogin(credentialResponse);
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