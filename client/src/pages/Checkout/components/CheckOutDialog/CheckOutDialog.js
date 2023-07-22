import classNames from 'classnames/bind';
import style from './CheckOutDialog.module.scss';
import Spinner from '~/components/Spinner/Spinner';
import { useState, useEffect } from 'react';
import { Container } from '@material-ui/core';
import { BiSolidShoppingBags } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import CheckoutContext from '~/contexts/CheckoutContext';
import { useContext } from 'react';

const cx = classNames.bind(style);

function CheckOutDialog() {
    const [isLoad, setIsLoad] = useState(true);
    const { setCheckoutSuccess } = useContext(CheckoutContext);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoad(false);
        }, 1500);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    const handleBuyMore = () => {
        navigate('/menu');
        setCheckoutSuccess(false);
    };

    return (
        <div className={cx('checkout-dialog')}>
            {isLoad ? (
                <div className={cx('checkout-dialog-load')}>
                    <Spinner />
                </div>
            ) : (
                <Container>
                    <div className={cx('checkout-dialog-success')}>
                        <div className={cx('checkout-success__background')}>
                            <svg
                                viewBox="0 0 1024 1024"
                                className="icon"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#000000"
                            >
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path
                                        d="M512 512m-448 0a448 448 0 1 0 896 0 448 448 0 1 0-896 0Z"
                                        fill="#4CAF50"
                                    ></path>
                                    <path
                                        d="M738.133333 311.466667L448 601.6l-119.466667-119.466667-59.733333 59.733334 179.2 179.2 349.866667-349.866667z"
                                        fill="#CCFF90"
                                    ></path>
                                </g>
                            </svg>
                        </div>
                        <h2 className={cx('checkout-success__title')}>Your purchase was successfull!</h2>
                        <div className={cx('checkout-success__btn')} onClick={handleBuyMore}>
                            <BiSolidShoppingBags />
                            <span className={cx('to-menu')}>Buy more!</span>
                        </div>
                    </div>
                </Container>
            )}
        </div>
    );
}

export default CheckOutDialog;
