import React, { createContext, useState } from 'react';

const LoginLayoutContext = createContext();

export const LoginLayoutProvider = ({ children }) => {
    const [loginLayout, setLoginLayout] = useState(true);
    const [loading, setLoading] = useState(false);
    const [forgotPass, setForgotPass] = useState(false);

    return (
        <LoginLayoutContext.Provider
            value={{ loginLayout, setLoginLayout, loading, setLoading, forgotPass, setForgotPass }}
        >
            {children}
        </LoginLayoutContext.Provider>
    );
};

export default LoginLayoutContext;
