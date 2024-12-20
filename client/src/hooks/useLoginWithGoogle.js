import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { $host } from '../http/index.js';

const useLoginWithGoogle = () => {
    const { setAuthUser } = useContext(AuthContext);
    const loginWithGoogle = async (credentialResponse) => {
        try {
            const { data } = await $host.post(
                '/auth/google-auth',
                credentialResponse,
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                })

            const { payload } = data;
            setAuthUser(payload);
            localStorage.setItem("authUser", JSON.stringify(payload));

        } catch (error) {
            console.log(error.message);
        }

    }
    return { loginWithGoogle };
}

export default useLoginWithGoogle