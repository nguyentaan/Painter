/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import HeaderHistory from '../../components/Layout/DefautLayout/HeaderHistory';
import styles from './History.module.scss';
import classNames from 'classnames/bind';
import { createContext } from 'react';
import Loader from '~/components/items/Loader';
import Snackbar from '~/components/items/Snackbar';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userLogout } from '../../actionCreators/LoginAction';
import { setEditMode } from '~/actionCreators/UserAction';

const cx = classNames.bind(styles);

export const SizeContext = createContext();

function History(props) {
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(false);
    const [width, setWidth] = useState(1080);
    const [height, setHeight] = useState(540);
    const pathBackEnd = 'http://localhost:8081';
    const [images, setImages] = useState([]);
    const [snackbar, setSnackbar] = useState({ message: '', type: '' });

    const setSize = (newWidth, newHeight) => {
        setWidth(newWidth);
        setHeight(newHeight);
    };

    const handleLogout = () => {
        props.userLogout();
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
            console.log('getUserIDByUserEmail response:', responseData);
            return responseData.userID; // Adjust this based on your actual response structure
        } catch (error) {
            console.error('Error fetching user ID:', error);
            return null; // Handle the error appropriately in your application
        }
    };

    const fetchImages = async () => {
        try {
            const response = await fetch(`${pathBackEnd}/getAllImages`);
            const responseData = await response.json();

            console.log('API response:', responseData);

            const imagesArray = Array.isArray(responseData.images) ? responseData.images : [];
            const userId = await getUserIDByUserEmail(localStorage.getItem('email'));
            console.log('The current user ' + userId + ' is ');
            const userImages = imagesArray.filter((image) => image.user_id === userId);
            setImages(userImages);
            setLoading(false);
            setDeleting(false);
        } catch (error) {
            console.error('Error fetching images:', error);
            setLoading(false);
            setDeleting(false);
        }
    };

    const deleteImageId = async (imageID) => {
        try {
            setDeleting(true);
            await fetch(`${pathBackEnd}/delete/${imageID}`, {
                method: 'DELETE',
            });

            fetchImages();
            setSnackbar((prevSnackbar) => ({
                ...prevSnackbar,
                message: 'Image deleted successfully!',
                type: 'success',
            }));
        } catch (error) {
            console.error('Error deleting image: ', error);
        }
    };

    const deleteAllImages = async () => {
        try {
            setDeleting(true);
            await fetch(`${pathBackEnd}/deleteAllImages`, {
                method: 'DELETE',
            });
            fetchImages();
        } catch (error) {
            console.error('Error deleting all images: ', error);
        }
    };

    const formatImageDate = (fullDate) => {
        const dateObject = new Date(fullDate);
        const formattedDate = dateObject.toLocaleDateString();
        return formattedDate;
    };
    localStorage.setItem('isEditValue', false);

    const isEditMode = async (value) => {
        props.setEditMode(value);
    };

    useEffect(() => {
        props.setEditMode(true);
    }, []);

    if (localStorage.getItem('token-user')) {
        // var userData = parseJwt(localStorage.getItem("token-user"));
    }

    useEffect(() => {
        if (localStorage.getItem('email') === null) {
            alert('Directing you back to home');
            window.location.href = '/'; // Redirect to the home page
            props.setEditMode(false);
        } else {
            // Only fetch images if userInfo is not null
            fetchImages();
        }
    }, []);

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
            <HeaderHistory handleLogout={handleLogout} />{' '}
            <div className={cx('wrapper')}>
                <div className={cx('container-history')}>
                    {loading || deleting ? (
                        <div className={cx('overlay')}>
                            <Loader />
                        </div>
                    ) : (
                        <>
                            <div className={cx('container-header')}>
                                <h3>{localStorage.getItem('email')} </h3>
                                <div className={cx('buttons-action')}>
                                    <button onClick={deleteAllImages()}>Delete All</button>
                                </div>
                            </div>
                            <div className={cx('list-images')}>
                                {images.map((image) => (
                                    <div key={image.imageID} className={cx('image-item')}>
                                        <img src={image.image_data} alt="anh" className={cx('card-image')} />
                                        <p className={cx('image-item-date')}>
                                            Created at: {formatImageDate(image.dateImage)}
                                        </p>
                                        <div className={cx('buttons-action')}>
                                            <Link to={`/edit/${image.imageID}`}>
                                                <button onClick={() => isEditMode(true)}>Edit</button>
                                            </Link>
                                            <button onClick={() => deleteImageId(image.imageID)}>Delete</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
            <Snackbar
                message={snackbar.message}
                type={snackbar.type}
                onClose={() => setSnackbar({ message: '', type: '' })}
            />
        </SizeContext.Provider>
    );
}

const mapStateToProps = (state) => {
    return {
        tokenUser: state.LoginReducer.tokenUser,
        dataCart: state.UserReducer.dataCart,
        editMode: state.UserReducer.editMode,
    };
};

const mapDispatchToProps = {
    userLogout,
    setEditMode,
};
export default connect(mapStateToProps, mapDispatchToProps)(History);
