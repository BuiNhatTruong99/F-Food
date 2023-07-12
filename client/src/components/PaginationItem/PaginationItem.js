import classNames from 'classnames/bind';
import style from './PaginationItem.module.scss';
import { useContext } from 'react';
import PaginationContext from '~/contexts/PaginationContext';

const cx = classNames.bind(style);
function PaginationItem({ children }) {
    const pagination = useContext(PaginationContext);

    return (
        <div
            className={pagination.page === children ? cx('pagination-item', 'active') : cx('pagination-item')}
            onClick={() => pagination.setPage(children)}
        >
            {children}
        </div>
    );
}

export default PaginationItem;
