import axios from '~/ultils/axios';

export const apiCreateOrder = (couponCode) =>
    axios({
        method: 'POST',
        url: '/order',
        data: { couponCode },
    });
