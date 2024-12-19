import { googleLogout } from "@react-oauth/google";
import { createContext, useState, useEffect } from "react";
import { $host } from "../http/index.js";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(
        JSON.parse(localStorage.getItem("authUser"))
        ||
        null
    );

    useEffect(() => {
        const verifyToken = async () => {
            if (authUser?.token) {
                try {
                    const response = await $host.post('/auth/verify-token', {
                        token: authUser.token,
                    });

                    if (response.status === 200) {
                        setAuthUser(authUser);
                    } else {
                        handleLogout();
                    }
                } catch (err) {
                    console.error("Token verification failed:", err.message);
                    handleLogout();
                }
            }
        };

        verifyToken();
    }, [authUser]);

    const handleLogout = () => {
        localStorage.removeItem("authUser");
        googleLogout();
        setAuthUser(null);
    };

    return <AuthContext.Provider value={{ authUser, setAuthUser, handleLogout }}>
        {children}
    </AuthContext.Provider>
}