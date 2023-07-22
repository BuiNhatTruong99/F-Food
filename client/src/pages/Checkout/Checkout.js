import classNames from 'classnames/bind';
import style from './Checkout.module.scss';
import HeaderDark from '~/layouts/components/HeaderDark/HeaderDark';
import { Container, Grid } from '@material-ui/core';
import Contact from './components/CheckoutContact/Contact';
import CheckoutContent from './components/CheckoutContent/CheckoutContent';
import { ToastContainer } from 'react-toastify';
import { useContext } from 'react';
import CheckoutContext from '~/contexts/CheckoutContext';
import CheckOutDialog from './components/CheckOutDialog/CheckOutDialog';

const cx = classNames.bind(style);

function Checkout() {
    const { checkoutSuccess } = useContext(CheckoutContext);

    return (
        <>
            <ToastContainer />
            <HeaderDark />
            <div className={cx('checkout')}>
                {checkoutSuccess ? (
                    <div className={cx('checkout-loading')}>
                        <CheckOutDialog />
                    </div>
                ) : (
                    <Container>
                        <Grid container spacing={4}>
                            <Grid item xs={12} sm={6} md={6}>
                                <Contact />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <CheckoutContent />
                            </Grid>
                        </Grid>
                    </Container>
                )}
            </div>
        </>
    );
}

export default Checkout;
