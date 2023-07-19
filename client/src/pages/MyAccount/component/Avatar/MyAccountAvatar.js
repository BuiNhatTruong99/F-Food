import classNames from 'classnames/bind';
import style from './MyAccountAvatar.module.scss';
import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import PrimaryButton from '~/components/PrimaryButton/PrimaryButton';
import { useParams } from 'react-router-dom';
import { apiUploadUserAvatar } from '~/apis/user';
import { toast } from 'react-toastify';

const cx = classNames.bind(style);

function MyAccountAvatar() {
    const fileInputRef = useRef(null);
    const { uid } = useParams();
    const { current } = useSelector((state) => state.user);
    const [avatar, setAvatar] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    useEffect(() => {
        // Set the avatar preview when the avatar URL changes (e.g., when the user updates their avatar)
        setPreviewUrl(current.avatar);
    }, [current.avatar]);

    const handlePreviewAvatar = (e) => {
        const file = e.target.files[0];
        setAvatar(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewUrl(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleChooseFile = () => {
        fileInputRef.current.click();
    };

    const handleChangeAvatar = async () => {
        const formData = new FormData();
        formData.append('user-avatar', avatar);

        const id = toast.loading('Please wait...');
        const response = await apiUploadUserAvatar(uid, formData);
        if (response.success) {
            toast.update(id, {
                render: 'Change avatar successfully',
                type: 'success',
                isLoading: false,
                autoClose: 1000,
            });
        } else {
            toast.update(id, {
                render: response.message,
                type: 'warning',
                isLoading: false,
                autoClose: 1000,
            });
        }
    };

    return (
        <div className={cx('avatar')}>
            <div className={cx('avatar__img')}>
                {previewUrl ? <img src={previewUrl} alt="avatar" /> : avatar && <img src={avatar} alt="avatar" />}
                <div className={cx('avatar__input-file')}>
                    <button className={cx('avatar__btn--choose')} onClick={handleChooseFile}>
                        <AiOutlineCloudUpload />
                    </button>
                    <input type="file" onChange={handlePreviewAvatar} ref={fileInputRef} />
                </div>
            </div>
            <div className={cx('avatar-info')}>
                <div className={cx('avatar__name')}>
                    <div className={cx('name')}>
                        {current.firstname} {current.lastname}
                    </div>
                    <div className={cx('avatar__email')}>({current.email})</div>
                </div>

                <div className={cx('avatar__btn')}>
                    <PrimaryButton value={'Change avatar'} onClick={handleChangeAvatar} />
                </div>
            </div>
        </div>
    );
}

export default MyAccountAvatar;
