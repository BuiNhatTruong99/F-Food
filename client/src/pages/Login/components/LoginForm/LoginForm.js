import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import LoginFormField from '../FormField/FormField';
import { EmailIcon, PasswordIcon } from '~/components/Icons';
import { apiLogin } from '~/apis/user';
import style from './LoginForm.module.scss';
import Toast from '~/components/Toast';
import { ToastContainer } from 'react-toastify';
import { userReducer } from '~/redux/user/userSlice';
import { useDispatch } from 'react-redux';
import path from '~/config';
import { useContext } from 'react';
import AuthContext from '~/contexts/AuthContext';
import LoginLayoutContext from '~/contexts/LoginLayoutContext';

const cx = classNames.bind(style);

const schema = yup.object().shape({
    email: yup.string().required('This field is required'),
    password: yup.string().required('This field is required'),
});

function LoginForm() {
    const auth = useContext(AuthContext); // Get the AuthContext
    const setSateLoggedIn = auth.setLoggedIn; // setSateLoggedIn is get the setLoggedIn from the AuthContext
    const layout = useContext(LoginLayoutContext);

    const dispatch = useDispatch();
    const navigate = useNavigate();
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
            if (response.success) {
                dispatch(
                    userReducer({
                        isLoggedIn: true,
                        accessToken: response.accessToken,
                        userData: response.userData,
                    }),
                );

                setSateLoggedIn(true); // Set the logged-in status to true in the AuthContext

                Toast({ type: 'success', message: 'Login success 👌' });
                setTimeout(() => {
                    window.location.href = `${path.routes.HOME}`; // Navigate to the HOME route after a delay
                }, 2000);
            } else {
                Toast({ type: 'warning', message: 'Login fail!' });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [payload, isValid, dispatch, navigate, setSateLoggedIn]);

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
                    <div className={cx('forgot-password')} onClick={() => layout.setForgotPass(!layout.forgotPass)}>
                        Forgot your password?
                    </div>
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
