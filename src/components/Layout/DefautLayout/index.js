import Header from '~/components/Layout/DefautLayout/Header';
import SubHeader from '~/components/Layout/DefautLayout/SubHeader';
import Home from '~/pages/Home';
import styles from './DefaultLayout.module.scss';
import classNames from 'classnames/bind';
import { createContext, useState } from 'react';
import { useUser } from '../../../hook/UserContext'; // Import the useUser hook
// import axios from 'axios';

const cx = classNames.bind(styles);

export const SizeContext = createContext();

function DefaultLayout() {
    const [selectedTool, setSelectedTool] = useState('brush');
    const [brushWidth, setBrushWidth] = useState(5);
    const [selectedColor, setSelectedColor] = useState('rgb(0,0,0)');
    const [isClear, setIsClear] = useState(false);
    // const [isDraging, setIsDragging] = useState(false);

    const [width, setWidth] = useState(1080);
    const [height, setHeight] = useState(540);

    const setSize = (newWidth, newHeight) => {
        setWidth(newWidth);
        setHeight(newHeight);
    };

    const { userInfo, logout } = useUser(); // Use the useUser hook to get user, logout, and userInfo

    const handleLogout = () => {
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

    // const saveCanvasImage = async (userInfo, ImageData) => {
    //     try {
    //         const response = await axios.post('', {
    //             userId: userInfo.id,
    //             ImageData,
    //         });

    //         console.log(response.data);
    //     } catch (error) {
    //         console.error('Error saving canvas image:', error);
    //     }
    // };

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
                </div>
            </div>
        </SizeContext.Provider>
    );
}

export default DefaultLayout;
