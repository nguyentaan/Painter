import styles from './Home.module.scss';
import classNames from 'classnames/bind';


const cx = classNames.bind(styles);

function Home() {
    return (
        <section className={cx('drawing-board')}>
            <canvas></canvas>
        </section>
    );
}

export default Home;
