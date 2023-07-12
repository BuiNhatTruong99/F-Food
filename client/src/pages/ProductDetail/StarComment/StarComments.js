import classNames from 'classnames/bind';
import style from './StarComment.module.scss';
import { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const cx = classNames.bind(style);

function StartComment({ rating, setRating }) {
    const [hover, setHover] = useState(null);

    return (
        <div className={cx('star-widget')}>
            {[...Array(5)].map((star, index) => {
                const currentRating = index + 1;
                return (
                    <label key={index}>
                        <input
                            type="radio"
                            name="rating"
                            value={currentRating}
                            onClick={() => setRating(currentRating)}
                        />
                        <FaStar
                            className={cx('star')}
                            color={currentRating <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
                            onMouseEnter={() => setHover(currentRating)}
                            onMouseLeave={() => setHover(null)}
                        />
                    </label>
                );
            })}
        </div>
    );
}

export default StartComment;
