import styles from './SubHeader.module.scss';
import classNames from 'classnames/bind';
import Rectangle from '~/assets/icons/Rectangle.svg';
import Triangle from '~/assets/icons/Triangle.svg';
import Circle from '~/assets/icons/Circle.svg';
import Line from '~/assets/icons/Line-Tool.svg';
import Brush from '~/assets/icons/Brush-1.svg';
import Eraser from '~/assets/icons/Eraser-Tool.svg';
import Fill from '~/assets/icons/Paint-Bucket.svg';
import Select from '~/assets/icons/Direction-Select.svg';

const cx = classNames.bind(styles);

function SubHeader() {
    return (
        <section className={cx('container')}>
            <div className={cx('column')}>
                <label className={cx('title')}>Shapes</label>
                <ul className={cx('options', 'grid-tool')}>
                    <li className={cx('option', 'tool')}>
                        <img src={Line} alt="Line" />
                        <span>Line</span>
                    </li>
                    <li className={cx('option', 'tool')}>
                        <img src={Rectangle} alt="Rectangle" />
                        <span>Rectangle</span>
                    </li>
                    <li className={cx('option', 'tool')}>
                        <img src={Triangle} alt="Triangle" />
                        <span>Triangle</span>
                    </li>
                    <li className={cx('option', 'tool')}>
                        <img src={Circle} alt="Circle" />
                        <span>Triangle</span>
                    </li>
                    {/* <li className={cx('option')}>
                            <input type="checkbox" id="fill-color"></input>
                            <label for="fill-color">Fill color</label>
                        </li> */}
                </ul>
            </div>
            {/* ------------------------------------Options------------------------------- */}
            <div className={cx('column')}>
                <label className={cx('title')}>Options</label>
                <ul className={cx('options', 'grid-tool')}>
                    <li className={cx('option', 'tool')}>
                        <img src={Brush} alt="Brush" />
                        <span>Brush</span>
                    </li>
                    <li className={cx('option', 'tool')}>
                        <img src={Eraser} alt="Eraser" />
                        <span>Eraser</span>
                    </li>
                    <li className={cx('option', 'tool')}>
                        <img src={Fill} alt="Fill" />
                        <span>Fill</span>
                    </li>
                    <li className={cx('option', 'tool')}>
                        <img src={Select} alt="Select" />
                        <span>Select</span>
                    </li>
                    <li className={cx('option', 'tool')}>
                        <input type="range" id="size-slider" min={1} max={30} value={5} />
                    </li>
                    {/* <li className={cx('option')}>
                            <input type="checkbox" id="fill-color"></input>
                            <label for="fill-color">Fill color</label>
                        </li> */}
                </ul>
            </div>
            {/* ----------------------------Color--------------------- */}
            <div className={cx('column', 'colors')}>
                <label className={cx('title')}>Colors</label>
                <ul className={cx('options', 'grid-color')}>
                    <li className={cx('option')}></li>
                    <li className={cx('option', 'selected')}></li>
                    <li className={cx('option')}></li>
                    <li className={cx('option')}></li>
                    <li className={cx('option')}></li>
                    <li className={cx('option')}></li>
                    <li className={cx('option')}></li>
                    <li className={cx('option')}></li>
                    <li className={cx('option')}></li>
                    <li className={cx('option')}></li>
                    <li className={cx('option')}></li>
                    <li className={cx('option')}></li>
                    <li className={cx('option')}></li>
                    <li className={cx('option')}>
                        <input type="color" className={cx('color-picker')} value="#FFF4F4" />
                    </li>
                    <li className={cx('option')}>
                        <input type="color" className={cx('color-picker')} value="#FFF4F4" />
                    </li>
                    <li className={cx('option')}>
                        <input type="color" className={cx('color-picker')} value="#FFF4F4" />
                    </li>

                </ul>
            </div>
        </section>
    );
}

export default SubHeader;
