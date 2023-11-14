import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import config from '~/config';
import Dialog from '~/components/items/Dialog';
import user from '~/assets/icons/Male-Circle.svg';
import exit from '~/assets/icons/Exit-1.svg';

const cx = classNames.bind(styles);

function Header({ userInfo, handleLogout, handleDownloadImage }) {
    const [currentUser, setCurrentUser] = useState(userInfo);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleNewButtonClick = () => {
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            handleCloseDialog();
        }
    };

    const handleQuit = () => {
        setCurrentUser(null);
        handleLogout();
    };

    const handleSaveAndDownload = () => {
        const canvas = document.getElementById('myCanvas');
        if (canvas) {
            const timestamp = new Date().getTime();
            const randomString = Math.random().toString(36).substring(7);

            // Combine timestamp and random string for a unique name
            const fileName = `drawing_${timestamp}_${randomString}.jpg`;

            // Get the Data URL of the canvas content as a JPEG image
            const imageDataURL = canvas.toDataURL('image/jpeg');

            if (currentUser) {
                // Save canvas image to the database
                saveCanvasImage(userInfo, imageDataURL);
            }

            // Create a temporary link element for downloading
            const link = document.createElement('a');
            link.href = imageDataURL;
            link.download = fileName;
            link.click();
        }
    };

    const saveCanvasImage = async (userInfo, imageData) => {
        try {
            const response = await axios.post('http://localhost:8081/saveimages', {
                userId: userInfo.id,
                ImageData: imageData,
            });

            console.log(response.data);
            // You can add logic here to handle the response, such as displaying a success message
        } catch (error) {
            console.error('Error saving canvas image:', error);

            // Log more details about the error
            console.log('Error details:', error.response.data);

            // You can add logic here to handle errors, such as displaying an error message
        }
    };

    return (
        <header className={cx('wrapper')}>
            {currentUser ? (
                <div className={cx('left-items')}>
                    <span className={cx('items')} onClick={handleNewButtonClick}>
                        New
                    </span>
                    {isDialogOpen && (
                        <div className={cx('overlay')} onClick={handleOverlayClick}>
                            <Dialog />
                        </div>
                    )}
                    <span className={cx('items')} onClick={handleSaveAndDownload}>
                        Save
                    </span>
                    <span className={cx('items')} onClick={handleDownloadImage}>
                        Download
                    </span>
                </div>
            ) : (
                <div className={cx('left-items')}>
                    <span className={cx('items')} onClick={handleNewButtonClick}>
                        New
                    </span>
                    {isDialogOpen && (
                        <div className={cx('overlay')} onClick={handleOverlayClick}>
                            <Dialog />
                        </div>
                    )}
                    <span className={cx('items')} onClick={handleDownloadImage}>
                        Download
                    </span>
                </div>
            )}

            {currentUser ? (
                <div className={cx('right-items')}>
                    <Link to={`${config.routes.history}`}>
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
