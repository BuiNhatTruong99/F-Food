import React from 'react';
import { Grid } from '@material-ui/core';
import PrimaryButton from '~/components/PrimaryButton/PrimaryButton';
import classNames from 'classnames/bind';
import style from './Info.module.scss';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import * as yup from 'yup'; // Import yup directly
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { apiUpdateUserInfo } from '~/apis/user';
import { useEffect } from 'react';
import Toast from '~/components/Toast';

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
});

function Info() {
    const { current } = useSelector((state) => state.user);

    useEffect(() => {
        setDataUpdate(current);
    }, [current]);

    const [dataUpdate, setDataUpdate] = useState({
        firstname: current.firstname,
        lastname: current.lastname,
        mobile: current.mobile,
        address: current.address,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDataUpdate((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({ resolver: yupResolver(schema) }); // Use yupResolver directly on the schema

    const handleUpdateInfo = async () => {
        if (isValid) {
            const response = await apiUpdateUserInfo(dataUpdate);
            if (response.success) {
                Toast({ type: 'success', message: 'Update info successfully' });
            }
        }
    };

    return (
        <div className={cx('info')}>
            <form onSubmit={handleSubmit(handleUpdateInfo)}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} className={cx('input-group')}>
                        <label htmlFor="firstname">First Name</label>
                        <input
                            type="text"
                            name="firstname"
                            id="firstname"
                            {...register('firstname')}
                            value={dataUpdate.firstname || current.firstname}
                            onChange={handleInputChange}
                            placeholder="Your first name"
                        />
                        {errors.firstname && <div className={cx('error-message')}>{errors.firstname.message}</div>}
                    </Grid>
                    <Grid item xs={12} sm={6} className={cx('input-group')}>
                        <label htmlFor="lastname">Last Name</label>
                        <input
                            type="text"
                            name="lastname"
                            id="lastname"
                            {...register('lastname')}
                            value={dataUpdate.lastname || current.lastname}
                            onChange={handleInputChange}
                            placeholder="Your last name"
                        />
                        {errors.lastname && <div className={cx('error-message')}>{errors.lastname.message}</div>}
                    </Grid>
                    <Grid item xs={12} className={cx('input-group')}>
                        <label htmlFor="mobilephone">Mobile Phone</label>
                        <input
                            type="text"
                            name="mobile"
                            id="mobilephone"
                            {...register('mobile')}
                            value={dataUpdate.mobile || current.mobile}
                            onChange={handleInputChange}
                            placeholder="Your mobile number"
                        />
                        {errors.mobile && <div className={cx('error-message')}>{errors.mobile.message}</div>}
                    </Grid>
                    <Grid item xs={12} className={cx('input-group')}>
                        <label htmlFor="address">Address</label>
                        <input
                            type="text"
                            name="address"
                            id="address"
                            {...register('address')}
                            value={dataUpdate.address || current.address}
                            onChange={handleInputChange}
                            placeholder="Your address"
                        />
                        {errors.address && <div className={cx('error-message')}>{errors.address.message}</div>}
                    </Grid>
                    <Grid item xs={12} className={cx('input-group')}>
                        <PrimaryButton value={'Update info'} type="submit" />
                    </Grid>
                </Grid>
            </form>
        </div>
    );
}

export default Info;
