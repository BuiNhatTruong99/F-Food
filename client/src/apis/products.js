import axios from '~/ultils/axios';

export const apiGetProducts = (param) =>
    axios({
        method: 'GET',
        url: '/product',
        param,
    });
