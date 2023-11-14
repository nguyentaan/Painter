import { useContext} from 'react';
import { SizeContext } from '~/components/Layout/DefautLayout';
import styles from './Dialog.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Dialog({ onClose, onSizeChange }) {
    const { width, height, setWidth, setHeight, setSize } = useContext(SizeContext);

    const handleConfirm = () => {
        setSize(width, height);
        onClose();
    };
    return (
        <div className={cx('dialog')}>
            <h2>Create New Item</h2>
            <div className={cx('wrapper-items')}>
                <label htmlFor="Width">Width:</label>
                <input
                    className={cx('input')}
                    type="number"
                    id="width"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                />
                <label htmlFor="Height">Height:</label>
                <input
                    className={cx('input')}
                    type="number"
                    id="height"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                />
            </div>
            <button className={cx('button')} onClick={handleConfirm}>
                Create
            </button>

            <button className={cx('button')} onClick={onClose}>
                Cancel
            </button>
        </div>
    );
}

export default Dialog;
