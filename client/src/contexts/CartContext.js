import React, { createContext, useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { apiCurrentUser } from '~/apis/user';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { isLoggedIn } = useSelector((state) => state.user);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isWishListOpen, setIsWishListOpen] = useState(false);
    const [flag, setFlag] = useState(false); // flag to trigger useEffect
    const [cart, setCart] = useState([]); // number of items in cart [not used
    const fetchCartData = async () => {
        if (!isLoggedIn) {
            setCart([]);
            return;
        }
        const response = await apiCurrentUser();
        if (response.success) {
            setCart(response.response.cart);
        }
    };

    useEffect(() => {
        fetchCartData();
        setFlag(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isCartOpen, flag]);

    return (
        <CartContext.Provider
            value={{ cart, setCart, isCartOpen, setIsCartOpen, flag, setFlag, isWishListOpen, setIsWishListOpen }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;
