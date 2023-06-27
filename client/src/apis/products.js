import axios from '~/ultils/axios';

export const apiGetProducts = (params) =>
    axios({
        method: 'GET',
        url: '/product/',
        params,
    });
