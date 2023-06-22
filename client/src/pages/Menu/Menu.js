import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import style from './Menu.module.scss';
import image from '~/assets/images';
import { StartBorderIcon, StartIcon } from '~/components/Icons';
import { getCategories } from '~/redux/asyncActions';

const cx = classNames.bind(style);

function Menu() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCategories());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const { categories } = useSelector((state) => state.app);
    return (
        <section className={cx('menu')}>
            <section className={cx('banner')}>
                <h1 className={cx('banner__title')}>Menu</h1>
                <div className={cx('banner__paths')}>
                    <Link to={'/'} className={cx('banner__path')}>
                        Home
                    </Link>
                    <FontAwesomeIcon icon={faEllipsis} />
                    <Link to={'/menu'} className={cx('banner__path')}>
                        Menu
                    </Link>
                </div>
            </section>
            <div className={cx('menu__layout')}>
                <div className={cx('menu__container')}>
                    <div className={cx('menu-filters')}>
                        <h2 className={cx('menu-filters__title')}>Foods</h2>
                        <ul className={cx('menu-filters__foods')}>
                            {categories?.map((prodCategory) => (
                                <NavLink
                                    key={prodCategory._id}
                                    to={prodCategory.name}
                                    className={cx('menu-filters__item')}
                                >
                                    <img src={image[prodCategory.icon]} alt="burger" />
                                    <span className={cx('menu-filters__item-name')}>{prodCategory.name}</span>
                                </NavLink>
                            ))}
                        </ul>
                        <h2 className={cx('menu-filters__title')}>Price</h2>
                        <form className={cx('menu-filters__price')}>
                            <label className={cx('check')}>
                                <input type="radio" name="Radio" className={cx('check-radio')} />
                                <span className={cx('checkmark')}></span>
                                Under $10
                            </label>
                            <label className={cx('check')}>
                                <input type="radio" name="Radio" className={cx('check-radio')} />
                                <span className={cx('checkmark')}></span>
                                $10 to 30$
                            </label>
                            <label className={cx('check')}>
                                <input type="radio" name="Radio" className={cx('check-radio')} />
                                <span className={cx('checkmark')}></span>
                                $30 to 50$
                            </label>
                            <label className={cx('check')}>
                                <input type="radio" name="Radio" className={cx('check-radio')} />
                                <span className={cx('checkmark')}></span>
                                Above $50
                            </label>
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
                    <div className={cx('menu-content')}></div>
                </div>
            </div>
        </section>
    );
}

export default Menu;
