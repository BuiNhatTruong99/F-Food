import classNames from 'classnames/bind';
import style from './RegisterForm.module.scss';
import LoginFormField from '../FormField/FormField';
import { EmailIcon, FirstName, LastName, PasswordIcon } from '~/components/Icons';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
    firstName: yup
        .string()
        .required('This field is required')
        .matches(/^[A-Za-z]+$/, 'First name must be letter'),
    lastName: yup
        .string()
        .required('This field is required')
        .matches(/^[A-Za-z]+$/, 'Last name must be letter'),
    email: yup
        .string()
        .required('This field is required')
        .matches(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'This is not valid email format'),
    password: yup
        .string()
        .required('This field is required')
        .matches(/^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/, 'Password should be 8 chars minimum and at least 1 number'),
});

const cx = classNames.bind(style);

function RegisterForm() {
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
    return (
        <form onSubmit={handleSubmit(onHandleSubmit)} className={cx('register-form')}>
            <div className={cx('name-user__input')}>
                <LoginFormField
                    icon={<FirstName />}
                    name="firstName"
                    label="First name"
                    placeholder="Your first name"
                    register={register}
                    errors={errors}
                />

                <LoginFormField
                    icon={<LastName />}
                    name="lastName"
                    label="Last name"
                    placeholder="Your last name"
                    register={register}
                    errors={errors}
                />
            </div>

            <LoginFormField
                icon={<EmailIcon />}
                name="email"
                label="Email address"
                placeholder="Your email"
                register={register}
                errors={errors}
            />

            <LoginFormField
                icon={<PasswordIcon />}
                name="password"
                label="Password"
                placeholder="Your password"
                register={register}
                errors={errors}
            />

            <div className={cx('register-form__submit')}>
                <button type="submit" className={cx('register-form__submit-btn')}>
                    Register
                </button>
            </div>
        </form>
    );
}

export default RegisterForm;
