import React, { Fragment } from 'react';
import classNames from 'classnames/bind';
import styles from './Header.module.css';

const cx = classNames.bind(styles);

const Header = ({ droneNumber, handleDroneNumberChange }) => {

    return (
        <Fragment>
            <header className={styles.title}>Drone Challenge</header>
            <nav className={styles.nav}>
                <button
                    className={cx('btn', { active: droneNumber === 1 })}
                    onClick={() => handleDroneNumberChange(1)}
                >
                    Single
                </button>
                <button
                    className={cx('btn', { active: droneNumber === 2 })}
                    onClick={() => handleDroneNumberChange(2)}
                >
                    Double
                </button>
            </nav>
        </Fragment>
    )
};

export default Header;
