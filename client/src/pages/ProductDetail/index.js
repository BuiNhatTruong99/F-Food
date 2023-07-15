import ReactImageMagnify from 'react-image-magnify';
import Swal from 'sweetalert2';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container, Grid } from '@material-ui/core';
import { FaCalendar, FaRegHeart, FaStarHalfAlt, FaTag, FaTruckMoving } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { useCallback, useState } from 'react';
import { StartBorderIcon, StartIcon } from '~/components/Icons';
import PrimaryButton from '~/components/PrimaryButton/PrimaryButton';
import Breadcrumbs from '~/components/Breadcrumb/Breadcrumb';
import { apiProduct, apiRating } from '~/apis/products';
import classNames from 'classnames/bind';
import MenuBanner from '~/components/MenuBanner/MenuBanner';
import style from './ProductDetail.module.scss';
import StartComment from './StarComment/StarComments';
import path from '~/config/route';
import images from '~/assets/images';
import moment from 'moment/moment';
import { apiAddToCart, apiAddToWishList } from '~/apis/user';
import Toast from '~/components/Toast';
import { ToastContainer } from 'react-toastify';
import { useContext } from 'react';
import CartContext from '~/contexts/CartContext';
import WishListContext from '~/contexts/WishListContext';

const cx = classNames.bind(style);

function ProductDetail() {
    const navigate = useNavigate();
    const { setFlag } = useContext(CartContext);
    const { pid, name, cate } = useParams();
    const [product, setProduct] = useState(null);
    const [thumbnail, setThumbnail] = useState(null);
    const { current, isLoggedIn } = useSelector((state) => state.user);
    const { avatar } = current || { avatar: images.anonymous_avatar };
    const [quantity, setQuantity] = useState(1);
    const [rating, setRating] = useState(null);
    const [comment, setComment] = useState('');
    const { setFlagWl, wishListContext } = useContext(WishListContext);
    let borderStar = Math.floor(5 - product?.totalRating) || 0;
    let halfStar = Math.ceil(5 - (product?.totalRating + borderStar)) || 0;

    const fetchProductData = async () => {
        const response = await apiProduct(pid);
        if (response.status) {
            setProduct(response.data);
            setThumbnail(response.data.thumb);
        }
    };

    useEffect(() => {
        if (pid) fetchProductData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pid]);

    const checkIteminWishList = () => {
        return wishListContext.some((item) => item._id === pid);
    };

    const handleChangeThumbnail = (e) => {
        setThumbnail(e.target.src);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isLoggedIn) {
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
            if (!rating || !comment || !pid) {
                return;
            }
            const response = await apiRating({ star: rating, comment, pid, updatedAt: Date.now() });
            if (response.status) {
                setRating(null);
                setComment('');
                fetchProductData();
            }
        }
    };

    const handleQuantity = useCallback(
        (number) => {
            if (!Number(number) || Number(number) < 1) {
                return;
            } else {
                setQuantity(number);
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [quantity],
    );
    const handleChangeQuantity = useCallback(
        (operator) => {
            if (quantity === 1 && operator === 'minus') return;
            if (operator === 'plus') setQuantity((prev) => +prev + 1);
            if (operator === 'minus') setQuantity((prev) => +prev - 1);
        },
        [quantity],
    );

    const handleAddToCart = async () => {
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
            const response = await apiAddToCart({ pid, quantity });
            if (response.success) {
                if (response.updateUser.cart) {
                    setFlag(true);
                    Toast({ type: 'success', message: 'This product has been added to cart 👌' });
                } else {
                    Toast({ type: 'info', message: 'This product is already in your cart 🦄' });
                }
            } else {
                Toast({ type: 'error', message: 'Something went wrong 😥' });
            }
        }
    };

    const handleAddToWishList = async () => {
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
        <section className={cx('product-detail')}>
            <ToastContainer />
            <MenuBanner />
            <Container>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                        <div className={cx('product-detail__thumb')}>
                            <div className={cx('product-detail__thumb-img')}>
                                {/* <img src={thumbnail} alt="product" /> */}
                                <ReactImageMagnify
                                    {...{
                                        smallImage: {
                                            alt: 'Wristwatch by Ted Baker London',
                                            isFluidWidth: true,
                                            src: `${thumbnail}`,
                                            className: 'small-image',
                                        },
                                        largeImage: {
                                            className: 'large-image',
                                            src: `${thumbnail}`,
                                            width: 750,
                                            height: 900,
                                        },
                                        enlargedImagePosition: 'over',
                                    }}
                                />
                            </div>
                            <div className={cx('product-detail__image')}>
                                <button className={cx('product-detail__image-btn')} onClick={handleChangeThumbnail}>
                                    <img src={product?.thumb} alt="product" className={cx('product-detail__sub-img')} />
                                </button>
                                {product?.images?.map((item, index) => (
                                    <button
                                        key={index}
                                        className={cx('product-detail__image-btn')}
                                        onClick={handleChangeThumbnail}
                                    >
                                        <img
                                            key={index}
                                            src={item}
                                            alt="product"
                                            className={cx('product-detail__sub-img')}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                        <div className={cx('product-detail__info')}>
                            <h2 className={cx('product-detail__info__title')}>{product?.name}</h2>
                            <Breadcrumbs category={cate} name={name} />
                            <div className={cx('product-detail__info__review')}>
                                {Array.from({ length: product?.totalRating || 0 }).map((_, index) => (
                                    <StartIcon key={index} />
                                ))}
                                {Array.from({ length: halfStar }).map((_, index) => (
                                    <FaStarHalfAlt key={index} />
                                ))}
                                {Array.from({ length: borderStar }).map((_, index) => (
                                    <StartBorderIcon key={index} />
                                ))}
                                <span>({product?.ratings.length || 0}) Customer Reviews</span>
                            </div>
                            <div className={cx('product-detail__info__price')}>$ {product?.price}</div>
                            <div className={cx('product-detail__info__category')}>
                                <span className={cx('categories')}>Category: </span>
                                <span className={cx('name__cate')}>{product?.category}</span>
                            </div>
                            <div className={cx('product-detail__info__description')}>{product?.description}</div>
                            <div className={cx('product_detail__info__actions')}>
                                <div className={cx('actions__quantity')}>
                                    <button
                                        className={cx('quantity__button')}
                                        onClick={() => handleChangeQuantity('minus')}
                                    >
                                        -
                                    </button>
                                    <input
                                        type="text"
                                        className={cx('quantity__number')}
                                        value={quantity}
                                        onChange={(e) => handleQuantity(e.target.value)}
                                    />
                                    <button
                                        className={cx('quantity__button')}
                                        onClick={() => handleChangeQuantity('plus')}
                                    >
                                        +
                                    </button>
                                </div>
                                <div className={cx('actions__add-cart')}>
                                    <PrimaryButton value={'ADD TO CART'} onClick={handleAddToCart} />
                                </div>
                                <div
                                    className={
                                        checkIteminWishList() ? cx('actions__like', 'liked') : cx('actions__like')
                                    }
                                >
                                    <button className={cx('like__button')} onClick={handleAddToWishList}>
                                        <FaRegHeart />
                                    </button>
                                </div>
                            </div>
                            <div className={cx('product-detail__info__delivery')}>
                                <div className={cx('deliverty-row')}>
                                    <FaTruckMoving />
                                    <span>Free global shipping on all orders</span>
                                </div>
                                <div className={cx('deliverty-row')}>
                                    <FaCalendar />
                                    <span>2 hours easy returns if you change your mind</span>
                                </div>
                                <div className={cx('deliverty-row')}>
                                    <FaTag />
                                    <span>Order before noon for same day dispatch</span>
                                </div>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <div className={cx('product-detail__comments')}>
                            <h2 className={cx('product-detail__comments__title')}>
                                Customer Reviews <span>({product?.ratings?.length})</span>{' '}
                            </h2>

                            {product?.ratings?.map((item, index) => (
                                <div className={cx('product-detail__comments__tag')} key={index}>
                                    <div className={cx('comments__tag-avt')}>
                                        <img src={item.postedBy.avatar} alt="avatar" />
                                    </div>
                                    <div className={cx('comments__tag_content')}>
                                        <div className={cx('comments__tag_content-info')}>
                                            <span className={cx('info-name')}>
                                                {item.postedBy.firstname} {item.postedBy.lastname}
                                            </span>
                                            <span className={cx('info-time')}>{moment(item.updatedAt)?.fromNow()}</span>
                                        </div>
                                        <div className={cx('info-feedback')}>
                                            {Array.from({ length: item.star }).map((_, index) => (
                                                <StartIcon key={index} />
                                            ))}
                                        </div>
                                        <div className={cx('info-comment')}>{item.comment}</div>
                                    </div>
                                </div>
                            ))}

                            <form onSubmit={handleSubmit} className={cx('product-detail__comments-current-user')}>
                                <div className={cx('comments-current-user__tag-avt')}>
                                    <img src={avatar} alt="avatar" />
                                </div>
                                <div className={cx('comments-current-user__tag_content')}>
                                    <div className={cx('info_current-user-feedback')}>
                                        <StartComment rating={rating} setRating={setRating} />
                                        <span>(Please choose an one)</span>
                                    </div>
                                    <div className={cx('info_current-user-comment')}>
                                        <textarea
                                            placeholder="Type your comment here..."
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                        />
                                    </div>
                                    <PrimaryButton value={'Post comment'} />
                                </div>
                            </form>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </section>
    );
}

export default ProductDetail;
