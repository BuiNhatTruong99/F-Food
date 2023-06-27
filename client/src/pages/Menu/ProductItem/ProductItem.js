import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { apiGetProducts } from '~/apis/products';
import { StartIcon } from '~/components/Icons';
import { FaCartArrowDown, FaRegHeart } from 'react-icons/fa';
import style from './ProductItem.module.scss';
import { useSelector } from 'react-redux';

const cx = classNames.bind(style);

function ProductItem() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const selectCategories = useSelector((state) => state.app.selectCategories);
    const fetchProducts = async () => {
        setIsLoading(true);
        let categoryParams = {};
        if (selectCategories) {
            categoryParams = { category: selectCategories };
        }
        const response = await apiGetProducts({ sort: '-createdAt', ...categoryParams });

        if (response.status) {
            const sortedProducts = response.products;

            const updatedProducts = sortedProducts.map((product, index) => ({
                ...product,
                newProduct: index < 6,
            }));

            setProducts(updatedProducts);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectCategories]);

    console.log(products);
    return (
        <div className={cx('menu-products-layout')}>
            {isLoading ? (
                <div className={cx('menu-products-layout__loading')}></div>
            ) : (
                products.map((product, index) => (
                    <div key={product._id} className={cx('menu-products-layout__item')}>
                        <span
                            className={
                                product.newProduct ? cx('menu-prodcuts-new', 'new-tag') : cx('menu-prodcuts-new')
                            }
                        >
                            New
                        </span>
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
                ))
            )}
        </div>
    );
}

export default ProductItem;
