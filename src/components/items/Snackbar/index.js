// Snackbar.js
import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Snackbar.module.scss';

const cx = classNames.bind(styles);

const Snackbar = ({ message, type, onClose }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setVisible(false);
            onClose();
        }, 3000); // Adjust the timeout as needed

        return () => clearTimeout(timeout);
    }, [onClose]);

    return (
        <div className={cx('snackbar', `${type}`, `${visible ? 'show' : ''}`)}>
            {message}
            <button onClick={onClose}>&times;</button>
        </div>
    );
};

export default Snackbar;
