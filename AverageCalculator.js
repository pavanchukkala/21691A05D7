import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AverageCalculator = () => {
    const [numbersWindow, setNumbersWindow] = useState([]);
    const [windowPrevState, setWindowPrevState] = useState([]);
    const [average, setAverage] = useState(0);

    const WINDOW_SIZE = 10;

    const fetchNumbers = async (numberType) => {
        const urlMapping = {
            'p': 'http://20.244.56.144/test/primes',
            'f': 'http://20.244.56.144/test/fibo',
            'e': 'http://20.244.56.144/test/even',
            'r': 'http://20.244.56.144/test/rand'
        };
        const url = urlMapping[numberType];
        try {
            const response = await axios.get(url, { timeout: 500 });
            return response.data.numbers || [];
        } catch (error) {
            console.error('Error fetching numbers:', error);
            return [];
        }
    };

    const updateNumbersWindow = (newNumbers) => {
        const uniqueNumbers = newNumbers.filter(num => !numbersWindow.includes(num));
        const updatedWindow = [...numbersWindow, ...uniqueNumbers].slice(-WINDOW_SIZE);
        setWindowPrevState([...numbersWindow]);
        setNumbersWindow(updatedWindow);
        if (updatedWindow.length > 0) {
            setAverage(updatedWindow.reduce((acc, num) => acc + num, 0) / updatedWindow.length);
        }
    };

    const handleFetch = async (numberType) => {
        const newNumbers = await fetchNumbers(numberType);
        updateNumbersWindow(newNumbers);
    };

    return (
        <div>
            <h1>Average Calculator</h1>
            <button onClick={() => handleFetch('e')}>Fetch Even Numbers</button>
            <button onClick={() => handleFetch('p')}>Fetch Prime Numbers</button>
            <button onClick={() => handleFetch('f')}>Fetch Fibonacci Numbers</button>
            <button onClick={() => handleFetch('r')}>Fetch Random Numbers</button>
            <div>
                <h3>Previous Window State: {JSON.stringify(windowPrevState)}</h3>
                <h3>Current Window State: {JSON.stringify(numbersWindow)}</h3>
                <h3>Average: {average.toFixed(2)}</h3>
            </div>
        </div>
    );
};

export default AverageCalculator;
