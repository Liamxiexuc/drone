import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header';
import Main from './components/Main';
import { sendInstructions } from './utils/api';
import './client.css'


function App() {
    const [droneNumber, setDroneNumber] = useState(1);
    const [instructions, setInstructions] = useState('');
    const [result, setResult] = useState('');
    const [isLoading, setIsloading] = useState(false);
    const [error, setError] = useState(null);

    const handleDroneNumberChange = (number) => {
        setDroneNumber(number);
        setInstructions('');
        setResult('');
        setError(null);
    }

    const handleInputChange = (event) => {
        setInstructions(event.target.value);
    }

    const handleSubmit = () => {
        setIsloading(true)
        sendInstructions(droneNumber, instructions)
            .then(data => {
                setResult(data);
                setIsloading(false)
            })
            .catch(err => setError(err));
    }

    return (
        <div className="drone__container">
            <Header
                droneNumber={droneNumber}
                handleDroneNumberChange={handleDroneNumberChange}
            />
            <Main
                instructions={instructions}
                result={result}
                isLoading={isLoading}
                error={error}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
            />
        </div>
    );
}


ReactDOM.render(<App />, document.getElementById('app'));
