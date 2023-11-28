import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import styles from './HeaderHistory.module.scss';
import classNames from 'classnames/bind';
import config from '~/config';
import user from '~/assets/icons/Male-Circle.svg';
import exit from '~/assets/icons/Exit-1.svg';
import { setEditMode } from '~/actionCreators/UserAction';
import { connect } from 'react-redux';

const cx = classNames.bind(styles);
function HeaderHistory({ handleLogout }, props) {
    const handleQuit = () => {
        // Clear localStorage when logging out
        localStorage.removeItem('email');
        localStorage.removeItem('token-user');
    };

    useEffect(() => {
        if (localStorage.getItem('email') === null) {
            alert('Directing you back to home');
            window.location.href = '/'; // Redirect to the home page
            setEditMode(false);
        }
    }, []);

    const isEditMode = async (value) => {
        localStorage.setItem('isEditValue', value);
    };


    return (
        <header className={cx('wrapper')}>
            {' '}
            {localStorage.getItem('email') ? (
                <div className={cx('left-items')}>
                    <Link to={`${config.routes.home}`}>
                        <button className={cx('items')} onClick={() => isEditMode(false)}>
                            Back{' '}
                        </button>{' '}
                    </Link>
                </div>
            ) : (
                <div className={cx('left-items')}>
                    <Link to={`${config.routes.home}`}>
                        <span className={cx('items')}>Back </span>{' '}
                    </Link>
                </div>
            )}
            {localStorage.getItem('email') ? (
                <div className={cx('right-items')}>
                    <Link to={`${config.routes.history}`}>
                        <img src={user} alt="user" className={cx('items-login')} />
                    </Link>
                    <img src={exit} alt="exit" className={cx('items-login')} onClick={handleQuit} />
                </div>
            ) : (
                <div className={cx('right-items')}>
                    <Link to={config.routes.login}>
                        <span className={cx('items')}> Login </span>
                    </Link>
                    <Link to={config.routes.register}>
                        <span className={cx('items')}> Register </span>
                    </Link>
                </div>
            )}
        </header>
    );
}

const mapStateToProps = (state) => {
    return {
        editMode: state.UserReducer.editMode,
    };
};

const mapDispatchToProps = {
    setEditMode,
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderHistory);

// export default HeaderHistory;
