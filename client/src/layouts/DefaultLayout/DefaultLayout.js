import classNames from 'classnames/bind';
import style from './DefaultLayout.module.scss';
import Header from '~/layouts/components/Header/Header';

const cx = classNames.bind(style);

function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
        </div>
    );
}

export default DefaultLayout;
