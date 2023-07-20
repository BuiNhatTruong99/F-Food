import React, { useContext } from 'react';
import classNames from 'classnames/bind';
import style from './Coupon.module.scss';
import PrimaryButton from '~/components/PrimaryButton/PrimaryButton';
import CheckoutContext from '~/contexts/CheckoutContext';
import { apiGetCoupon } from '~/apis/coupon';

const cx = classNames.bind(style);

function Coupon() {
    const { setCouponValue, couponCode, setCouponCode } = useContext(CheckoutContext);

    const handleApplyCoupon = async () => {
        // Use inputCouponCode instead of couponCode
        const response = await apiGetCoupon(couponCode);
        if (response.success) {
            setCouponValue(response.coupon.discount);
        }
    };

    const handleChange = (e) => {
        setCouponCode(e.target.value);
    };

    return (
        <div className={cx('coupon')}>
            {/* Use inputCouponCode for the value and add onChange to update the state */}
            <input type="text" placeholder="Gift card or discount code" value={couponCode} onChange={handleChange} />
            <PrimaryButton value={'APPLY'} onClick={handleApplyCoupon} />
        </div>
    );
}

export default Coupon;
