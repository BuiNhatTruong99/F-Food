import axios from '~/ultils/axios';

export const apiRegister = (data) =>
    axios({
        method: 'POST',
        url: '/user/register',
        data,
    });
