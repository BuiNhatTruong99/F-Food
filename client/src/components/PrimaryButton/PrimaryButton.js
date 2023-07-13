import classNames from 'classnames/bind';
import style from './PrimaryButton.module.scss';

const cx = classNames.bind(style);

function PrimaryButton({ value, onClick, type, icon }) {
    return (
        <button type={type} className={cx('primary__submit-btn')} onClick={onClick}>
            {icon}
            {value}
        </button>
    );
}

export default PrimaryButton;
