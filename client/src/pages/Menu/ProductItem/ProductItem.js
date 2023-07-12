import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { apiGetProducts } from '~/apis/products';
import { IconComment, StartIcon } from '~/components/Icons';
import { FaCartArrowDown, FaRegHeart } from 'react-icons/fa';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Fragment } from 'react';
import { CircularProgress } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Pagination from '~/components/Pagination/Pagination';
import PaginationContext from '~/contexts/PaginationContext';
import style from './ProductItem.module.scss';

const cx = classNames.bind(style);

function ProductItem() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [counts, setCounts] = useState(0);
    const pagination = useContext(PaginationContext);

    const { selectCategories, selectedPrice, searchValue, selectedRate, featuredValue } = useSelector(
        (state) => state.app,
    );

    const fetchProducts = async () => {
        let categoryParams = selectCategories ? { category: selectCategories } : {};
        let priceParams = selectedPrice ? { price: selectedPrice } : {};
        let searchParams = searchValue ? { name: encodeURIComponent(searchValue) } : {};
        let rateParams = selectedRate ? { totalRating: selectedRate } : {};
        let featuredParams = featuredValue ? { sort: featuredValue } : { sort: '-totalRating' };
        let pageParams = pagination.page ? { page: pagination.page } : { page: 1 };

        window.scrollTo(0, 0);
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 500));
        const response = await apiGetProducts({
            ...featuredParams,
            ...categoryParams,
            ...priceParams,
            ...searchParams,
            ...rateParams,
            ...pageParams,
        });

        if (response?.products) {
            const updatedProducts = response.products.map((product) => ({
                ...product,
                favouritePro: product.totalRating >= 4,
                numComments: product.ratings.length,
            }));
            setProducts(updatedProducts);
            setCounts(response.counts);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectCategories, selectedPrice, searchValue, selectedRate, featuredValue, pagination.page]);
    return (
        <Fragment>
            {isLoading ? (
                <div className={cx('spinner')}>
                    <CircularProgress thickness={5} style={{ color: '#ff514e' }} />
                </div>
            ) : (
                <>
                    <div className={cx('menu-products-layout')}>
                        {products.map((product, index) => (
                            <Link
                                to={`${product.category}/${product.slug}/${product._id}`}
                                key={product._id}
                                className={cx('menu-products-layout__item')}
                            >
                                <span
                                    className={
                                        product.favouritePro
                                            ? cx('menu-prodcuts-new', 'new-tag')
                                            : cx('menu-prodcuts-new')
                                    }
                                >
                                    Favourite
                                </span>
                                <div className={cx('menu-prodcuts-layout__hover-icon')}>
                                    <button className={cx('menu-prodcuts__addcart-btn')}>
                                        <FaCartArrowDown />
                                    </button>
                                    <button className={cx('menu-prodcuts__like-btn')}>
                                        <FaRegHeart />
                                    </button>
                                </div>
                                <div className={cx('menu-products-layout__item-img-layout')}>
                                    <img
                                        src={product.thumb}
                                        alt={product.thumb}
                                        className={cx('menu-products-layout__item-img')}
                                    />
                                </div>
                                <div className={cx('menu-products-layout__item-info')}>
                                    <div className={cx('product__item-info-text')}>
                                        <span className={cx('product__item-info-text-name')}>{product.name}</span>
                                        <span className={cx('product__item-info-text-desc')}>
                                            {product.description}
                                        </span>
                                    </div>
                                    <div className={cx('product__item-info-num')}>
                                        <div className={cx('product_item-info-interact')}>
                                            <span className={cx('product__item-info-num-rating')}>
                                                <StartIcon />
                                                {product.totalRating}
                                            </span>
                                            <span className={cx('product__item-info-num-comments')}>
                                                <IconComment />
                                                {product.numComments}
                                            </span>
                                        </div>
                                        <span className={cx('product__item-info-num-price')}>
                                            <strong>$</strong>
                                            {product.price}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <Pagination totalCount={counts} />
                </>
            )}
        </Fragment>
    );
}

export default ProductItem;
