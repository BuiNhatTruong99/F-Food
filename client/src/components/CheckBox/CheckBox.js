import classNames from 'classnames/bind';
import style from './CheckBox.module.scss';

const cx = classNames.bind(style);

function CheckBox({ content, handleOptionClick }) {
    return (
        <label onClick={handleOptionClick} className={cx('check')}>
            <input type="radio" name="Radio" className={cx('check-radio')} value={content} />
            <span className={cx('checkmark')}></span>
            <span className={cx('content-text')}>{content}</span>
        </label>
    );
}

export default CheckBox;
