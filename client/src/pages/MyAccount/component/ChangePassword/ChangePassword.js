import classNames from 'classnames/bind';
import style from './ChangePassword.module.scss';
import { useSelector } from 'react-redux';
import PrimaryButton from '~/components/PrimaryButton/PrimaryButton';
import { apiForgotPass } from '~/apis/user';
import { useState } from 'react';
import { toast } from 'react-toastify';

const cx = classNames.bind(style);
function ChangePassword() {
    const { current } = useSelector((state) => state.user);
    const [message, setMessage] = useState(false);

    const handleGetSecrectCode = async () => {
        const id = toast.loading('Please wait...');
        const response = await apiForgotPass({ email: current.email });
        if (response.success) {
            setMessage(true);
            toast.update(id, {
                render: 'Success! Please check your email',
                type: 'success',
                isLoading: false,
                autoClose: false,
            });
        } else {
            toast.update(id, { render: response.message, type: 'error', isLoading: false, autoClose: 1500 });
        }
    };

    return (
        <div className={cx('change-password')}>
            <h2 className={cx('change-password__title')}>Change Password</h2>
            <div className={cx('email')}>
                <label>Your email: </label>
                <span>{current.email}</span>
            </div>
            <div className={cx('secrect-code')}>
                <div className={cx('get-code')}>
                    <PrimaryButton value={'Get Secrect Link'} onClick={handleGetSecrectCode} />
                    {message ? (
                        <span>Check your email to get the secrect link!</span>
                    ) : (
                        <span>Click the button to get the secrect link!</span>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ChangePassword;
