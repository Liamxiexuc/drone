import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import useFetch from 'react-fetch-hook';
import { addInstructions } from './utils/api';
import axios from 'axios';
import './client.css'


function App() {
    const [droneNumber, setDroneNumber] = useState(1);
    const [instructions, setInstructions] = useState('');
    const [result, setResult] = useState('');
    const [error, setError] = useState('');
    const { isLoading, data } = useFetch('http://localhost:4001');
    if (isLoading) {
        return 'Loading...';
    }

    const handleDroneNumberChange = (number) => {
        setDroneNumber(number);
    }

    const handleInputChange = (event) => {
        setInstructions(event.target.value);
    }

    const handleSubmit = () => {
        addInstructions(droneNumber, instructions)
            .then(data => {
                setResult(data);
            })
            .catch(err => setError(err));
    }

    return (
        <div className="drone__container">
            <header className="header__title">Drone Demo</header>
            <nav>
                <button className={`nav__btn ${droneNumber === 1 ? 'nav__btn--active' : ''}`} onClick={() => handleDroneNumberChange(1)}>Single</button>
                <button className={`nav__btn ${droneNumber === 2 ? 'nav__btn--active' : ''}`} onClick={() => handleDroneNumberChange(2)}>Double</button>
            </nav>
            <section className="content">
                <div className="container container--lg">
                    <textarea value={instructions} onChange={handleInputChange} className="input" type="text" placeholder="Enter your instruction here..."></textarea>
                </div>
                <button onClick={handleSubmit} className="btn" type="submit">Submit ></button>
                <div className="container">
                    <div className="output"> {result ? JSON.stringify(result) : JSON.stringify(data)}</div>
                </div>
            </section>
        </div>
    );
}


ReactDOM.render(<App />, document.getElementById('app'));
