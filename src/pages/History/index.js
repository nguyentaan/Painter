import React, { useState, useEffect } from 'react';
import Header from '../../components/Layout/DefautLayout/Header';
import styles from './History.module.scss';
import classNames from 'classnames/bind';
import { createContext } from 'react';
import { useUser } from '../../hook/UserContext';

const cx = classNames.bind(styles);

export const SizeContext = createContext();

function History() {
    const [selectedTool, setSelectedTool] = useState('brush');
    const [brushWidth, setBrushWidth] = useState(5);
    const [selectedColor, setSelectedColor] = useState('rgb(0,0,0)');
    const [isClear, setIsClear] = useState(false);

    const [width, setWidth] = useState(1080);
    const [height, setHeight] = useState(540);

    const setSize = (newWidth, newHeight) => {
        setWidth(newWidth);
        setHeight(newHeight);
    };

    const [images, setImages] = useState([]);
    const { userInfo, logout } = useUser();

    const handleLogout = () => {
        logout();
    };

    const handleDownloadImage = () => {
        const canvas = document.getElementById('myCanvas');
        if (canvas) {
            const timestamp = new Date().getTime();
            const randomString = Math.random().toString(36).substring(7);
            const fileName = `drawing_${timestamp}_${randomString}.jpg`;
            const imageDataURL = canvas.toDataURL('image/jpeg');
            const link = document.createElement('a');
            link.href = imageDataURL;
            link.download = fileName;
            link.click();
        }
    };

    const fetchImages = async () => {
        try {
            const response = await fetch('http://localhost:8081/getAllImages');
            const responseData = await response.json();

            console.log('API response:', responseData);

            const data = Array.isArray(responseData.images) ? responseData.images : [];

            const userImages = data.filter((image) => image.user_id === userInfo.user_id);
            setImages(userImages);
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    const formatImageDate = (fullDate) => {
        const dateObject = new Date(fullDate);
        const formattedDate = dateObject.toLocaleDateString();
        return formattedDate;
    };

    useEffect(() => {
        if (userInfo === null) {
            alert('Directing you back to home');
            window.location.href = '/'; // Redirect to the home page
        } else {
            // Only fetch images if userInfo is not null
            fetchImages();
        }
    }, [userInfo]);

    console.log('is user: ', userInfo);

    if (userInfo === null) {
        // Don't render anything if userInfo is null
        return null;
    }

    return (
        <SizeContext.Provider
            value={{
                width,
                height,
                setWidth,
                setHeight,
                setSize,
            }}
        >
            <Header userInfo={userInfo} handleLogout={handleLogout} handleDownloadImage={handleDownloadImage} />{' '}
            <div className={cx('wrapper')}>
                <div className={cx('container-history')}>
                    <h3> This is a history details of User: {userInfo.user_email} </h3>{' '}
                    <div className={cx('list-images')}>
                        {' '}
                        {images.map((image) => (
                            <div
                                key={image.imageID}
                                className={cx('image-item')}
                                style={{
                                    backgroundImage: `url(${image.image_data})`,
                                }}
                            >
                                <p className={cx('image-item-date')}>
                                    {' '}
                                    Created at: {formatImageDate(image.dateImage)}{' '}
                                </p>{' '}
                            </div>
                        ))}{' '}
                    </div>{' '}
                </div>{' '}
            </div>{' '}
        </SizeContext.Provider>
    );
}

export default History;
