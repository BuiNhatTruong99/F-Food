import classNames from 'classnames/bind';
import style from './Header.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import {
    faCartShopping,
    faHome,
    faNewspaper,
    faRightToBracket,
    faStore,
    faTags,
    faUser,
    faUtensils,
} from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import images from '~/assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Fragment, useState } from 'react';
import { useContext } from 'react';
import AuthContext from '~/contexts/AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getCurrentUser } from '~/redux/user/asyncUserActions';
import { logout } from '~/redux/user/userSlice';
import Cart from '~/components/Cart/Cart';
import path from '~/config/route';
import CartContext from '~/contexts/CartContext';
import WishList from '~/components/WishList/WishList';
import WishListContext from '~/contexts/WishListContext';

const cx = classNames.bind(style);

function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useContext(AuthContext);
    const loginStatus = auth.loggedIn; // Get the logged-in status from the AuthContext
    const [sticky, setSticky] = useState(false); // State to track whether the header should be sticky or not
    const { current } = useSelector((state) => state.user); // Get the current user from the redux store
    const { firstname, lastname, avatar } = current || {}; // Destructure the current user object
    const { setIsCartOpen, cart } = useContext(CartContext);
    const numCartItems = current ? cart.length : 0; // Get the number of items in the cart
    const { setIsWishListOpen } = useContext(WishListContext);

    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    useEffect(() => {
        if (loginStatus) {
            dispatch(getCurrentUser()); // If the user is logged in, dispatch the getCurrentUser action to get the current user
        } else {
            dispatch(logout()); // Dispatch the logout action to clear the current user from the redux store
        }
    }, [dispatch, loginStatus]); // Run this effect when the current user changes

    const handleScroll = () => {
        if (window.scrollY > 100) {
            setSticky(true);
        } else {
            setSticky(false);
        }
    };
    window.addEventListener('scroll', handleScroll); // Add a scroll event listener to the window

    const handleLogout = () => {
        //clear local storage
        auth.setLoggedIn(!loginStatus); // Set the logged-in status to false
        setIsWishListOpen(false); // Close the wishlist
        localStorage.removeItem('persist:FFood');
    };

    const toggleCart = () => {
        if (current) {
            setIsCartOpen(true);
            setIsWishListOpen(false);
        } else {
            Swal.fire({
                text: 'Please login to continue',
                cancelButtonText: 'Cancel',
                confirmButtonAriaLabel: 'Login',
                showCancelButton: true,
                title: 'You are not logged in!',
            }).then((result) => {
                if (result.isConfirmed) navigate(`/${path.LOGIN}`);
            });
        }
    };

    return (
        <>
            <header className={sticky ? cx('wrapper', 'sticky') : cx('wrapper')}>
                <div className={cx('inner')}>
                    <div className={cx('menu-toggle')} onClick={toggleMenu}>
                        <div className={cx('toggle-line')}></div>
                        <div className={cx('toggle-line')}></div>
                        <div className={cx('toggle-line')}></div>
                    </div>
                    <Link className={cx('logo')} to="/">
                        <img src={images.logo} alt="FFood" />
                    </Link>
                    <div className={cx('navbar__left', showMenu ? 'show' : '')}>
                        <ul className={cx('navbar__list')}>
                            <Link className={cx('navbar__item')} to="/">
                                <FontAwesomeIcon icon={faHome} /> <span>Home</span>
                            </Link>
                            <Link className={cx('navbar__item')} to="/menu">
                                <FontAwesomeIcon icon={faUtensils} />
                                <span>Menu</span>
                            </Link>
                            <Link className={cx('navbar__item')} to="/news">
                                <FontAwesomeIcon icon={faNewspaper} />
                                <span>News</span>
                            </Link>
                            <Link className={cx('navbar__item')} to="/store-system">
                                <FontAwesomeIcon icon={faStore} />
                                <span>Store locations</span>
                            </Link>
                        </ul>
                    </div>

                    <div className={cx('navbar__right')}>
                        <Fragment>
                            <Tippy content="Your cart" placement="bottom">
                                <div className={cx('navbar__cart')} onClick={toggleCart}>
                                    <FontAwesomeIcon icon={faCartShopping} />
                                    <div className={cx('navbar__cart_qty')}>{numCartItems}</div>
                                </div>
                            </Tippy>
                            {loginStatus && current ? (
                                <div className={cx('navbar__login')}>
                                    <div className={cx('navbar__avatar')}>
                                        <img className={cx('navbar__avatar-img')} src={avatar} alt="avatar" />
                                    </div>
                                    <div className={cx('navbar__username')}>
                                        {firstname} {lastname}
                                    </div>
                                    <ul className={cx('navbar__right-options')}>
                                        <Link className={cx('navbar__right-item')} to={`/my-account/${current._id}`}>
                                            <FontAwesomeIcon icon={faUser} /> My account
                                        </Link>
                                        <li
                                            className={cx('navbar__right-item')}
                                            onClick={() => setIsWishListOpen(true)}
                                        >
                                            <FontAwesomeIcon icon={faTags} />
                                            My wishlist
                                        </li>
                                        <li className={cx('navbar__right-item')} onClick={handleLogout}>
                                            <FontAwesomeIcon icon={faRightToBracket} />
                                            Log out
                                        </li>
                                    </ul>
                                </div>
                            ) : (
                                <Link to={'/Login'} className={cx('navbar__login')}>
                                    <button>Login</button>
                                </Link>
                            )}{' '}
                        </Fragment>
                    </div>
                </div>
            </header>
            <Cart />
            <WishList />
        </>
    );
}

export default Header;
