import Header from '../../components/Layout/DefautLayout/Header';
import SubHeader from '../../components/Layout/DefautLayout/SubHeader';
import Home from '~/pages/Home';
import styles from './History.module.scss';
import classNames from 'classnames/bind';
import { createContext, useState } from 'react';
import { useUser } from '../../hook/UserContext';
// Import the useUser hook

const cx = classNames.bind(styles);

export const SizeContext = createContext();

function History() {
    const [isClear, setIsClear] = useState(false);
    const [isUndo, setIsUndo] = useState(false);
    const [isRedo, setIsRedo] = useState(false);

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
    console.log('is user: ', userInfo);
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
             <Header setIsUndo={setIsUndo} setIsRedo={setIsRedo} userInfo={userInfo} handleLogout={handleLogout} />
            <div className={cx('wrapper')}>

            </div>
        </SizeContext.Provider>
    );
}

export default History;
