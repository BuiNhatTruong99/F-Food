import React, { createContext, useState } from 'react';

const LoginLayoutContext = createContext();

export const LoginLayoutProvider = ({ children }) => {
    const [loginLayout, setLoginLayout] = useState(true);
    const [loading, setLoading] = useState(false);

    return (
        <LoginLayoutContext.Provider value={{ loginLayout, setLoginLayout, loading, setLoading }}>
            {children}
        </LoginLayoutContext.Provider>
    );
};

export default LoginLayoutContext;
