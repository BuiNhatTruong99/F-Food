import axios from '~/ultils/axios';

export const apiGetProducts = (params) =>
    axios({
        method: 'GET',
        url: '/product/',
        params,
    });

export const apiProduct = (pid) =>
    axios({
        method: 'GET',
        url: '/product/' + pid,
    });

export const apiRating = (data) =>
    axios({
        method: 'PUT',
        url: '/product/ratings',
        data,
    });
