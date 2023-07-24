import { AiOutlineInfoCircle } from 'react-icons/ai';
import { CiDeliveryTruck } from 'react-icons/ci';
import { PiPasswordDuotone } from 'react-icons/pi';

import classNames from 'classnames/bind';
import style from './MenuMyAccount.module.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useContext } from 'react';
import MyAccountContext from '~/contexts/MyAccountContext';

const cx = classNames.bind(style);

const menu = [
    { id: 1, name: 'My Account', icon: <AiOutlineInfoCircle />, layout: 'myaccount' },
    { id: 2, name: 'My Orders', icon: <CiDeliveryTruck />, layout: 'myorders' },
    { id: 3, name: 'Change Password', icon: <PiPasswordDuotone />, layout: 'changepassword' },
];

function MenuMyAccount() {
    const [active, setActive] = useState(1);
    const { setAccountLayout } = useContext(MyAccountContext);

    const handleMenuItemClick = (itemId, layout) => {
        setActive(itemId);
        setAccountLayout(layout);
    };
    return (
        <div className={cx('menu-my-account')}>
            {menu.map((item) => (
                <div
                    key={item.id}
                    className={active === item.id ? cx('menu-item', 'active') : cx('menu-item')}
                    onClick={() => handleMenuItemClick(item.id, item.layout)}
                >
                    <div className={cx('menu-item__icon')}>{item.icon}</div>
                    <Link className={cx('menu-item__name')} to={item.link}>
                        {item.name}
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default MenuMyAccount;
