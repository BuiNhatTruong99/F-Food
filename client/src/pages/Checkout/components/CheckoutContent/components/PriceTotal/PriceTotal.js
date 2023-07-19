import classNames from 'classnames/bind';
import style from './PriceTotal.module.scss';
import { useContext } from 'react';
import CheckoutContext from '~/contexts/CheckoutContext';

const cx = classNames.bind(style);

function PriceTotal() {
    const { couponValue, totalPrice } = useContext(CheckoutContext);

    return (
        <div className={cx('price-total')}>
            <div className={cx('price-info')}>
                <div className={cx('price-group')}>
                    <div className={cx('title')}>Temporary price</div>
                    <div className={cx('value')}>$ 0.00</div>
                </div>
                <div className={cx('price-group')}>
                    <div className={cx('title')}>Discount</div>
                    <div className={cx('value')}>{couponValue} %</div>
                </div>
            </div>
            <div className={cx('price-group', 'total')}>
                <div className={cx('total-title')}>Total</div>
                <div className={cx('price-value')}>$ {totalPrice}</div>
            </div>
        </div>
    );
}

export default PriceTotal;
