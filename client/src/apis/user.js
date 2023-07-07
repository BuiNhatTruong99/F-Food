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
