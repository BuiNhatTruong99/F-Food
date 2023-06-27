import classNames from 'classnames/bind';
import style from './CheckBox.module.scss';

const cx = classNames.bind(style);

function CheckBox({ content, handleOptionClick }) {
    return (
        <label onClick={handleOptionClick} className={cx('check')}>
            <input type="radio" name="Radio" className={cx('check-radio')} value={content} />
            <span className={cx('checkmark')}></span>
            {content}
        </label>
    );
}

export default CheckBox;
