import React, { useState, useEffect } from 'react';
import './WeatherApp.css'; // Assuming you have a CSS file for styling

const WeatherApp = () => {
    const [weather, setWeather] = useState(null);
    const [currentDate, setCurrentDate] = useState('');
    const [dateTime, setDateTime] = useState('');
    const [greeting, setGreeting] = useState('Good day!');
    const [dayNumber, setDayNumber] = useState(6);

    const api = {
        // key: process.env.REACT_APP_WEATHER_API_KEY, // Use your env variable
        key: import.meta.env.VITE_API_KEY, // Use your env variable
        base: import.meta.env.VITE_API_URL
    };

    useEffect(() => {
        fetchWeather();
        updateDateTime();
        updateGreeting();
        const intervalId = setInterval(() => {
            updateDateTime();
            updateGreeting();
            showDateTime();
        }, 1000);

        // Clean up the interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    const fetchWeather = async () => {
        try {
            const response = await fetch(`${api.base}weather?q=Delhi,IN&units=metric&APPID=${api.key}`);
            const result = await response.json();
            updateWeatherUI(result);
        } catch (error) {
            console.error('Error fetching weather:', error);
            setWeather({ main: { temp: 'N/A' }, weather: [{ main: 'N/A' }] });
        }
    };

    const updateWeatherUI = (weatherData) => {
        setWeather(weatherData);
    };

    const dateBuilder = (d) => {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const days = ["Sunday", "Monday", 'Tuesday', "Wednesday", "Thursday", "Friday", "Saturday"];
        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();
        return `${day} ${date} ${month} ${year}`;
    };

    const showDateTime = () => {
        const date = new Date();
        const timeString = date.toLocaleTimeString();
        setDateTime(timeString);
    };

    const setDay = () => {
        const day = window.prompt("What is the day?");
        setDayNumber(day);
    };

    const updateGreeting = () => {
        const hour = new Date().getHours();
        let newGreeting;
        if (hour < 12) newGreeting = "Good morning!";
        else if (hour < 18) newGreeting = "Good afternoon!";
        else newGreeting = "Good evening!";
        setGreeting(newGreeting);
    };

    const updateDateTime = () => {
        const now = new Date();
        setCurrentDate(dateBuilder(now));
    };

    return (
        <div className="app">
            <h1>
                <span id="greeting">{greeting}</span>
                <span onClick={setDay}>🌻</span>
            </h1>
            <h2 className="date">Web Development Training</h2>
            <h2 className="day">DAY <span id="noOfDay">{dayNumber}</span></h2>
            <div className="location-box">
                <div className="date" id="currentDate">{currentDate}</div>
                <div id="dateTime">{dateTime}</div>
            </div>
            <div className="weather-box">
                <div className="location">Gurugram, IN</div>
                <div className="temp" id="temperature">{weather ? `${Math.round(weather.main.temp)}°C` : 'Loading...'}</div>
                <div className="weather" id="weatherCondition">{weather ? weather.weather[0].main : 'Loading...'}</div>
            </div>
        </div>
    );
};

export default WeatherApp;
