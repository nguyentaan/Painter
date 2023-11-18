import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import styles from './HeaderHistory.scss';
import classNames from 'classnames/bind';
import config from '~/config';
import user from '~/assets/icons/Male-Circle.svg';
import exit from '~/assets/icons/Exit-1.svg';
import { useUser } from '../../../../hook/UserContext';

const cx = classNames.bind(styles);
function HeaderHistory({ userInfo, handleLogout}) {
    const [currentUser, setCurrentUser] = useState(userInfo);

    const handleQuit = () => {
        setCurrentUser(null);
        handleLogout();
    };

    const handleBackToHome = () =>{
        window.location.href = '/'; // Redirect to the home page
    }

    return (
        <header className={cx('wrapper')}>
            {' '}
            {currentUser ? (
                <div className={cx('left-items')}>
                    <span className={cx('items')} onClick={handleBackToHome}>
                        Back{' '}
                    </span>{' '}
                </div>
            ) : (
                <div className={cx('left-items')}>

                </div>
            )}
            {currentUser ? (
                <div className={cx('right-items')}>
                    <Link to={`${config.routes.history}`}>
                        <img src={user} alt="user" className={cx('items-login')} />{' '}
                    </Link>{' '}
                    <img src={exit} alt="exit" className={cx('items-login')} onClick={handleQuit} />{' '}
                </div>
            ) : (
                <div className={cx('right-items')}>
                    <Link to={config.routes.login}>
                        <span className={cx('items')}> Login </span>{' '}
                    </Link>{' '}
                    <Link to={config.routes.register}>
                        <span className={cx('items')}> Register </span>{' '}
                    </Link>{' '}
                </div>
            )}{' '}
        </header>
    );
}

export default HeaderHistory;
