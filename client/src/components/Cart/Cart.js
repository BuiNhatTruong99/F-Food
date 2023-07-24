import { GrFormClose } from 'react-icons/gr';
import { BsCart3 } from 'react-icons/bs';
import classNames from 'classnames/bind';
import style from './Cart.module.scss';
import PrimaryButton from '../PrimaryButton/PrimaryButton';
import CartItem from './components/CartItem/CartItem';
import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import CartContext from '~/contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import CheckoutContext from '~/contexts/CheckoutContext';

const cx = classNames.bind(style);

function Cart() {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const cartData = useContext(CartContext);
    const { isCartOpen, setIsCartOpen } = cartData;
    const { setCheckoutSuccess } = useContext(CheckoutContext);

    let totalPrice = cart
        ?.map((item) => {
            return item.quantity * item.product.price;
        })
        .reduce((currentValue, totalValue) => currentValue + totalValue, 0);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const fetchCartData = async () => {
        setCart(cartData.cart);
    };

    useEffect(() => {
        fetchCartData();
    }, [isCartOpen, fetchCartData]);
    const handleClose = () => {
        setIsCartOpen(false);
    };

    const handleCheckout = () => {
        setIsCartOpen(false);
        setCheckoutSuccess(false);
        navigate('/checkout');
    };

    return (
        <div className={isCartOpen ? cx('cart', 'active') : cx('cart')}>
            <div className={cx('cart__overlay')}></div>
            <div className={cx('cart__container')}>
                <div className={cx('cart__header')}>
                    <h2 className={cx('cart__title')}>Your cart</h2>
                    <button className={cx('cart__close')} onClick={handleClose}>
                        <GrFormClose />
                    </button>
                </div>
                <div className={cx('cart__item')}>
                    {cart.map((product) => (
                        <CartItem key={product?._id} item={product} />
                    ))}
                </div>
                <div className={cx('cart__handle')}>
                    <div className={cx('cart__handle-total')}>
                        <span className={cx('cart__handle-text')}>Total</span>
                        <span className={cx('cart__handle-price')}>${totalPrice}</span>
                    </div>
                    <div className={cx('cart__handle-btn')}>
                        <PrimaryButton value="Checkout" icon={<BsCart3 />} onClick={handleCheckout} />
                        <button className={cx('cart__handle-btn-more')}>Buy more</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
