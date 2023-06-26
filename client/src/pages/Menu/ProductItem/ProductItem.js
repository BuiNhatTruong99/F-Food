import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { apiGetProducts } from '~/apis/products';
import { StartIcon } from '~/components/Icons';
import { FaCartArrowDown, FaRegHeart } from 'react-icons/fa';
import style from './ProductItem.module.scss';

const cx = classNames.bind(style);

function ProductItem() {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        const response = await apiGetProducts();
        if (response.status) setProducts(response.products);
    };

    useEffect(() => {
        fetchProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={cx('menu-products-layout')}>
            {products.map((product, index) => (
                <div key={product._id} className={cx('menu-products-layout__item')}>
                    <div className={cx('menu-prodcuts-layout__hover-icon')}>
                        <button className={cx('menu-prodcuts__addcart-btn')}>
                            <FaCartArrowDown />
                        </button>
                        <button className={cx('menu-prodcuts__like-btn')}>
                            <FaRegHeart />
                        </button>
                    </div>
                    <img src={product.image} alt="" className={cx('menu-products-layout__item-img')} />
                    <div className={cx('menu-products-layout__item-info')}>
                        <div className={cx('product__item-info-text')}>
                            <span className={cx('product__item-info-text-name')}>{product.name}</span>
                            <span className={cx('product__item-info-text-desc')}>{product.description}</span>
                        </div>
                        <div className={cx('product__item-info-num')}>
                            <span className={cx('product__item-info-num-rating')}>
                                <StartIcon />
                                {product.totalRating}
                            </span>
                            <span className={cx('product__item-info-num-price')}>
                                <strong>$</strong>
                                {product.price}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ProductItem;
