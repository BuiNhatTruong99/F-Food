import React, { createContext, useState } from 'react';
import { useSelector } from 'react-redux';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const { isLoggedIn, current } = useSelector((state) => state.user);
    const [loggedIn, setLoggedIn] = useState(isLoggedIn);

    return <AuthContext.Provider value={{ loggedIn, setLoggedIn, current }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
