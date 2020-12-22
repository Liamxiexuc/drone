import React from 'react';
import styles from './Main.module.css';

const Main = ({ instructions, result, isLoading, error, handleInputChange, handleSubmit }) => {
    return (
        <section className={styles.main}>
            <div className={`${styles.container} ${styles.containerLg}`}>
                <textarea
                    value={instructions}
                    onChange={handleInputChange}
                    className={styles.input}
                    type="text"
                    placeholder="Enter your instruction here..."
                ></textarea>
            </div>
            <button onClick={handleSubmit} className={styles.btn} type="button">Submit ></button>
            <div className={styles.container}>
                <div className={styles.output}>
                    {error && JSON.stringify(error.response.data.message)}
                    {isLoading && 'Loading...'}
                    {result}
                </div>
            </div>
        </section>
    )
}

export default Main;