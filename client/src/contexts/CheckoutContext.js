import React, { createContext, useState } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import CartContext from './CartContext';

const CheckoutContext = createContext();

export const CheckoutProvider = ({ children }) => {
    const { cart } = useContext(CartContext);

    const [couponValue, setCouponValue] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [couponCode, setCouponCode] = useState('');
    const [checkoutSuccess, setCheckoutSuccess] = useState(false);

    useEffect(() => {
        const discountedTotalPrice =
            cart
                ?.map((item) => {
                    return item.quantity * item.product.price;
                })
                .reduce((currentValue, totalValue) => currentValue + totalValue, 0) *
            ((100 - couponValue) / 100);

        setTotalPrice(discountedTotalPrice.toFixed(2));
    }, [couponValue, cart]);

    useEffect(() => {
        // setCheckoutSuccess(false);
    }, [checkoutSuccess]);

    return (
        <CheckoutContext.Provider
            value={{
                couponValue,
                setCouponValue,
                totalPrice,
                setTotalPrice,
                couponCode,
                setCouponCode,
                checkoutSuccess,
                setCheckoutSuccess,
            }}
        >
            {children}
        </CheckoutContext.Provider>
    );
};

export default CheckoutContext;
