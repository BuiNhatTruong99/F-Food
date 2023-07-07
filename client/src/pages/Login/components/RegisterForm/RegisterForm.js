import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useCallback } from 'react';
import style from './RegisterForm.module.scss';
import LoginFormField from '../FormField/FormField';
import { EmailIcon, FirstName, LastName, PasswordIcon } from '~/components/Icons';
import { apiRegister } from '~/apis/user';
import VerifyForm from '../VerifyForm';
import { ToastContainer, toast } from 'react-toastify';

const schema = yup.object().shape({
    firstname: yup
        .string()
        .required('This field is required')
        .matches(/^[A-Za-z]+$/, 'First name must be letter'),
    lastname: yup
        .string()
        .required('This field is required')
        .matches(/^[A-Za-z ]+$/, 'Last name must be letter'),
    email: yup
        .string()
        .required('This field is required')
        .matches(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'This is not valid email format'),
    password: yup
        .string()
        .required('This field is required')
        .matches(/^(?=.*?[a-z])(?=.*?[0-9]).{6,}$/, 'Password should be 6 chars minimum and at least 1 number'),
});

const cx = classNames.bind(style);

function RegisterForm() {
    const [verifyForm, setVerifyForm] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid },
    } = useForm({ resolver: yupResolver(schema) });

    const [payload, setPayload] = useState({
        email: '',
        password: '',
        firstname: '',
        lastname: '',
    });

    const onHandleSubmit = () => {
        reset({
            email: '',
            password: '',
            firstname: '',
            lastname: '',
        });
    };

    const handleRegister = useCallback(async () => {
        if (isValid) {
            const id = toast.loading('Please wait...');
            setTimeout(async () => {
                const response = await apiRegister(payload);
                if (response.success) {
                    toast.update(id, {
                        render: 'Register successfully',
                        type: 'success',
                        isLoading: false,
                        autoClose: 1000,
                    });
                    setVerifyForm(true);
                } else {
                    toast.update(id, { render: response.message, type: 'error', isLoading: false, autoClose: 1000 });
                }
            }, 1500);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isValid, payload]);

    return (
        <>
            <ToastContainer />
            <form onSubmit={handleSubmit(onHandleSubmit)} className={cx('register-form')}>
                {!verifyForm ? (
                    <>
                        <div className={cx('name-user__input')}>
                            <LoginFormField
                                icon={<FirstName />}
                                name="firstname"
                                label="First name"
                                placeholder="Your first name"
                                register={register}
                                errors={errors}
                                value={payload.firstname}
                                setValue={setPayload}
                            />

                            <LoginFormField
                                icon={<LastName />}
                                name="lastname"
                                label="Last name"
                                placeholder="Your last name"
                                register={register}
                                errors={errors}
                                value={payload.lastname}
                                setValue={setPayload}
                            />
                        </div>

                        <LoginFormField
                            icon={<EmailIcon />}
                            name="email"
                            label="Email address"
                            placeholder="Your email"
                            register={register}
                            errors={errors}
                            value={payload.email}
                            setValue={setPayload}
                        />

                        <LoginFormField
                            icon={<PasswordIcon />}
                            name="password"
                            label="Password"
                            placeholder="Your password"
                            register={register}
                            errors={errors}
                            value={payload.password}
                            setValue={setPayload}
                        />

                        <div className={cx('register-form__submit')}>
                            <button type="submit" className={cx('register-form__submit-btn')} onClick={handleRegister}>
                                Register
                            </button>
                        </div>

                        <div className={cx('register-form__backhome')}>
                            <Link to="/" className={cx('back-btn')}>
                                Back to home page
                            </Link>
                        </div>
                    </>
                ) : (
                    <VerifyForm />
                )}
            </form>
        </>
    );
}

export default RegisterForm;
