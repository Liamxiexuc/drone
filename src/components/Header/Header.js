import React, { Fragment } from 'react';


const Header = ({ droneNumber, handleDroneNumberChange }) => {

    return (
        <Fragment>
            <header className="header__title">Drone Challenge</header>
            <nav className="header__nav">
                <button
                    className={`nav__btn ${droneNumber === 1 ? 'nav__btn--active' : ''}`}
                    onClick={() => handleDroneNumberChange(1)}
                >
                    Single
                </button>
                <button
                    className={`nav__btn ${droneNumber === 2 ? 'nav__btn--active' : ''}`}
                    onClick={() => handleDroneNumberChange(2)}
                >
                    Double
                </button>
            </nav>
        </Fragment>
    )
}

export default Header;