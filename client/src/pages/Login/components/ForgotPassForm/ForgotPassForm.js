import classNames from 'classnames/bind';
import * as yup from 'yup';
import style from './ForgotPassForm.module.scss';
import LoginFormField from '../FormField/FormField';
import { EmailIcon } from '~/components/Icons';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { apiForgotPass } from '~/apis/user';
import { ToastContainer, toast } from 'react-toastify';
import { useContext } from 'react';
import LoginLayoutContext from '~/contexts/LoginLayoutContext';

const cx = classNames.bind(style);
const schema = yup.object().shape({
    email: yup
        .string()
        .required('This field is required')
        .matches(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'This is not valid email format'),
});
function ForgotPassForm() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid },
    } = useForm({ resolver: yupResolver(schema) });

    const layout = useContext(LoginLayoutContext);
    const [email, setEmail] = useState('');
    const onHandleSubmit = () => {
        reset({
            email: '',
        });
    };

    const handleForgotPass = async () => {
        if (isValid) {
            const id = toast.loading('Please wait...');
            const response = await apiForgotPass(email);
            if (response.success) {
                toast.update(id, {
                    render: 'Success! Please check your email',
                    type: 'success',
                    isLoading: false,
                    autoClose: false,
                });
                // setTimeout(() => {
                //     layout.setForgotPass(!layout.forgotPass);
                // }, 2000);
            } else {
                toast.update(id, { render: response.message, type: 'error', isLoading: false, autoClose: 1500 });
            }
        }
    };
    return (
        <>
            <ToastContainer />
            <form onSubmit={handleSubmit(onHandleSubmit)} className={cx('forgot-pass-form')}>
                <h2 className={cx('forgot-pass__title')}>Forgot Your Password?</h2>
                <p className={cx('forgot-pass__desc')}>Input your mail below to reset password!</p>
                <LoginFormField
                    icon={<EmailIcon />}
                    name="email"
                    label="Email address"
                    placeholder="Your email"
                    register={register}
                    errors={errors}
                    value={email}
                    setValue={setEmail}
                />
                <div className={cx('forgot-pass__back')} onClick={() => layout.setForgotPass(!layout.forgotPass)}>
                    <span className={cx('forgot-pass__back-btn')}>Back to login.</span>
                </div>
                <div className={cx('forgot-pass__send')}>
                    <button type="submit" className={cx('forgot-pass__send-btn')} onClick={handleForgotPass}>
                        Send Mail
                    </button>
                </div>
            </form>
        </>
    );
}

export default ForgotPassForm;
