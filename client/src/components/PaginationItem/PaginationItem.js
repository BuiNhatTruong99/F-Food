import classNames from 'classnames/bind';
import style from './PaginationItem.module.scss';

const cx = classNames.bind(style);
function PaginationItem({ children }) {
    return <div className={cx('pagination-item')}>{children}</div>;
}

export default PaginationItem;
