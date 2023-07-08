import classNames from 'classnames/bind';
import style from './Header.module.scss';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import {
    faCartShopping,
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
import { Fragment, useState } from 'react';
import { useContext } from 'react';
import AuthContext from '~/contexts/AuthContext';

const cx = classNames.bind(style);

function Header() {
    const auth = useContext(AuthContext);
    const loginStatus = auth.loggedIn; // Get the logged-in status from the AuthContext
    const [sticky, setSticky] = useState(false); // State to track whether the header should be sticky or not
    const { firstname, lastname, avatar } = auth.current || {}; // Get the current user from the AuthContext
    console.log(auth.current);

    const handleScroll = () => {
        if (window.scrollY > 100) {
            setSticky(true);
        } else {
            setSticky(false);
        }
    };
    window.addEventListener('scroll', handleScroll); // Add a scroll event listener to the window

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
                    {loginStatus ? (
                        <Fragment>
                            <Tippy content="Your cart" placement="bottom">
                                <div className={cx('navbar__cart')}>
                                    <FontAwesomeIcon icon={faCartShopping} />
                                    <div className={cx('navbar__cart_qty')}>0</div>
                                </div>
                            </Tippy>

                            <div className={cx('navbar__login')}>
                                <div className={cx('navbar__avatar')}>
                                    <img className={cx('navbar__avatar-img')} src={avatar} alt="avatar" />
                                </div>
                                <div className={cx('navbar__username')}>
                                    {firstname} {lastname}
                                </div>
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
                        </Fragment>
                    ) : (
                        <Fragment>
                            <div className={cx('navbar__cart')}>
                                <FontAwesomeIcon icon={faShoppingCart} />
                                <div className={cx('navbar__cart_qty')}>0</div>
                            </div>
                            <Link to={'/Login'} className={cx('navbar__login')}>
                                <button>Login</button>
                            </Link>
                        </Fragment>
                    )}{' '}
                </div>
            </div>
        </header>
    );
}

export default Header;
