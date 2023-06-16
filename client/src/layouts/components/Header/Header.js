import classNames from 'classnames/bind';
import style from './Header.module.scss';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import {
    faHome,
    faNewspaper,
    faRightToBracket,
    faShoppingCart,
    faStore,
    faTags,
    faUser,
    faUtensils,
} from '@fortawesome/free-solid-svg-icons';
import images from '~/assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

const cx = classNames.bind(style);

function Header() {
    const [sticky, setSticky] = useState(false);
    const currentUser = true;

    const handleScroll = () => {
        if (window.scrollY > 100) {
            setSticky(true);
        } else {
            setSticky(false);
        }
    };
    window.addEventListener('scroll', handleScroll);

    return (
        <header className={sticky ? cx('wrapper', 'sticky') : cx('wrapper')}>
            <div className={cx('inner')}>
                <Link className={cx('logo')} to="/">
                    <img src={images.logo} alt="FFood" />
                </Link>
                <div className={cx('navbar__left')}>
                    <ul className={cx('navbar__list')}>
                        <Link className={cx('navbar__item')} to="/">
                            <FontAwesomeIcon icon={faHome} /> Home
                        </Link>
                        <Link className={cx('navbar__item')} to="/menu">
                            <FontAwesomeIcon icon={faUtensils} />
                            Menu
                        </Link>
                        <Link className={cx('navbar__item')} to="/news">
                            <FontAwesomeIcon icon={faNewspaper} />
                            News
                        </Link>
                        <Link className={cx('navbar__item')} to="/store-system">
                            <FontAwesomeIcon icon={faStore} />
                            Store locations
                        </Link>
                    </ul>
                </div>

                <div className={cx('navbar__right')}>
                    {currentUser ? (
                        <>
                            <Tippy content="Your cart" placement="bottom">
                                <div className={cx('navbar__cart')}>
                                    <FontAwesomeIcon icon={faShoppingCart} />
                                    <div className={cx('navbar__cart_qty')}>0</div>
                                </div>
                            </Tippy>

                            <div className={cx('navbar__login')}>
                                <img
                                    className={cx('navbar__avatar')}
                                    src="https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/8945b78461e843b6377df40e1fa5f061~c5_100x100.jpeg?x-expires=1686927600&x-signature=ruT%2BjcE%2F3VWZyhgAt6dB63Ib%2Fcs%3D"
                                    alt="avatar"
                                />
                                <div className={cx('navbar__username')}>Last Name</div>
                                <ul className={cx('navbar__right-options')}>
                                    <li className={cx('navbar__right-item')}>
                                        <FontAwesomeIcon icon={faUser} /> My account
                                    </li>
                                    <li className={cx('navbar__right-item')}>
                                        <FontAwesomeIcon icon={faTags} />
                                        My wishlist
                                    </li>
                                    <li className={cx('navbar__right-item')}>
                                        <FontAwesomeIcon icon={faRightToBracket} />
                                        Log out
                                    </li>
                                </ul>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className={cx('navbar__cart')}>
                                <FontAwesomeIcon icon={faShoppingCart} />
                                <div className={cx('navbar__cart_qty')}>0</div>
                            </div>
                            <div className={cx('navbar__login')}>
                                <button>Login</button>
                            </div>
                        </>
                    )}{' '}
                </div>
            </div>
        </header>
    );
}

export default Header;
