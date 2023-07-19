import React, { useState, useContext } from 'react';
import classNames from 'classnames/bind';
import style from './Coupon.module.scss';
import PrimaryButton from '~/components/PrimaryButton/PrimaryButton';
import CheckoutContext from '~/contexts/CheckoutContext';
import { apiGetCoupon } from '~/apis/coupon';

const cx = classNames.bind(style);

function Coupon() {
    const { setCouponValue } = useContext(CheckoutContext);
    const [couponName, setCouponName] = useState('');

    const handleApplyCoupon = async () => {
        // Use inputCouponCode instead of couponCode
        const response = await apiGetCoupon(couponName);
        if (response.success) {
            setCouponValue(response.coupon.discount);
        }
    };

    const handleChange = (e) => {
        setCouponName(e.target.value);
    };

    return (
        <div className={cx('coupon')}>
            {/* Use inputCouponCode for the value and add onChange to update the state */}
            <input type="text" placeholder="Gift card or discount code" value={couponName} onChange={handleChange} />
            <PrimaryButton value={'APPLY'} onClick={handleApplyCoupon} />
        </div>
    );
}

export default Coupon;
