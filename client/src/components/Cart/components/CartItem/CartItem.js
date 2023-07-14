import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { CiSquareRemove } from 'react-icons/ci';

import classNames from 'classnames/bind';
import style from './CartItem.module.scss';
import { useCallback, useContext, useEffect, useState } from 'react';
import { apiAddToCart, apiRemoveFromCart } from '~/apis/user';
import CartContext from '~/contexts/CartContext';
const cx = classNames.bind(style);

function CartItem({ item }) {
    const { setFlag } = useContext(CartContext);
    const [quantity, setQuantity] = useState(item.quantity);

    const handleChangeQuantity = useCallback(
        (operator) => {
            if (quantity === 1 && operator === 'minus') return;
            if (operator === 'plus') setQuantity((prev) => +prev + 1);
            if (operator === 'minus') setQuantity((prev) => +prev - 1);
        },
        [quantity],
    );
    const pid = item.product._id;

    const fetchCartQuantity = async () => {
        const response = await apiAddToCart({ pid, quantity });
        if (response.success) {
            setFlag(true);
        }
    };

    const fetchRemoveItemFromCart = async () => {
        const response = await apiRemoveFromCart({ pid });
        if (response.success) {
            setFlag(true);
        }
    };

    useEffect(() => {
        fetchCartQuantity();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [quantity]);

    return (
        <>
            <div className={cx('cart__item')}>
                <div className={cx('cart__item-img')}>
                    <img src={item.product.thumb} alt="Cart item" />
                </div>
                <div className={cx('cart__item-content')}>
                    <div className={cx('cart__item-name')}>{item.product.name}</div>
                    <div className={cx('cart__item-price')}>${item.product.price}</div>
                    <div className={cx('cart__item-handle')}>
                        <button className={cx('cart__item-btn--minus')} onClick={() => handleChangeQuantity('minus')}>
                            <AiOutlineMinus />
                        </button>
                        <span className={cx('cart__item-quantity')}>{quantity}</span>
                        <button className={cx('cart__item-btn--plus')} onClick={() => handleChangeQuantity('plus')}>
                            <AiOutlinePlus />
                        </button>
                    </div>
                </div>
                <div className={cx('cart__item-rm')}>
                    <button className={cx('cart__item-btn--rm')} onClick={fetchRemoveItemFromCart}>
                        <CiSquareRemove />
                    </button>
                </div>
            </div>
        </>
    );
}

export default CartItem;
