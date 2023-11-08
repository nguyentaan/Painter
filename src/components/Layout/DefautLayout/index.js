import Header from '~/components/Layout/DefautLayout/Header';
import SubHeader from '~/components/Layout/DefautLayout/SubHeader';
import Home from '~/pages/Home';
import styles from './DefaultLayout.module.scss';
import classNames from 'classnames/bind';
import { createContext, useState } from 'react';

const cx = classNames.bind(styles);

export const SizeContext = createContext();

function DefaultLayout() {
    const [selectedTool, setSelectedTool] = useState('brush');
    const [brushWidth, setBrushWidth] = useState(5);
    const [selectedColor, setSelectedColor] = useState('rgb(0,0,0)');

    const [width, setWidth] = useState(1080);
    const [height, setHeight] = useState(540);

    const setSize = (newWidth, newHeight) => {
        setWidth(newWidth);
        setHeight(newHeight);
        console.log(newWidth);
        console.log(newHeight);
    };

    return (
        <SizeContext.Provider value={{ width, height, setWidth, setHeight, setSize }}>
            <div className={cx('wrapper')}>
                <Header />
                <SubHeader
                    selectedTool={selectedTool}
                    setSelectedTool={setSelectedTool}
                    brushWidth={brushWidth}
                    setBrushWidth={setBrushWidth}
                    selectedColor={selectedColor}
                    setSelectedColor={setSelectedColor}
                />
                <div className={cx('container')}>
                    <Home
                        selectedTool={selectedTool}
                        brushWidth={brushWidth}
                        selectedColor={selectedColor}
                        width={width}
                        height={height}
                    />
                </div>
            </div>
        </SizeContext.Provider>
    );
}

export default DefaultLayout;
