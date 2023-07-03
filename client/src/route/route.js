import config from '~/config';
import Home from '~/pages/Home';
import Menu from '~/pages/Menu';
import ProductDetail from '~/pages/ProductDetail';
import Login from '~/pages/Login';

const publicRoutes = [
    { path: config.routes.HOME, component: Home },
    { path: config.routes.MENU, component: Menu },
    { path: config.routes.PRODUCT_DETAIL__CATE__SLUG, component: ProductDetail },
    { path: config.routes.LOGIN, component: Login, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
