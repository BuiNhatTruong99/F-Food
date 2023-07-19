import React from 'react';
import { Grid } from '@material-ui/core';
import PrimaryButton from '~/components/PrimaryButton/PrimaryButton';
import { Link } from 'react-router-dom';
import { AiFillCaretLeft } from 'react-icons/ai';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import classNames from 'classnames/bind';
import style from './Contact.module.scss';
import { useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';

const cx = classNames.bind(style);

const schema = yup.object().shape({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    address: yup.string().required('Address is required'),
    phoneNumber: yup
        .string()
        .required('Phone number is required')
        .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
    paymentMethod: yup.string().required('Payment method is required'),
});

function Contact() {
    const { current } = useSelector((state) => state.user);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    const onSubmit = () => {};

    return (
        <div className={cx('contact')}>
            <div className={cx('contact__head')}>
                <h1>Contact infomation</h1>
                <div className={cx('contact__head-intro')}>
                    <div className={cx('contact__head-avatar')}>
                        <img src={current?.avatar} alt="" />
                    </div>
                    <div className={cx('contact__head-info')}>
                        <div className={cx('infomation')}>
                            <div className={cx('name')}>
                                {current?.firstname} {current?.lastname}
                            </div>
                            <div className={cx('email')}>({current?.email})</div>
                        </div>
                        <div className={cx('logout')}>Log out</div>
                    </div>
                </div>
                <div className={cx('keep-check')}>
                    <input type="checkbox" id="keep-check" />
                    <label htmlFor="keep-check">Keep me up to date on news and exclusive offers</label>
                </div>
            </div>

            <div className={cx('contact__body')}>
                <h1>Shipping address</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={6}>
                            <input type="text" placeholder="First name" {...register('firstName')} />
                            {errors.firstName && <div className={cx('error-message')}>{errors.firstName.message}</div>}
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                            <input type="text" placeholder="Last name" {...register('lastName')} />
                            {errors.lastName && <div className={cx('error-message')}>{errors.lastName.message}</div>}
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
                            <input type="text" placeholder="Address" {...register('address')} />
                            {errors.address && <div className={cx('error-message')}>{errors.address.message}</div>}
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                            <input type="text" placeholder="Phone number" {...register('phoneNumber')} />
                            {errors.phoneNumber && (
                                <div className={cx('error-message')}>{errors.phoneNumber.message}</div>
                            )}
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                            <select id="paymentMethod" name="paymentMethod" {...register('paymentMethod')}>
                                <option value="">Select payment method</option>
                                <option value="paypal">PayPal</option>
                                <option value="bank_transfer">Ship COD</option>
                                {/* Add more payment methods here */}
                            </select>
                            {errors.paymentMethod && (
                                <div className={cx('error-message')}>{errors.paymentMethod.message}</div>
                            )}
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
                            <div className={cx('actions')}>
                                <Link className={cx('btn-back')}>
                                    <AiFillCaretLeft /> Continue to shopping
                                </Link>
                                <PrimaryButton value={'Checkout'} type="submit" />
                            </div>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </div>
    );
}

export default Contact;
