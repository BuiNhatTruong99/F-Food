import axios from '~/ultils/axios';

export const apiRegister = (data) =>
    axios({
        method: 'POST',
        url: '/user/register',
        data,
    });

export const apiLogin = (data) =>
    axios({
        method: 'POST',
        url: '/user/login',
        data,
    });
