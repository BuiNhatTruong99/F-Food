import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback } from 'react';
import { useState } from 'react';
import * as yup from 'yup';
import LoginFormField from '../FormField/FormField';
import { EmailIcon, PasswordIcon } from '~/components/Icons';
import { apiLogin } from '~/apis/user';
import style from './LoginForm.module.scss';
import Toast from '~/components/Toast';
import { ToastContainer } from 'react-toastify';

const cx = classNames.bind(style);

const schema = yup.object().shape({
    email: yup.string().required('This field is required'),
    password: yup.string().required('This field is required'),
});

function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({ resolver: yupResolver(schema) });

    const [payload, setPayload] = useState({
        email: '',
        password: '',
    });

    const onHandleSubmit = () => {
        setPayload({
            email: '',
            password: '',
        });
    };

    const handleLogin = useCallback(async () => {
        if (isValid) {
            const response = await apiLogin(payload);
            if (response) {
                Toast({ type: 'success', message: 'Login success' });
            } else {
                Toast({ type: 'error', message: 'Login fail!' });
            }
        }
    }, [payload, isValid]);
    return (
        <>
            <ToastContainer />
            <form onSubmit={handleSubmit(onHandleSubmit)} className={cx('login-form')}>
                <LoginFormField
                    icon={<EmailIcon />}
                    name="email"
                    label="Email address"
                    placeholder="Your email"
                    register={register}
                    errors={errors}
                    vale={payload.email}
                    setValue={setPayload}
                />
                <LoginFormField
                    icon={<PasswordIcon />}
                    name="password"
                    label="Password"
                    placeholder="Your password"
                    register={register}
                    errors={errors}
                    vale={payload.password}
                    setValue={setPayload}
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
        </>
    );
}

export default LoginForm;
