import axios from '~/ultils/axios';

export const apiCreateOrder = (couponCode, methodPayment) =>
    axios({
        method: 'POST',
        url: '/order',
        data: { couponCode, methodPayment },
    });
