import React, { createContext, useState } from 'react';

const PaginationContext = createContext();

export const PaginationProvider = ({ children }) => {
    const [page, setPage] = useState(1);

    return <PaginationContext.Provider value={{ page, setPage }}>{children}</PaginationContext.Provider>;
};

export default PaginationContext;
