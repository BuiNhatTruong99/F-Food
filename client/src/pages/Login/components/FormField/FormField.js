import classNames from 'classnames/bind';
import style from './FormField.module.scss';

const cx = classNames.bind(style);

function LoginFormField({ name, label, icon, placeholder, errors, register }) {
    return (
        <div className={cx('form-field')}>
            <label htmlFor={label}>{label}</label>
            <div className={cx('form-field__wrapper')}>
                {icon}
                <input {...register(name)} id={label} name={name} placeholder={placeholder} type={name} />
            </div>
            <span className={cx('form-field__error')}>{errors[name]?.message}</span>
        </div>
    );
}

export default LoginFormField;
