import Header from '~/components/Layout/DefautLayout/Header';
import SubHeader from '~/components/Layout/DefautLayout/SubHeader';
import Home from '~/pages/Home';
import Edit from '~/pages/Edit';
import styles from './DefaultLayout.module.scss';
import classNames from 'classnames/bind';
import { createContext, useState } from 'react';
import { UserProvider,  useUser } from '../../../hook/UserContext'; // Import the useUser hook
import useSharedState from '~/hook/useShareState';
// import axios from 'axios';
import { connect } from "react-redux";
import { userLogout } from "../../../actionCreators/LoginAction";

const cx = classNames.bind(styles);

export const SizeContext = createContext();

function DefaultLayout(props) {
    const [selectedTool, setSelectedTool] = useState('brush');
    const [brushWidth, setBrushWidth] = useState(5);
    const [selectedColor, setSelectedColor] = useState('rgb(0,0,0)');
    const [isClear, setIsClear] = useState(false);
    const [isEdit] = useSharedState();
    // const [isDraging, setIsDragging] = useState(false);

    const [width, setWidth] = useState(1080);
    const [height, setHeight] = useState(540);

    const setSize = (newWidth, newHeight) => {
        setWidth(newWidth);
        setHeight(newHeight);
    };

    const { userInfo, login, logout } = useUser();
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
    const handleLogout = () => {
        props.userLogout();
        logout();
    };

    const handleDownloadImage = () => {
        const canvas = document.getElementById('myCanvas');
        if (canvas) {
            const timestamp = new Date().getTime();
            const randomString = Math.random().toString(36).substring(7);
            // Combine timestamp and random string for a unique name
            const fileName = `drawing_${timestamp}_${randomString}.jpg`;
            // Get the Data URL of the canvas content as a JPEG image
            const imageDataURL = canvas.toDataURL('image/jpeg');
            //Create a temporary link element
            const link = document.createElement('a');
            link.href = imageDataURL;
            link.download = fileName;
            link.click();
        }
    };

    return (
        <SizeContext.Provider value={{ width, height, setWidth, setHeight, setSize }}>
            <div className={cx('wrapper')}>
                <Header userInfo={userInfo} handleLogout={handleLogout} handleDownloadImage={handleDownloadImage} />
                <SubHeader
                    selectedTool={selectedTool}
                    setSelectedTool={setSelectedTool}
                    brushWidth={brushWidth}
                    setBrushWidth={setBrushWidth}
                    setSelectedColor={setSelectedColor}
                    setIsClear={setIsClear}
                    // setIsDragging={setIsDragging}
                />
                <div className={cx('container')}>
                    {isEdit ? (
                        <Edit
                            userInfo={userInfo}
                            selectedTool={selectedTool}
                            brushWidth={brushWidth}
                            selectedColor={selectedColor}
                            width={width}
                            height={height}
                            isClear={isClear}
                            setIsClear={setIsClear}
                        />
                    ) : (
                        <Home
                            userInfo={userInfo}
                            selectedTool={selectedTool}
                            brushWidth={brushWidth}
                            selectedColor={selectedColor}
                            width={width}
                            height={height}
                            isClear={isClear}
                            setIsClear={setIsClear}
                        />
                    )}
                </div>
            </div>
        </SizeContext.Provider>
    );
}

const mapStateToProps = (state) => {
    return {
      tokenUser: state.LoginReducer.tokenUser,
    };
  };
  
  const mapDispatchToProps = {
    userLogout,
  };
  export default connect(mapStateToProps, mapDispatchToProps)(DefaultLayout);
  