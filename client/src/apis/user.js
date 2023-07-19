import axios from '~/ultils/axios';

export const apiRegister = (data) =>
    axios({
        method: 'POST',
        url: '/user/register',
        data,
        withCredentials: true,
    });

export const apiLogin = (data) =>
    axios({
        method: 'POST',
        url: '/user/login',
        data,
    });

export const apiVerify = (token) =>
    axios({
        method: 'GET',
        url: `/user/verifyregister/${token}`,
        token,
        withCredentials: true,
    });

export const apiForgotPass = (data) =>
    axios({
        method: 'POST',
        url: '/user/forgotpassword',
        data,
    });
export const apiResetPass = (data) =>
    axios({
        method: 'PUT',
        url: '/user/resetpassword',
        data,
    });

export const apiCurrentUser = () =>
    axios({
        method: 'GET',
        url: '/user/current',
    });

export const apiAddToCart = (data) =>
    axios({
        method: 'PUT',
        url: '/user/cart',
        data,
    });

export const apiRemoveFromCart = (data) =>
    axios({
        method: 'PUT',
        url: '/user/cart/remove',
        data,
    });

export const apiAddToWishList = (data) =>
    axios({
        method: 'PUT',
        url: '/user/wishlist',
        data,
    });

export const apiRemoveFromWishList = (data) =>
    axios({
        method: 'PUT',
        url: '/user/wishlist/remove',
        data,
    });

export const apiUploadUserAvatar = (uid, avatar) =>
    axios({
        method: 'PUT',
        url: '/user/uploadavatar/' + uid,
        data: avatar,
    });

export const apiUpdateUserInfo = (data) =>
    axios({
        method: 'PUT',
        url: '/user/updateinfo',
        data,
    });
