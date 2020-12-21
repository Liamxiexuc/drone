import React from 'react';

const Main = ({ instructions, result, isLoading, error, handleInputChange, handleSubmit }) => {
    return (
        <section className="main">
            <div className="container container--lg">
                <textarea
                    value={instructions}
                    onChange={handleInputChange}
                    className="input"
                    type="text"
                    placeholder="Enter your instruction here..."
                ></textarea>
            </div>
            <button onClick={handleSubmit} className="btn" type="submit">Submit ></button>
            <div className="container">
                <div className="output">
                    {error && JSON.stringify(error.response.data)}
                    {isLoading && 'Loading...'}
                    {result}
                </div>
            </div>
        </section>
    )
}

export default Main;