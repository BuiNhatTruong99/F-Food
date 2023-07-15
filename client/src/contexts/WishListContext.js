import React, { createContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { apiCurrentUser } from '~/apis/user';

const WishListContext = createContext();

export const WishListProvider = ({ children }) => {
    const { isLoggedIn } = useSelector((state) => state.user);
    const [isWishListOpen, setIsWishListOpen] = useState(false);
    const [wishListContext, setWishListContext] = useState([]);
    const [flagWl, setFlagWl] = useState(false);
    const fetchWishListData = async () => {
        if (!isLoggedIn) {
            setWishListContext([]);
            return;
        }
        const response = await apiCurrentUser();
        if (response.success) {
            setWishListContext(response.response.wishlist);
        }
    };

    useEffect(() => {
        fetchWishListData();
        setFlagWl(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [flagWl]);

    return (
        <WishListContext.Provider
            value={{ isWishListOpen, setIsWishListOpen, wishListContext, setWishListContext, flagWl, setFlagWl }}
        >
            {children}
        </WishListContext.Provider>
    );
};

export default WishListContext;
