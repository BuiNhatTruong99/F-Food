import config from '~/config';
import Home from '~/pages/Home/Home';
import Menu from '~/pages/Menu/Menu';

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.menu, component: Menu },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
