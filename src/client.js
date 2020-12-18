import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import useFetch from 'react-fetch-hook';
import './client.css'


function App() {
    const [ instructions, setInstructions ] = useState('');
    const { isLoading, data } = useFetch('http://localhost:4001');
    if(isLoading) {
        return 'Loading...';
    }

    const handleChange = (event) => {
        setInstructions(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventdefault();
        
    }

    return (
        <div className="app">
            <h1 className="title">Drone Demo</h1>
            <section className="content">
                <div className="container">
                    <textarea value={instructions} onChange={handleChange} className="input" type="text" placeholder="Enter your instruction here..."></textarea>
                </div>
                <button onClick={handleSubmit} className="btn" type="submit">Send</button>
                <div className="container">
                    <div>{JSON.stringify(data)}</div>
                </div>
            </section>
        </div>
    );
}


ReactDOM.render(<App />, document.getElementById('app'));
