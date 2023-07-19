import classNames from 'classnames/bind';
import style from './CheckoutContent.module.scss';
import ListProducts from './components/ListProducts/ListProducts';
import Coupon from './components/Coupon/Coupon';
import PriceTotal from './components/PriceTotal/PriceTotal';

const cx = classNames.bind(style);

function CheckoutContent() {
    return (
        <div className={cx('checkout-content')}>
            <ListProducts />
            <Coupon />
            <PriceTotal />
        </div>
    );
}

export default CheckoutContent;
