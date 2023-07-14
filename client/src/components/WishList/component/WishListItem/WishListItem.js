import { BsTrash } from 'react-icons/bs';
import classNames from 'classnames/bind';
import style from './WishListItem.module.scss';
import { apiRemoveFromWishList } from '~/apis/user';
import { useContext } from 'react';
import WishListContext from '~/contexts/WishListContext';
import Toast from '~/components/Toast';

const cx = classNames.bind(style);
function WishListItem({ data }) {
    const { setFlagWl } = useContext(WishListContext);
    const pid = data._id;
    const handleRemove = async () => {
        const response = await apiRemoveFromWishList({ pid });
        if (response.success) {
            setFlagWl(true);
            Toast({ type: 'info', message: 'Removed from the wish list 🦄' });
        }
    };

    return (
        <div className={cx('wish-list-item')}>
            <div className={cx('wish-list-item__img')}>
                <img src={data.thumb} alt={data.name} />
            </div>
            <div className={cx('wish-list-item__info')}>
                <span className={cx('wish-list-item__info-name')}>{data.name}</span>
                <p className={cx('wish-list-item__info-description')}>{data.description}</p>
                <span className={cx('wish-list-item__info-price')}>${data.price}</span>
            </div>
            <button className={cx('wish-list-item__remove')} onClick={handleRemove}>
                <BsTrash />
            </button>
        </div>
    );
}

export default WishListItem;
