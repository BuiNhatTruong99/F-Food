import { AiOutlineUnorderedList } from 'react-icons/ai';
import { BsBoxArrowInRight } from 'react-icons/bs';

import classNames from 'classnames/bind';
import style from './WishList.module.scss';
import WishListItem from './component/WishListItem/WishListItem';
import { useContext } from 'react';
import WishListContext from '~/contexts/WishListContext';
import { useState } from 'react';
import { useEffect } from 'react';

const cx = classNames.bind(style);
function WishList() {
    const { isWishListOpen, setIsWishListOpen, wishListContext } = useContext(WishListContext);
    const [wishList, setWishList] = useState([]);

    useEffect(() => {
        setWishList(wishListContext);
    }, [isWishListOpen, wishListContext]);

    return (
        <div className={isWishListOpen ? cx('wish-list', 'active') : cx('wish-list')}>
            <div className={cx('wish-list__header')}>
                <div className={cx('wish-list__header-title')}>
                    <AiOutlineUnorderedList />
                    <span>Wish List</span>
                </div>
                <button className={cx('wish-list__header-close')} onClick={() => setIsWishListOpen(false)}>
                    <BsBoxArrowInRight />
                </button>
            </div>
            <div className={cx('wish-list__body')}>
                {wishList.map((product) => (
                    <WishListItem data={product} key={product._id} />
                ))}
            </div>
        </div>
    );
}

export default WishList;
