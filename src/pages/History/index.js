/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import HeaderHistory from '../../components/Layout/DefautLayout/HeaderHistory';
import styles from './History.module.scss';
import classNames from 'classnames/bind';
import { createContext } from 'react';
import { useUser } from '../../hook/UserContext';
import Loader from '~/components/items/Loader';
import { Link } from 'react-router-dom';
import useSharedState from '~/hook/useShareState';
import { connect } from "react-redux";
import { userLogout } from "../../actionCreators/LoginAction";

const cx = classNames.bind(styles);

export const SizeContext = createContext();

function History(props) {
    const [loading, setLoading] = useState(true);
    const [width, setWidth] = useState(1080);
    const [height, setHeight] = useState(540);
    const pathBackEnd = 'http://localhost:8081';

    const [updateIsEdit] = useSharedState();

    const setSize = (newWidth, newHeight) => {
        setWidth(newWidth);
        setHeight(newHeight);
    };

    const [images, setImages] = useState([]);
    const { userInfo, logout } = useUser();

    const handleLogout = () => {
        props.userLogout();
        logout();
    };



    const fetchImages = async () => {
        try {
            const response = await fetch(`${pathBackEnd}/getAllImages`);
            const responseData = await response.json();

            console.log('API response:', responseData);

            const data = Array.isArray(responseData.images) ? responseData.images : [];

            const userImages = data.filter((image) => image.user_id === userInfo.user_id);
            setImages(userImages);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching images:', error);
            setLoading(false);
        }
    };

    const formatImageDate = (fullDate) => {
        const dateObject = new Date(fullDate);
        const formattedDate = dateObject.toLocaleDateString();
        return formattedDate;
    };

    const parseJwt = (token) => {
        try {
          const base64Url = token.split(".")[1];
          const base64 = base64Url.replace("-", "+").replace("_", "/");
          const decoded = JSON.parse(atob(base64));
          return decoded;
        } catch (e) {
          console.error("Error parsing JWT:", e);
          return null;
        }
      };
      
      // Usage
      if (localStorage.getItem("token-user")) {
        var userData = parseJwt(localStorage.getItem("token-user"));
        // Now userData contains the decoded JWT payload
      }
    

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
            <HeaderHistory userInfo={userInfo} handleLogout={handleLogout}/>{' '}
            <div className={cx('wrapper')}>
                <div className={cx('container-history')}>
                    {loading ? (
                        <div className={cx('overlay')}>
                            <Loader />
                        </div>
                    ) : (
                        <>
                            <h3> This is a history details of User: {userData.email} </h3>{' '}
                            <div className={cx('list-images')}>
                                {images.map((image) => (
                                    <div key={image.imageID} className={cx('image-item')}>
                                        <img src={image.image_data} alt="anh" className={cx('card-image')} />
                                        <p className={cx('image-item-date')}>
                                            Created at: {formatImageDate(image.dateImage)}
                                        </p>
                                        <div className={cx('buttons-action')}>
                                            <Link to={`/edit/${image.imageID}`}>
                                                <button onClick={updateIsEdit}>Edit</button>
                                            </Link>
                                            <button>Delete</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </SizeContext.Provider>
    );
}

const mapStateToProps = (state) => {
    return {
      tokenUser: state.LoginReducer.tokenUser,
      dataCart: state.UserReducer.dataCart,
    };
  };
  
  const mapDispatchToProps = {
    userLogout,
  };
  export default connect(mapStateToProps, mapDispatchToProps)(History);