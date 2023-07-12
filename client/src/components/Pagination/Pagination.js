import React from 'react';
import usePagination from '~/hooks/usePagination';
import PaginationItem from '../PaginationItem';
import classNames from 'classnames/bind';
import style from './Pagination.module.scss';

const cx = classNames.bind(style);

function Pagination({ totalCount }) {
    const pagination = usePagination(totalCount, 2);
    return (
        <div className={cx('pagination')}>
            {pagination?.map((item) => (
                <PaginationItem key={item}>{item}</PaginationItem>
            ))}
        </div>
    );
}

export default Pagination;
