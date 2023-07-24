import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { BsCheck } from 'react-icons/bs';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons';
import { analysis } from './analysis';
import style from './Home.module.scss';
import { Container } from '@material-ui/core';
import { Grid } from '@material-ui/core';
// import { useSelector } from 'react-redux';

const cx = classNames.bind(style);

function Home() {
    // const { isLoggedIn, current } = useSelector((state) => state.user);
    const settings = {
        dots: true,
        arrows: false,
        lazyLoad: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
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
                <section className={cx('introduction')}>
                    <Container>
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <div className={cx('intro-thumb')}>
                                    <img
                                        src="https://themecanel.rktheme.com/cafeteria/wp-content/uploads/2023/01/dl.beatsnoop.com-high-8f5eaf1edec0722794-2-2.jpg"
                                        alt=""
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <div className={cx('intro-side')}>
                                    <h4>Our Introduction</h4>
                                    <h2>About FFood</h2>
                                    <div className={cx('intro-content')}>
                                        <h5>
                                            There are many variations of passages of Lorem Ipsum available, but the
                                            majority have suffered alteration in some form.
                                        </h5>
                                        <p>
                                            All the Lorem Ipsum generators on the Internet tend to repeat predefined
                                            chunks as necessary, making this the first true generator on the Internet.
                                            It uses a dictionary of over 200 Latin words, combined with a handful of
                                            model sentence structures.
                                        </p>
                                    </div>
                                    <div className={cx('intro-button')}>
                                        <button className={cx('btn-disco')}>Discover More</button>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </Container>
                </section>
                <section className={cx('shopify')}>
                    <Container>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={12} md={6} lg={4}>
                                <div className={cx('populated')}>
                                    <div className={cx('populated-img')}>
                                        <img
                                            src="https://themecanel.rktheme.com/cafeteria/wp-content/uploads/2023/01/fish-icon-1-1.png"
                                            alt=""
                                        />
                                    </div>
                                    <div className={cx('populated-content')}>
                                        <h3>100% unique food</h3>
                                        <p>Fusce sed urna lobortis ultric mauris nibh molestie es nulla ac euismod.</p>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={4}>
                                <div className={cx('populated')}>
                                    <div className={cx('populated-img')}>
                                        <img
                                            src="https://themecanel.rktheme.com/cafeteria/wp-content/uploads/2023/01/icon-7-1.png"
                                            alt=""
                                        />
                                    </div>
                                    <div className={cx('populated-content')}>
                                        <h3>Authentic atmosphere</h3>
                                        <p>Aenean vehicula libero mauris nec neque ullamcorper dolor mollis quis.</p>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={4}>
                                <div className={cx('populated')}>
                                    <div className={cx('populated-img')}>
                                        <img
                                            src="https://themecanel.rktheme.com/cafeteria/wp-content/uploads/2023/01/chef-hat-1-1.png"
                                            alt=""
                                        />
                                    </div>
                                    <div className={cx('populated-content')}>
                                        <h3>Skilled chef</h3>
                                        <p>
                                            Curabitur dignissim sapien quis nisi ornar sed scelerisq ligula dignissim.
                                        </p>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </Container>
                </section>
                <section className={cx('professional')}>
                    <Container>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={5} lg={5}>
                                <div className={cx('professional-side')}>
                                    <h4>Discover More</h4>
                                    <h2>High Professional Service</h2>
                                    <div className={cx('professional-content')}>
                                        <h5>
                                            Morbi pharetr se id lectus iaculis, nec commodo mauris interdum. Quisque
                                            ipsum neque, ullamcorper in diam nec.
                                        </h5>
                                        <ul className={cx('content-items')}>
                                            <li className={cx('content-item')}>
                                                <BsCheck />
                                                <span>All the lorem ipsum generators on the Internet</span>
                                            </li>
                                            <li className={cx('content-item')}>
                                                <BsCheck />
                                                <span>When an unknown printer took a galley</span>
                                            </li>
                                            <li className={cx('content-item')}>
                                                <BsCheck />
                                                <span>Various versions have evolved years</span>
                                            </li>
                                        </ul>
                                        <div className={cx('professional-button')}>
                                            <button className={cx('btn-about')}>More about us</button>
                                        </div>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={7} lg={7}></Grid>
                        </Grid>
                    </Container>
                </section>
                <section className={cx('quot')}>
                    <Container>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={4} lg={4}>
                                <div className={cx('quot-item')}>
                                    <div className={cx('quot-thumb')}>
                                        <img
                                            src="https://themecanel.rktheme.com/cafeteria/wp-content/uploads/2023/01/home-v2-icon-1-1.png"
                                            alt=""
                                        />
                                    </div>
                                    <div className={cx('quot-content')}>
                                        <h2>Best Atmosphere</h2>
                                        <p>Nulla condimentum aliquet elemen tum auctor maecenas elementu lacus eros.</p>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} lg={4}>
                                <div className={cx('quot-item')}>
                                    <div className={cx('quot-thumb')}>
                                        <img
                                            src="https://themecanel.rktheme.com/cafeteria/wp-content/uploads/2023/01/home-v2-icon-2-1.png"
                                            alt=""
                                        />
                                    </div>
                                    <div className={cx('quot-content')}>
                                        <h2>High Food Quality</h2>
                                        <p>Nulla condimentum aliquet elemen tum auctor maecenas elementu lacus eros.</p>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} lg={4}>
                                <div className={cx('quot-item')}>
                                    <div className={cx('quot-thumb')}>
                                        <img
                                            src="https://themecanel.rktheme.com/cafeteria/wp-content/uploads/2023/01/home-v2-icon-3-1.png"
                                            alt=""
                                        />
                                    </div>
                                    <div className={cx('quot-content')}>
                                        <h2>Healthy on a budget</h2>
                                        <p>Nulla condimentum aliquet elemen tum auctor maecenas elementu lacus eros.</p>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </Container>
                </section>
            </div>
        </section>
    );
}

export default Home;
