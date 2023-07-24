import classNames from 'classnames/bind';
import style from './MyOrders.module.scss';
import { useState } from 'react';
import { apiGetOrders } from '~/apis/order';
import { useEffect } from 'react';

const cx = classNames.bind(style);

function MyOrders() {
    const [orders, setOrders] = useState([]);

    const fecthOrders = async () => {
        const response = await apiGetOrders();
        if (response.success) {
            setOrders(response.data);
        }
    };

    useEffect(() => {
        fecthOrders();
    }, []);

    return (
        <div className={cx('my-orders')}>
            <table>
                <thead>
                    <tr>
                        <th>Order</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, index) => {
                        // Incrementing value starting from 1
                        const orderNumber = index + 1;
                        // Parse the given date string to a Date object
                        const createdAtDate = new Date(order.createdAt);

                        // Format the date in the desired format "Month day, year"
                        const formattedDate = createdAtDate.toLocaleString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        });

                        return (
                            <tr key={order._id}>
                                <td>{orderNumber}</td>
                                <td>{formattedDate}</td>
                                <td>{order.status}</td>
                                <td>
                                    ${order.total} for {order.products.length} items
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default MyOrders;
