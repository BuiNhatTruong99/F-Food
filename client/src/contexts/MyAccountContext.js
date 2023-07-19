import React, { createContext, useState } from 'react';

const MyAccountContext = createContext();

export const MyAccountProvider = ({ children }) => {
    const [accountLayout, setAccountLayout] = useState('myaccount');

    return (
        <MyAccountContext.Provider value={{ accountLayout, setAccountLayout }}>{children}</MyAccountContext.Provider>
    );
};

export default MyAccountContext;
