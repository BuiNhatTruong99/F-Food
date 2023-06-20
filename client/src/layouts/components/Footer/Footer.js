/* eslint-disable jsx-a11y/iframe-has-title */
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import style from './Footer.module.scss';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faMailBulk, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FaceBookIcon, InstagramIcon, TwitterIcon, YoutubeIcon } from '~/components/Icons/Icon';

const cx = classNames.bind(style);

function Footer() {
    return (
        <footer className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Row className={cx('footer__content')}>
                    <Col className={cx('footer__content-item')}>
                        <div className={cx('footer__content-time')}>
                            <div className={cx('col')}>
                                <span className={cx('footer__time-day')}>Sunday</span>
                                <span className={cx('footer__time-day')}>Monday</span>
                                <span className={cx('footer__time-day')}>Tuesday</span>
                                <span className={cx('footer__time-day')}>Wednesday</span>
                                <span className={cx('footer__time-day')}>Friday</span>
                                <span className={cx('footer__time-day')}>Saturday</span>
                            </div>
                            <div className={cx('col')}>
                                <span className={cx('footer__time-day')}>--</span>
                                <span className={cx('footer__time-day')}>--</span>
                                <span className={cx('footer__time-day')}>--</span>
                                <span className={cx('footer__time-day')}>--</span>
                                <span className={cx('footer__time-day')}>--</span>
                                <span className={cx('footer__time-day')}>--</span>
                            </div>
                            <div className={cx('col')}>
                                <span className={cx('footer__time-hour')}>Closed</span>
                                <span className={cx('footer__time-hour')}>8.00-20.00</span>
                                <span className={cx('footer__time-hour')}>10.00-5.00</span>
                                <span className={cx('footer__time-hour')}>12.00-9.00</span>
                                <span className={cx('footer__time-hour')}>7.00-1.00</span>
                                <span className={cx('footer__time-hour')}>9.00-12.00</span>
                            </div>
                        </div>
                    </Col>
                    <Col className={cx('footer__content-item')}>
                        <div className={cx('footer__content-address')}>
                            <h3 className={cx('footer__content-address-title')}>Address</h3>
                            <div className={cx('footer_content-address-contact')}>
                                <FontAwesomeIcon icon={faPhone} /> <span>084 999 9999</span>
                            </div>
                            <div className={cx('footer_content-address-contact')}>
                                <FontAwesomeIcon icon={faMailBulk} /> <span>ffood@gmail.com</span>
                            </div>
                            <div className={cx('footer_content-address-contact')}>
                                <FontAwesomeIcon icon={faLocationDot} /> <span>888 Tp.HCM, VietNam</span>
                            </div>
                        </div>
                        <div className={cx('footer_content-social')}>
                            <Tippy content="Facebook" placement="bottom-end">
                                <FaceBookIcon />
                            </Tippy>
                            <Tippy content="Twitter" placement="bottom-end">
                                <TwitterIcon />
                            </Tippy>
                            <Tippy content="Instagram" placement="bottom-end">
                                <InstagramIcon />
                            </Tippy>
                            <Tippy content="Youtube" placement="bottom-end">
                                <YoutubeIcon />
                            </Tippy>
                        </div>
                    </Col>
                    <Col className={cx('footer__content-item')}>
                        <div className={cx('footer__content-map')}>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.5126380715246!2d106.70092417905299!3d10.771993661984503!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f43fd97af5f%3A0x88ba5dd71b15433c!2zQml0ZXhjbyBUb3dlciwgaOG6u20gc-G7kSAyIEjDoG0gTmdoaSwgQuG6v24gTmdow6ksIFF14bqtbiAxLCBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmgsIFZp4buHdCBOYW0!5e0!3m2!1svi!2sus!4v1686901061899!5m2!1svi!2sus"
                                style={{ border: 0, width: '100%', height: '100%' }}
                                loading="lazy"
                                allowFullScreen
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </Col>
                </Row>
            </div>
        </footer>
    );
}

export default Footer;
