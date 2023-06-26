import React, { useEffect, useState, useRef } from 'react';
import classNames from 'classnames/bind';
import { ArrowDown, SearchIcon } from '~/components/Icons';
import style from './MenuContent.module.scss';
import ProductItem from '../ProductItem';

const cx = classNames.bind(style);
const dataTypes = [
    {
        value: 'Price: Low to High',
        sort: 'price_lth',
    },
    {
        value: 'Price: High to Low',
        sort: 'price_htl',
    },
    {
        value: 'Rate: Low to High',
        sort: 'rate_lth',
    },
    {
        value: 'Rate: High to Low',
        sort: 'rate_htl',
    },
];
function MenuContent() {
    const ref = useRef();
    const [isDropdown, setIsDropdown] = useState(false);

    useEffect(() => {
        const handleClickFeatured = (e) => {
            const el = ref.current;
            if (el && el.contains(e.target)) {
                setIsDropdown(!isDropdown);
            } else {
                setIsDropdown(false);
            }
        };

        window.addEventListener('click', handleClickFeatured);

        return () => {
            window.removeEventListener('click', handleClickFeatured);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={cx('menu-content')}>
            <div className={cx('menu-handle')}>
                <form className={cx('menu-handle__search')}>
                    <input type="text" placeholder="Search your product" />
                    <button className={cx('menu-handle__search-btn')}>
                        <SearchIcon />
                    </button>
                </form>
                <div className={cx('menu-handle__featured')}>
                    <div ref={ref} className={cx('menu-handle__featured-current')}>
                        <span>Featured</span>
                        <ArrowDown />
                    </div>
                    <ul
                        className={
                            isDropdown ? cx('menu-handle__featured-list', 'drop') : cx('menu-handle__featured-list')
                        }
                    >
                        {dataTypes.map((item, index) => (
                            <li key={index} className={cx('menu-handle__featured-item')}>
                                {item.value}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className={cx('menu-products')}>
                <ProductItem />
            </div>
        </div>
    );
}

export default MenuContent;
