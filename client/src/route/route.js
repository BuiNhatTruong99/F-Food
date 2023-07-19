import config from '~/config';
import Home from '~/pages/Home';
import Menu from '~/pages/Menu';
import ProductDetail from '~/pages/ProductDetail';
import Login from '~/pages/Login';
import ResetPassword from '~/pages/ResetPassword';
import MyAccount from '~/pages/MyAccount';
import Checkout from '~/pages/Checkout/Checkout';

const publicRoutes = [
    { path: config.routes.HOME, component: Home },
    { path: config.routes.MENU, component: Menu },
    { path: config.routes.PRODUCT_DETAIL__CATE__SLUG__PID, component: ProductDetail },
    { path: config.routes.LOGIN, component: Login, layout: null },
    { path: config.routes.RESET_PASSWORD, component: ResetPassword, layout: null },
    { path: config.routes.MY_ACCOUNT, component: MyAccount, layout: null },
    { path: config.routes.CHECKOUT, component: Checkout, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
