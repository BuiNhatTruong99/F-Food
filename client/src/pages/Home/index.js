import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons';
import { analysis } from './analysis';
import style from './Home.module.scss';
import { Container } from 'react-bootstrap';
// import { useSelector } from 'react-redux';

const cx = classNames.bind(style);

function Home() {
    // const { isLoggedIn, current } = useSelector((state) => state.user);
    const settings = {
        dots: true,
        lazyLoad: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 6000,
        infinite: true,
        accessibility: false,
        dotsClass: `slick-dots ${style.dots}`,
    };

    return (
        <section className={cx('home-banners')}>
            <div className={cx('slide')}>
                <Slider {...settings}>
                    {analysis.map((item, index) => (
                        <div key={index} className={cx('home-banner')}>
                            <div className={cx('home-banner-item')} style={{ backgroundImage: `url(${item.image})` }}>
                                <Container className={cx('home-banner-item__layout')}>
                                    <div className={cx('home-banner-item__container')}>
                                        <div className={cx('home-banner-item__title')}>{item.title}</div>
                                        <div className={cx('home-banner-item__content')}>
                                            {item.content} <strong>{item.key_word}</strong>
                                        </div>
                                        <div className={cx('home-banner-item__button')}>
                                            <button className={cx('btn-order')}>
                                                <span className={cx('btn-label')}>
                                                    <FontAwesomeIcon icon={faBasketShopping} />
                                                    ORDER NOW
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </Container>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </section>
    );
}

export default Home;
