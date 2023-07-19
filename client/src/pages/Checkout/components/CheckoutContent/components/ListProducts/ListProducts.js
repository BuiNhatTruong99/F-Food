import classNames from 'classnames/bind';
import style from './ListProducts.module.scss';
import { useContext } from 'react';
import CartContext from '~/contexts/CartContext';

const cx = classNames.bind(style);

function ListProducts() {
    const { cart } = useContext(CartContext);

    return (
        <ul className={cx('list-products')}>
            {cart?.map((item) => (
                <li className={cx('product')} key={item._id}>
                    <div className={cx('product__image')}>
                        <img src={item?.product?.thumb} alt="" />
                    </div>
                    <div className={cx('product__info')}>
                        <h3 className={cx('product__name')}>{item?.product?.name}</h3>
                        <span className={cx('product__quantity')}>{item?.quantity}</span>
                    </div>
                    <span className={cx('product__price')}>${item?.product?.price}</span>
                </li>
            ))}
        </ul>
    );
}

export default ListProducts;
