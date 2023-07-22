import React, { useEffect, useState } from 'react';
import { PayPalButton } from 'react-paypal-button-v2';

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
import { apiCreateOrder } from '~/apis/order';
import Toast from '~/components/Toast';
import { useContext } from 'react';
import CheckoutContext from '~/contexts/CheckoutContext';
import { getPaymentConfig } from '~/apis/payment';

const cx = classNames.bind(style);

const schema = yup.object().shape({
    firstname: yup
        .string()
        .required('This field is required')
        .matches(/^[A-Za-z]+$/, 'First name must be letters only'),
    lastname: yup
        .string()
        .required('This field is required')
        .matches(/^[A-Za-z ]+$/, 'Last name must be letters only'),
    mobile: yup
        .string()
        .required('Mobile Phone is required')
        .matches(/^[0-9]{10}$/, 'Mobile Phone must be a 10-digit number'),
    address: yup.string().required('Address is required'),
    paymentMethod: yup.string().required('Payment method is required'),
});

function Contact() {
    const { current } = useSelector((state) => state.user);
    const [methodPayment, setMethodPayment] = useState('');
    const { couponCode, totalPrice, setCheckoutSuccess } = useContext(CheckoutContext);
    const [sdkReady, setSdkReady] = useState(false);

    useEffect(() => {
        setDataDelivery(current);
    }, [current]);

    const [dataDelivery, setDataDelivery] = useState({
        firstname: current.firstname,
        lastname: current.lastname,
        mobile: current.mobile,
        address: current.address,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDataDelivery((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleMethodPayment = (e) => {
        setMethodPayment(e.target.value);
    };

    const addPaymentScript = async () => {
        const { data } = await getPaymentConfig();
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
        script.async = true;
        script.onload = () => {
            setSdkReady(true);
        };
        document.body.appendChild(script);
    };

    useEffect(() => {
        if (!window.paypal) {
            addPaymentScript();
        } else {
            setSdkReady(true);
        }
    }, []);

    const onSuccesPaypal = async (detail, data) => {
        const response = await apiCreateOrder(couponCode, methodPayment);
        if (response.success) {
            setCheckoutSuccess(true);
        }
    };

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({ resolver: yupResolver(schema) });

    const onSubmit = async () => {
        if (isValid) {
            if (methodPayment === 'COD') {
                const response = await apiCreateOrder(couponCode, methodPayment);
                if (response.success) {
                    setCheckoutSuccess(true);
                }
            }
        }
    };

    return (
        <div className={cx('contact')}>
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
                                <input
                                    type="text"
                                    placeholder="First name"
                                    name="firstname"
                                    {...register('firstname')}
                                    value={dataDelivery.firstname || ''}
                                    onChange={handleInputChange}
                                />
                                {errors.firstName && (
                                    <div className={cx('error-message')}>{errors.firstname.message}</div>
                                )}
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <input
                                    type="text"
                                    placeholder="Last name"
                                    name="lastname"
                                    {...register('lastname')}
                                    value={dataDelivery.lastname || ''}
                                    onChange={handleInputChange}
                                />
                                {errors.lastName && (
                                    <div className={cx('error-message')}>{errors.lastname.message}</div>
                                )}
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <input
                                    type="text"
                                    placeholder="Address"
                                    {...register('address')}
                                    name="address"
                                    value={dataDelivery.address || ''}
                                    onChange={handleInputChange}
                                />
                                {errors.address && <div className={cx('error-message')}>{errors.address.message}</div>}
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <input
                                    type="text"
                                    placeholder="Phone number"
                                    {...register('mobile')}
                                    name="mobile"
                                    value={dataDelivery.mobile || ''}
                                    onChange={handleInputChange}
                                />
                                {errors.mobile && <div className={cx('error-message')}>{errors.mobile.message}</div>}
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <select
                                    id="paymentMethod"
                                    name="paymentMethod"
                                    {...register('paymentMethod')}
                                    value={methodPayment}
                                    onChange={handleMethodPayment}
                                >
                                    <option value="">Select payment method</option>
                                    <option value="Paypal">PayPal</option>
                                    <option value="COD">Ship COD</option>
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
                                    {methodPayment === 'Paypal' && sdkReady ? (
                                        <div style={{ width: '100%', marginTop: '10px' }}>
                                            <PayPalButton
                                                createOrder={(data, actions) => {
                                                    // Create the PayPal order and return the order ID
                                                    // You can define the items and total amount for the payment here
                                                    return actions.order.create({
                                                        purchase_units: [
                                                            {
                                                                amount: {
                                                                    currency_code: 'USD',
                                                                    value: totalPrice, // Replace with the actual order total
                                                                },
                                                            },
                                                        ],
                                                    });
                                                }}
                                                onSuccess={onSuccesPaypal}
                                                onError={(error) => {
                                                    // Handle errors during payment processing
                                                    console.error('Error processing payment:', error);
                                                    Toast({ type: 'error', message: 'Error processing payment' });
                                                }}
                                                options={{
                                                    currency: 'USD',
                                                    // Add other options as needed (e.g., enable shipping, show shipping address, etc.)
                                                }}
                                            />
                                        </div>
                                    ) : (
                                        <PrimaryButton value={'Checkout'} type="submit" />
                                    )}
                                </div>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Contact;
