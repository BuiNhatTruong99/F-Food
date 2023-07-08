import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import classNames from 'classnames/bind';
import style from './ResetPassword.module.scss';
import { PasswordIcon } from '~/components/Icons';
import { useState } from 'react';
import PrimaryButton from '~/components/PrimaryButton/PrimaryButton';
import { useNavigate, useParams } from 'react-router-dom';
import { apiResetPass } from '~/apis/user';
import Toast from '~/components/Toast';
import { ToastContainer } from 'react-toastify';
import Spinner from '~/components/Spinner/Spinner';
import { Container } from '@material-ui/core';

const cx = classNames.bind(style);
const schema = yup.object().shape({
    password: yup
        .string()
        .required('This field is required')
        .matches(/^(?=.*?[a-z])(?=.*?[0-9]).{6,}$/, 'Password should be 6 chars minimum and at least 1 number'),
    repassword: yup
        .string()
        .required('This field is required')
        .matches(/^(?=.*?[a-z])(?=.*?[0-9]).{6,}$/, 'Password should be 6 chars minimum and at least 1 number'),
});
function ResetPassword() {
    const { token } = useParams();
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid },
    } = useForm({ resolver: yupResolver(schema) });

    const onHandleSubmit = () => {
        reset({
            password: '',
            repassword: '',
        });
    };

    const handleReset = async () => {
        if (isValid) {
            if (password === repassword) {
                const response = await apiResetPass({ token, password });
                if (response && response.success) {
                    Toast({ type: 'success', message: response.message });
                    setTimeout(() => {
                        setLoading(true);
                        setTimeout(() => {
                            navigate('/login');
                        }, 1500);
                    }, 1500);
                } else {
                    Toast({ type: 'error', message: response.message });
                }
            } else {
                Toast({ type: 'warning', message: 'Password is not match' });
            }
        }
    };

    return (
        <Container maxWidth={'sm'}>
            <ToastContainer />
            {loading ? (
                <div className={cx('reset-pass__layout')}>
                    <Spinner />
                </div>
            ) : (
                <form onSubmit={handleSubmit(onHandleSubmit)} className={cx('reset-pass__form')}>
                    <h2 className={cx('reset-pass__title')}>Reset password</h2>
                    <div className={cx('reset-pass__input')}>
                        <label htmlFor="password">New password</label>
                        <div className={cx('reset-pass__input-content')}>
                            <PasswordIcon />
                            <input
                                type="password"
                                placeholder="Your new password"
                                name="password"
                                id="password"
                                {...register('password')}
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                            />
                        </div>
                        {errors.password && <span className={cx('form-field__error')}>{errors.password.message}</span>}
                    </div>
                    <div className={cx('reset-pass__input')}>
                        <label htmlFor="repassword">Confirm password</label>
                        <div className={cx('reset-pass__input-content')}>
                            <PasswordIcon />
                            <input
                                type="password"
                                placeholder="Your new password"
                                id="repassword"
                                name="repassword"
                                {...register('repassword')}
                                value={repassword}
                                onChange={(e) => {
                                    setRepassword(e.target.value);
                                }}
                            />
                        </div>
                        {errors.repassword && (
                            <span className={cx('form-field__error')}>{errors.repassword.message}</span>
                        )}
                    </div>
                    <div className={cx('reset-pass__button')} onClick={handleReset}>
                        <PrimaryButton value={'Submit'} type={'submit'} />
                    </div>
                </form>
            )}
        </Container>
    );
}

export default ResetPassword;
