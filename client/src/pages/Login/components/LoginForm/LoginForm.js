import classNames from 'classnames/bind';
import { EmailIcon, PasswordIcon } from '~/components/Icons';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import style from './LoginForm.module.scss';
import LoginFormField from '../FormField/FormField';
import { useCallback } from 'react';
import { useState } from 'react';
const cx = classNames.bind(style);

const schema = yup.object().shape({
    email: yup
        .string()
        .required('This field is required')
        .matches(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'This is not valid email format'),
    password: yup
        .string()
        .required('This field is required')
        .matches(/^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/, 'Password should be 8 chars minimum and at least 1 number'),
});

function LoginForm() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    const onHandleSubmit = () => {
        reset({
            email: '',
            password: '',
        });
    };

    const [payload, setPayload] = useState({
        email: '',
        password: '',
    });

    const handleLogin = useCallback(() => {
        console.log(payload);
    }, [payload]);

    return (
        <form onSubmit={handleSubmit(onHandleSubmit)} className={cx('login-form')}>
            <LoginFormField
                icon={<EmailIcon />}
                name="email"
                label="Email address"
                placeholder="Your email"
                vale={payload.email}
                setValue={setPayload}
                register={register}
                errors={errors}
            />
            <LoginFormField
                icon={<PasswordIcon />}
                name="password"
                label="Password"
                placeholder="Your password"
                vale={payload.password}
                setValue={setPayload}
                register={register}
                errors={errors}
            />
            <div className={cx('login-form__commit')}>
                <div className={cx('check-password')}>
                    <input id="check" type="checkbox" className={cx('login-form__commit-input')} />
                    <label htmlFor="check" className={cx('form-login__commit-msg')}>
                        <span>Save your password</span>
                    </label>
                </div>
                <span className={cx('forgot-password')}>Forgot your accounts?</span>
            </div>
            <div className={cx('login-form__submit')}>
                <button type="submit" className={cx('login-form__submit-btn')} onClick={handleLogin}>
                    Login
                </button>
            </div>
        </form>
    );
}

export default LoginForm;
