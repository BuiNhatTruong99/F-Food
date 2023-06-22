import axios from '~/ultils/axios';

export const apiGetProdCategories = () =>
    axios({
        method: 'GET',
        url: '/productcategory',
    });
