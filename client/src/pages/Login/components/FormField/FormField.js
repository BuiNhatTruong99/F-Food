import classNames from 'classnames/bind';
import style from './FormField.module.scss';

const cx = classNames.bind(style);

function LoginFormField({ name, label, icon, placeholder, errors, register, vale, setValue }) {
    return (
        <div className={cx('form-field')}>
            <label htmlFor={label}>{label}</label>
            <div className={cx('form-field__wrapper')}>
                {icon}
                <input
                    {...register(name)}
                    id={label}
                    name={name}
                    placeholder={placeholder}
                    type={name}
                    value={vale} // Use 'vale' instead of 'value'
                    onChange={(e) => setValue((prev) => ({ ...prev, [name]: e.target.value }))}
                />
            </div>
            {errors[name] && <span className={cx('form-field__error')}>{errors[name].message}</span>}
        </div>
    );
}

export default LoginFormField;
