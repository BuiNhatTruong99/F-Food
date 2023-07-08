import { CircularProgress } from '@material-ui/core';
import classNames from 'classnames/bind';
import style from './Spinner.module.scss';

const cx = classNames.bind(style);

function Spinner() {
    return (
        <div className={cx('spinner')}>
            <CircularProgress thickness={5} style={{ color: '#ff514e' }} />
        </div>
    );
}

export default Spinner;
