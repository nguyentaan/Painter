import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import config from '~/config';
import Dialog from '~/components/items/Dialog';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Header() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const handleNewButtonClick = () => {
        setIsDialogOpen(true);
    };
    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };
    const handleCreateItem = (itemData) => {
        console.log('Creating item:', itemData);
    };
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            handleCloseDialog();
        }
    };
    return (
        <header className={cx('wrapper')}>
            <div className={cx('left-items')}>
                <span className={cx('items')} onClick={handleNewButtonClick}>
                    New
                </span>
                {isDialogOpen && (
                    <div className={cx('overlay')} onClick={handleOverlayClick}>
                        <Dialog onClose={handleCloseDialog} onConfirm={handleCreateItem} />
                    </div>
                )}
            </div>
            <div className={cx('right-items')}>
                <Link to={config.routes.login}>
                    <span className={cx('items')}>Login</span>
                </Link>
                <Link to={config.routes.register}>
                    <span className={cx('items')}>Register</span>
                </Link>
            </div>
        </header>
    );
}

export default Header;
