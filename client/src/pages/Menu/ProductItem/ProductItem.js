import React, { useEffect, useState } from 'react';
import { FcLike } from 'react-icons/fc';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Fragment } from 'react';
import { CircularProgress } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { apiGetProducts } from '~/apis/products';
import { FaCartArrowDown, FaRegHeart } from 'react-icons/fa';
import { IconComment, StartIcon } from '~/components/Icons';
import Pagination from '~/components/Pagination/Pagination';
import PaginationContext from '~/contexts/PaginationContext';
import style from './ProductItem.module.scss';
import classNames from 'classnames/bind';
import { apiAddToCart, apiAddToWishList } from '~/apis/user';
import Toast from '~/components/Toast';
import path from '~/config/route';
import CartContext from '~/contexts/CartContext';
import { ToastContainer } from 'react-toastify';
import WishListContext from '~/contexts/WishListContext';

const cx = classNames.bind(style);

function ProductItem() {
    const navigate = useNavigate();
    const { current } = useSelector((state) => state.user);
    const { setFlag } = useContext(CartContext);
    const { setFlagWl, wishListContext } = useContext(WishListContext);
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

        // window.scrollTo(0, 0);
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
                liked: wishListContext.some((item) => item._id === product._id),
            }));
            setProducts(updatedProducts);
            setCounts(response.counts);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectCategories, selectedPrice, searchValue, selectedRate, featuredValue, pagination.page, wishListContext]);

    const handleAddToCart = async (pid) => {
        if (!current) {
            Swal.fire({
                text: 'Please login to continue',
                cancelButtonText: 'Cancel',
                confirmButtonAriaLabel: 'Login',
                showCancelButton: true,
                title: 'You are not logged in!',
            }).then((result) => {
                if (result.isConfirmed) navigate(`/${path.LOGIN}`);
            });
        } else {
            const response = await apiAddToCart({ pid, quantity: 1 });
            if (response.success) {
                if (response.updateUser.cart) {
                    setFlag(true);
                    Toast({ type: 'success', message: 'The product has been added to cart 👌' });
                } else {
                    Toast({ type: 'info', message: 'This product is already in your cart 🦄' });
                }
            } else {
                Toast({ type: 'error', message: 'Something went wrong 😥' });
            }
        }
    };

    const handleDetail = (product) => {
        navigate(`${product.category}/${product.slug}/${product._id}`);
    };

    const handleAddToWishList = async (pid) => {
        if (!current) {
            Swal.fire({
                text: 'Please login to continue',
                cancelButtonText: 'Cancel',
                confirmButtonAriaLabel: 'Login',
                showCancelButton: true,
                title: 'You are not logged in!',
            }).then((result) => {
                if (result.isConfirmed) navigate(`/${path.LOGIN}`);
            });
        } else {
            const response = await apiAddToWishList({ pid });
            if (response.success) {
                setFlagWl(true);
                const { status } = response;
                const toastData =
                    status === 'add'
                        ? { message: 'Added to the wish list 👌', type: 'success' }
                        : { message: 'Removed from the wish list 🦄', type: 'info' };

                Toast({ type: toastData.type, message: toastData.message });
            } else {
                Toast({ type: 'error', message: 'Something went wrong 😥' });
            }
        }
    };

    return (
        <Fragment>
            <ToastContainer />
            {isLoading ? (
                <div className={cx('spinner')}>
                    <CircularProgress thickness={5} style={{ color: '#ff514e' }} />
                </div>
            ) : (
                <>
                    <div className={cx('menu-products-layout')}>
                        {products.map((product, index) => (
                            <div key={product._id} className={cx('menu-products-layout__item')}>
                                <span
                                    className={
                                        product.favouritePro
                                            ? cx('menu-prodcuts-recommend', 'tag')
                                            : cx('menu-prodcuts-recommend')
                                    }
                                >
                                    ✔ Recommend
                                </span>
                                <span
                                    className={
                                        product.liked
                                            ? cx('menu-prodcuts-favourite', 'tag')
                                            : cx('menu-prodcuts-favourite')
                                    }
                                >
                                    <FcLike />
                                </span>
                                <div className={cx('menu-prodcuts-layout__hover-icon')}>
                                    <button
                                        className={cx('menu-prodcuts__addcart-btn')}
                                        onClick={() => handleAddToCart(product._id)}
                                    >
                                        <FaCartArrowDown />
                                    </button>
                                    <button
                                        className={cx('menu-prodcuts__like-btn')}
                                        onClick={() => handleAddToWishList(product._id)}
                                    >
                                        <FaRegHeart />
                                    </button>
                                </div>
                                <div
                                    className={cx('menu-products-layout__item-img-layout')}
                                    onClick={() => handleDetail(product)}
                                >
                                    <img
                                        src={product.thumb}
                                        alt={product.thumb}
                                        className={cx('menu-products-layout__item-img')}
                                    />
                                </div>
                                <div
                                    className={cx('menu-products-layout__item-info')}
                                    onClick={() => handleDetail(product)}
                                >
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
                            </div>
                        ))}
                    </div>
                    <Pagination totalCount={counts} />
                </>
            )}
        </Fragment>
    );
}

export default ProductItem;
