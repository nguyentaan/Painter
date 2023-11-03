import styles from './SubHeader.module.scss';
import classNames from 'classnames/bind';
import Rectangle from '~/assets/icons/Rectangle.svg';
import Triangle from '~/assets/icons/Triangle.svg';
import Circle from '~/assets/icons/Circle.svg';
import Line from '~/assets/icons/Line-Tool.svg';

const cx = classNames.bind(styles);

function SubHeader() {
    return (
        <section className={cx('container')}>
            <div className={cx('tool-board')}>
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
            </div>
        </section>
    );
}

export default SubHeader;
