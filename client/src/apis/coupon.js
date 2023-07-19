import axios from '~/ultils/axios';

export const apiGetCoupon = (name) =>
    axios({
        method: 'POST',
        url: '/coupon/getcoupon',
        data: { name },
    });
