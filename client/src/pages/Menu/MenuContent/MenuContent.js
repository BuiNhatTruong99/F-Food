import React, { useEffect, useState, useRef } from 'react';
import classNames from 'classnames/bind';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { ArrowDown, SearchIcon } from '~/components/Icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from './MenuContent.module.scss';
import ProductItem from '../ProductItem';
import { useDispatch } from 'react-redux';
import { setFeaturedValue, setInputSearchValue } from '~/redux/appSlice';
import { useDebounce } from '~/hooks';

const cx = classNames.bind(style);

const dataTypes = [
    {
        value: 'Price: Low to High',
        sort: 'price',
    },
    {
        value: 'Price: High to Low',
        sort: '-price',
    },
    {
        value: 'Rate: Low to High',
        sort: 'totalRating',
    },
    {
        value: 'Rate: High to Low',
        sort: '-totalRating',
    },
];
function MenuContent() {
    const ref = useRef();
    const inputRef = useRef();
    const [isDropdown, setIsDropdown] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [priceFeatured, setPriceFeatured] = useState('Featured');

    const dispatch = useDispatch();
    const debounced = useDebounce(searchValue, 500);

    const handleSearchChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

    const handleClear = () => {
        setSearchValue('');
        inputRef.current.focus();
    };

    const handlePriceFeatured = (item) => {
        setPriceFeatured(item.value);
        dispatch(setFeaturedValue(item.sort));
    };

    useEffect(() => {
        const storeSearchValue = async () => {
            setIsLoading(true);
            dispatch(setInputSearchValue(debounced));
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
        };

        storeSearchValue();
    }, [debounced, dispatch]);

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
                <div className={cx('menu-handle__search')}>
                    <input
                        ref={inputRef}
                        value={searchValue}
                        spellCheck={false}
                        placeholder="Search your product"
                        onChange={handleSearchChange}
                    />
                    {!!searchValue && !isLoading && (
                        <button className={cx('clear')} onClick={handleClear}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}
                    {isLoading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
                    <button className={cx('menu-handle__search-btn')}>
                        <SearchIcon />
                    </button>
                </div>
                <div className={cx('menu-handle__featured')}>
                    <div ref={ref} className={cx('menu-handle__featured-current')}>
                        <span>{priceFeatured}</span>
                        <ArrowDown />
                    </div>
                    <ul
                        className={
                            isDropdown ? cx('menu-handle__featured-list', 'drop') : cx('menu-handle__featured-list')
                        }
                    >
                        {dataTypes.map((item, index) => (
                            <li
                                key={index}
                                className={cx('menu-handle__featured-item')}
                                onClick={() => handlePriceFeatured(item)}
                            >
                                {item.value}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <ProductItem />
        </div>
    );
}

export default MenuContent;
