import classNames from 'classnames/bind';
import styles from './VerifyForm.module.scss';
import { CodeIcon } from '~/components/Icons';
import { apiVerify } from '~/apis/user';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import Toast from '~/components/Toast';
import LoginLayoutContext from '~/contexts/LoginLayoutContext';
import { useContext } from 'react';
const cx = classNames.bind(styles);

function VerifyForm() {
    const layout = useContext(LoginLayoutContext);
    console.log(layout);
    const loginLayout = layout.loginLayout;

    const [verifyCode, setVerifyCode] = useState('');

    const handleSubmit = async () => {
        const response = await apiVerify(verifyCode);
        if (response && response.success) {
            Toast({ type: 'success', message: 'Verify successfully' });
            setTimeout(() => {
                layout.setLoading(true);
                layout.setLoginLayout(!loginLayout);
                setTimeout(() => {
                    layout.setLoading(false);
                }, 1000); // Set loading to false after a 1-second delay
            }, 2000);
        } else {
            // Handle the case when response is undefined or response.success is falsy
            Toast({ type: 'error', message: 'Verify failed' });
        }
    };

    return (
        <>
            <ToastContainer />
            <div className={cx('verify-form')}>
                <div className={cx('verify-form__title')}>
                    <span>Verify CODE has been sent into your email! Plese check it.</span>
                </div>
                <div className={cx('verify-form__input-layout')}>
                    <CodeIcon />
                    <input
                        type="text"
                        className={cx('verify-form__input')}
                        placeholder="Enter your code here"
                        onChange={(e) => setVerifyCode(e.target.value)}
                    />
                </div>
                <div className={cx('verify-form__submit')}>
                    <button type="submit" className={cx('register-form__submit-btn')} onClick={handleSubmit}>
                        Confirm
                    </button>
                </div>
            </div>
        </>
    );
}

export default VerifyForm;
