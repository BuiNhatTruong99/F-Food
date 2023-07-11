import { Link } from 'react-router-dom';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import classNames from 'classnames/bind';
import style from './Breadcrumb.module.scss';
import { FaAngleRight } from 'react-icons/fa';

const cx = classNames.bind(style);
const Breadcrumbs = ({ category, name }) => {
    const routes = [
        { path: '/', breadcrumb: 'Home' },
        { path: '/menu', breadcrumb: 'Menu' },
        // { path: '/menu/:category', breadcrumb: category },
        { path: '/menu/:category/:name', breadcrumb: name },
    ];
    const breadcrumbs = useBreadcrumbs(routes);
    return (
        <div className={cx('breadcrum')}>
            {breadcrumbs
                ?.filter((el) => !el.match.route === false)
                .map(({ match, breadcrumb }, index, seft) => (
                    <Link key={match.pathname} to={match.pathname}>
                        <span>{breadcrumb} </span>
                        {index !== seft.length - 1 && <FaAngleRight />}
                    </Link>
                ))}
        </div>
    );
};

export default Breadcrumbs;
