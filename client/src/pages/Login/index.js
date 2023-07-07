import React from 'react';
import classNames from 'classnames/bind';
import { Button, CircularProgress, Container } from '@material-ui/core';
import LoginForm from '~/pages/Login/components/LoginForm';
import style from './style.module.scss';
import { FaceBookIcon } from '~/components/Icons';
import images from '~/assets/images';
import RegisterForm from './components/RegisterForm';
import { useContext } from 'react';
import LoginLayoutContext from '~/contexts/LoginLayoutContext';

const cx = classNames.bind(style);

function Login() {
    const layout = useContext(LoginLayoutContext);
    const loginLayout = layout.loginLayout;
    const loading = layout.loading;
    console.log(loginLayout);
    const handleLayout = () => {
        layout.setLoginLayout(!loginLayout);
    };

    return (
        <section className={cx('login-layout')}>
            <Container>
                <div className={cx('login-container')}>
                    {loading ? (
                        <div className={cx('spinner')}>
                            <CircularProgress thickness={5} style={{ color: '#ff514e' }} />
                        </div>
                    ) : (
                        <>
                            <div className={cx('login-thumb')}>{/* <img src={loginThumb} alt="" /> */}</div>
                            {loginLayout ? (
                                <div className={cx('login-content')}>
                                    <h2>JOIN WITH US</h2>
                                    <div className={cx('login-msg')}>
                                        <span>Don't have an account?</span>
                                        <span className={cx('login-msg-btn')} onClick={handleLayout}>
                                            <strong>Create an account</strong>
                                        </span>
                                    </div>
                                    <LoginForm />
                                    <div className={cx('login__separate')}>
                                        <span className={cx('login__separate-text')}>OR</span>
                                    </div>
                                    <div className={cx('login__options')}>
                                        <Button variant="contained" className={cx('login__option-gg')}>
                                            <img src={images.googleIcon} alt="" />
                                            Login with Google
                                        </Button>
                                        <Button variant="contained" className={cx('login__option-fb')}>
                                            <FaceBookIcon />
                                            Login with FaceBook
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <div className={cx('login-content')}>
                                    <h2>WELCOME TO FFOOD</h2>
                                    <div className={cx('login-msg')}>
                                        <span>Already have an account?</span>
                                        <span className={cx('login-msg-btn')} onClick={handleLayout}>
                                            <strong>Go to login here</strong>
                                        </span>
                                    </div>
                                    <RegisterForm />
                                </div>
                            )}
                        </>
                    )}
                </div>
            </Container>
        </section>
    );
}

export default Login;
