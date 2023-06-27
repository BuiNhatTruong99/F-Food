import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import style from './Menu.module.scss';
import image from '~/assets/images';
import { StartBorderIcon, StartIcon } from '~/components/Icons';
import { getCategories } from '~/redux/asyncActions';
import { Container } from 'react-bootstrap';
import MenuContent from './MenuContent/MenuContent';
import { setSelectedCategory, setSelectedPrice } from '~/redux/appSlice';
import CheckBox from '~/components/CheckBox';

const cx = classNames.bind(style);
const priceOptions = [
    { content: 'Above $100', range: { gt: 100 } },
    { content: '$50 to $99', range: { gte: 50, lte: 99 } },
    { content: '$20 to $49', range: { gte: 20, lte: 49 } },
    { content: 'Under $20', range: { lt: 20 } },
];

function Menu() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCategories());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const { categories } = useSelector((state) => state.app);

    const [activeCategory, setActiveCategory] = useState(0);
    return (
        <section className={cx('menu')}>
            <section className={cx('banner')}>
                <h1 className={cx('banner__title')}>Menu Today</h1>
                <div className={cx('banner__paths')}>
                    <span className={cx('banner__path')}>Quality, taste and service attitude are our criteria</span>
                </div>
            </section>
            <Container className={cx('menu__layout')}>
                <div className={cx('menu__container')}>
                    <div className={cx('menu-filters')}>
                        <h2 className={cx('menu-filters__title')}>Foods</h2>
                        <div className={cx('menu-filters__foods')}>
                            {categories?.map((prodCategory) => (
                                <NavLink
                                    key={prodCategory._id}
                                    // to={prodCategory.name}
                                    className={
                                        activeCategory === prodCategory._id
                                            ? cx('menu-filters__item', 'selected')
                                            : cx('menu-filters__item')
                                    }
                                    onClick={() => {
                                        setActiveCategory(prodCategory._id);
                                        dispatch(setSelectedCategory(prodCategory.name));
                                    }}
                                >
                                    <img src={image[prodCategory.icon]} alt="burger" />
                                    <span className={cx('menu-filters__item-name')}>{prodCategory.name}</span>
                                </NavLink>
                            ))}
                        </div>
                        <h2 className={cx('menu-filters__title')}>Price</h2>
                        <form className={cx('menu-filters__price')}>
                            {priceOptions.map(({ content, range }) => (
                                <CheckBox
                                    key={content}
                                    value={content}
                                    content={content}
                                    handleOptionClick={() => dispatch(setSelectedPrice(range))}
                                />
                            ))}
                        </form>
                        <h2 className={cx('menu-filters__title')}>Rate</h2>
                        <div className={cx('shop-filters__stars')}>
                            <StartIcon />
                            <StartIcon />
                            <StartIcon />
                            <StartIcon />
                            <StartIcon />
                            <span>&amp; up</span>
                        </div>
                        <div className={cx('shop-filters__stars')}>
                            <StartIcon />
                            <StartIcon />
                            <StartIcon />
                            <StartIcon />
                            <StartBorderIcon />
                            <span>&amp; up</span>
                        </div>
                        <div className={cx('shop-filters__stars')}>
                            <StartIcon />
                            <StartIcon />
                            <StartIcon />
                            <StartBorderIcon />
                            <StartBorderIcon />
                            <span>&amp; up</span>
                        </div>
                    </div>
                    <MenuContent />
                </div>
            </Container>
        </section>
    );
}

export default Menu;
