import ReactImageMagnify from 'react-image-magnify';
import MenuBanner from '~/components/MenuBanner/MenuBanner';
import { Container, Grid } from '@material-ui/core';
import { StartBorderIcon, StartIcon } from '~/components/Icons';
import PrimaryButton from '~/components/PrimaryButton/PrimaryButton';
import { FaCalendar, FaRegHeart, FaTag, FaTruckMoving } from 'react-icons/fa';
import Breadcrumbs from '~/components/Breadcrumb/Breadcrumb';
import { useParams } from 'react-router-dom';
import { useCallback, useState } from 'react';
import { apiProduct } from '~/apis/products';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import style from './ProductDetail.module.scss';

const cx = classNames.bind(style);

function ProductDetail() {
    const { pid, name, cate } = useParams();
    const [product, setProduct] = useState(null);
    const [thumbnail, setThumbnail] = useState(null);
    const { current } = useSelector((state) => state.user);
    const { avatar } = current || {};
    const [quantity, setQuantity] = useState(1);

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

    const handleChangeThumbnail = (e) => {
        setThumbnail(e.target.src);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
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

    return (
        <section className={cx('product-detail')}>
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
                                {Array.from({ length: 5 - product?.totalRating || 0 }).map((_, index) => (
                                    <StartBorderIcon key={index} />
                                ))}
                                <span>({product?.ratings.length || 0} ) Customer Reviews</span>
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
                                    <PrimaryButton value={'ADD TO CART'} />
                                </div>
                                <div className={cx('actions__like')}>
                                    <button className={cx('like__button')}>
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
                            <div className={cx('product-detail__comments__tag')}>
                                <div className={cx('comments__tag-avt')}>
                                    <img
                                        src="https://res.cloudinary.com/dgepjghio/image/upload/v1688823143/FAST_FOOD/i9z0avb93ozgfxsasywl.jpg"
                                        alt="avatar"
                                    />
                                </div>
                                <div className={cx('comments__tag_content')}>
                                    <div className={cx('comments__tag_content-info')}>
                                        <span className={cx('info-name')}>Truong Bui</span>
                                        <span className={cx('info-time')}>17 hours ago</span>
                                    </div>
                                    <div className={cx('info-feedback')}>
                                        <StartIcon />
                                        <StartIcon />
                                    </div>
                                    <div className={cx('info-comment')}>Goodddd</div>
                                </div>
                            </div>
                            <form onSubmit={handleSubmit} className={cx('product-detail__comments-current-user')}>
                                <div className={cx('comments-current-user__tag-avt')}>
                                    <img src={avatar} alt="avatar" />
                                </div>
                                <div className={cx('comments-current-user__tag_content')}>
                                    <div className={cx('info_current-user-feedback')}>
                                        <StartIcon />
                                        <StartIcon />
                                        <StartIcon />
                                        <StartIcon />
                                        <StartIcon />
                                        <span>(Please choose an one)</span>
                                    </div>
                                    <div className={cx('info_current-user-comment')}>
                                        <textarea placeholder="Type your comment here..." />
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
