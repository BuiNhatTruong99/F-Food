import axios from '~/ultils/axios';

export const getPaymentConfig = () =>
    axios({
        url: '/payment/config',
        method: 'GET',
    });
