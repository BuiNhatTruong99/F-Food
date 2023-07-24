import React from 'react';
import { Container, Grid, Typography, Breadcrumbs, Link } from '@material-ui/core';
import { BiCaretRight } from 'react-icons/bi';
import { AiOutlineHome } from 'react-icons/ai';
import MyAccountAvatar from './component/Avatar/MyAccountAvatar';
import { ToastContainer } from 'react-toastify';
import Info from './component/Info/Info';
import MenuMyAccount from './component/MenuMyAccount/MenuMyAccount';
import classNames from 'classnames/bind';
import style from './MyAccount.module.scss';
import HeaderDark from '~/layouts/components/HeaderDark/HeaderDark';
import { useContext } from 'react';
import MyAccountContext from '~/contexts/MyAccountContext';
import ChangePassword from './component/ChangePassword/ChangePassword';
import MyOrders from './component/MyOrders/MyOrders';

const cx = classNames.bind(style);

function MyAccount() {
    const { accountLayout } = useContext(MyAccountContext);
    return (
        <div className={cx('my-account')}>
            <ToastContainer />
            <Container>
                <HeaderDark />
                <div className={cx('my-account__header')}>
                    <Breadcrumbs
                        separator={<BiCaretRight fontSize="small" />}
                        aria-label="breadcrumb"
                        className={cx('bread-crumb')}
                    >
                        <Link color="inherit" href="/">
                            <AiOutlineHome /> Home
                        </Link>
                        <Typography color="textPrimary">My Account</Typography>
                    </Breadcrumbs>
                    <h1 className={cx('menu-title')}>My Account</h1>
                </div>
                <Grid container spacing={4} justifyContent="center">
                    <Grid item xs={2} sm={2} md={2}>
                        <MenuMyAccount />
                    </Grid>
                    <Grid item xs={10} sm={10} md={10}>
                        {accountLayout === 'myaccount' && (
                            <>
                                <MyAccountAvatar />
                                <Info />
                            </>
                        )}
                        {accountLayout === 'changepassword' && <ChangePassword />}
                        {accountLayout === 'myorders' && <MyOrders />}
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default MyAccount;
