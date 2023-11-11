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
    const [isClear, setIsClear] = useState(false);
    const [isUndo, setIsUndo] = useState(false);
    const [isRedo, setIsRedo] = useState(false);

    const [width, setWidth] = useState(1080);
    const [height, setHeight] = useState(540);

    const setSize = (newWidth, newHeight) => {
        setWidth(newWidth);
        setHeight(newHeight);
        console.log(newWidth);
        console.log(newHeight);
    };

    console.log('is clear: ', isClear);
    console.log('is  undo: ', isUndo);
    console.log('is redo: ', isRedo);

    return (
        <SizeContext.Provider value={{ width, height, setWidth, setHeight, setSize }}>
            <div className={cx('wrapper')}>
                <Header setIsUndo={setIsUndo} setIsRedo={setIsRedo} />
                <SubHeader
                    selectedTool={selectedTool}
                    setSelectedTool={setSelectedTool}
                    brushWidth={brushWidth}
                    setBrushWidth={setBrushWidth}
                    setSelectedColor={setSelectedColor}
                    setIsClear={setIsClear}
                />
                <div className={cx('container')}>
                    <Home
                        selectedTool={selectedTool}
                        brushWidth={brushWidth}
                        selectedColor={selectedColor}
                        width={width}
                        height={height}
                        isClear={isClear}
                        setIsClear={setIsClear}
                        isRedo={isRedo}
                        setIsRedo={setIsRedo}
                        isUndo={isUndo}
                        setIsUndo={setIsUndo}
                    />
                </div>
                {/* <div className={cx('container')}>
                    <Footer
                    />
                </div> */}
                
            </div>
        </SizeContext.Provider>
    );
}

export default DefaultLayout;
