import React from 'react';
import {
    Link
} from 'react-router-dom';
import {
    useState , useEffect
} from 'react';
import axios from 'axios';
import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import config from '~/config';
import Dialog from '~/components/items/Dialog';
import user from '~/assets/icons/Male-Circle.svg';
import exit from '~/assets/icons/Exit-1.svg';

const cx = classNames.bind(styles);

function Header({
    handleLogout,
    handleDownloadImage
}) {
    // const pathBackEnd = 'https://backendpainter-v1.onrender.com'
    const pathBackEnd = 'http://localhost:8081';

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
        // Clear localStorage when logging out
        localStorage.removeItem('email');
        localStorage.removeItem('token-user');
    };

    const handleSaveAndDownload = () => {
        const canvas = document.getElementById('myCanvas');
        if (canvas) {
            const timestamp = new Date().getTime();
            const randomString = Math.random().toString(36).substring(7);
            // Get the Data URL of the canvas content as a JPEG image
            const imageDataURL = canvas.toDataURL('image/jpeg');
            console.log(imageDataURL);
            //Trong currentUser da co user_id
            if (localStorage.getItem('email')) {
                // Save canvas image to the database
                saveCanvasImage(localStorage.getItem('email'), imageDataURL);
                // Construct a custom filename based on user and image IDs
                const fileName = `paintingimage__createby_${localStorage.getItem('email')}_${timestamp}_${randomString}.jpg`;
                // Create a temporary link element for downloading
                const link = document.createElement('a');
                link.href = imageDataURL;
                link.download = fileName;
                link.click();
            }
        }
    };

    const getUserIDByUserEmail = async (email) => {
        try {
            const response = await fetch(`${pathBackEnd}/users/getUserIDByEmail`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
            const responseData = await response.json();
            return responseData.userID; // Adjust this based on your actual response structure
        } catch (error) {
            console.error('Error fetching user ID:', error);
            return null; // Handle the error appropriately in your application
        }
    };
    const saveCanvasImage = async (userInfo, image_data) => {
        try {
            const response = await axios.post(`${pathBackEnd}/saveimages`, {
                user_id: getUserIDByUserEmail(localStorage.getItem('email')),
                image_data: image_data,
            });
            console.log(response.data);
        } catch (error) {
            console.log(error);
            console.error('Error saving canvas image:', error);
            console.log('Error details:', error.response.data);
        }
    };
    return (
        <header className={cx('wrapper')}>
            {localStorage.getItem('email') ? (
                <div className={cx('left-items')}>
                    <span className={cx('items')} onClick={handleNewButtonClick}>
                        New
                    </span>
                    {isDialogOpen && (
                        <div className={cx('overlay')} onClick={handleOverlayClick}>
                            <Dialog onClose={handleCloseDialog} />
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

            {localStorage.getItem('email') ? (
                <div className={cx('right-items')}>
                    <Link to={`${config.routes.history}`}>
                        <img src={user} alt="user" className={cx('items-login')} />
                    </Link>
                    <img src={exit} alt="exit" className={cx('items-login')} onClick={handleQuit} />
                </div>
            ) : (
                <div className={cx('right-items')}>
                    <Link to={config.routes.login}>
                        <span className={cx('items')}> Login </span>
                    </Link>
                    <Link to={config.routes.register}>
                        <span className={cx('items')}> Register </span>
                    </Link>
                </div>
            )}
        </header>
    );
}

export default Header;