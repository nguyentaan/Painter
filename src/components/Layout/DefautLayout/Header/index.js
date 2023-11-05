import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import config from '~/config';
import Dialog from '~/components/items/Dialog';
import user from '~/assets/icons/Male-Circle.svg';
import exit from '~/assets/icons/Exit-1.svg';
import undo from '~/assets/icons/Down-Left.svg';
import redo from '~/assets/icons/Down-Right.svg';

const cx = classNames.bind(styles);

function Header() {
    const [currentUser, setCurrentUser] = useState(true); // Initialize currentUser as true to show user info initially
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleNewButtonClick = () => {
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    const handleCreateItem = (itemData) => {
        console.log('Creating item:', itemData);
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            handleCloseDialog();
        }
    };

    const handleQuit = () => {
        setCurrentUser(false); // Set currentUser to false when quitting
    };

    return (
        <header className={cx('wrapper')}>
            <div className={cx('left-items')}>
                <span className={cx('items')} onClick={handleNewButtonClick}>
                    New
                </span>
                {isDialogOpen && (
                    <div className={cx('overlay')} onClick={handleOverlayClick}>
                        <Dialog onClose={handleCloseDialog} onConfirm={handleCreateItem} />
                    </div>
                )}
                <span className={cx('items')} onClick={handleNewButtonClick}>
                    Edit
                </span>
                {isDialogOpen && (
                    <div className={cx('overlay')} onClick={handleOverlayClick}>
                        <Dialog onClose={handleCloseDialog} onConfirm={handleCreateItem} />
                    </div>
                )}
                <img src={undo} alt="undo" className={cx('items')} />
                <img src={redo} alt="redo" className={cx('items')} />
            </div>

            {currentUser ? (
                <div className={cx('right-items')}>
                    <Link to={config.routes.history}>
                        <img src={user} alt="user" className={cx('items-login')} />
                    </Link>
                    <img src={exit} alt="exit" className={cx('items-login')} onClick={handleQuit} />
                </div>
            ) : (
                <div className={cx('right-items')}>
                    <Link to={config.routes.login}>
                        <span className={cx('items')}>Login</span>
                    </Link>
                    <Link to={config.routes.register}>
                        <span className={cx('items')}>Register</span>
                    </Link>
                </div>
            )}
        </header>
    );
}

export default Header;
