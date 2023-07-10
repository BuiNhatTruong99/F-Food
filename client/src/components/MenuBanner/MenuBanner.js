import classNames from 'classnames/bind';
import style from './MenuBanner.module.scss';

const cx = classNames.bind(style);

function MenuBanner() {
    return (
        <section className={cx('banner')}>
            <h1 className={cx('banner__title')}>Menu</h1>
            <div className={cx('banner__paths')}>
                <span className={cx('banner__slogan')}>"Where Food is Art, Every Dish a Masterpiece of Flavors"</span>
            </div>
        </section>
    );
}

export default MenuBanner;
