"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import styles from "./page.module.css";

import Current from "./Current";
import Forecast from "./Forecast";


export default function Weather() {
    const [city, setCity] = useState<string>("");
    const [weather, setWeather] = useState<any | null>(null);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        fetchWeather("");
    }, []);

    const fetchWeather = async (cityname: string) => {
        if (cityname) {
            try {
                const response = await axios.get(`https://wttr.in/${cityname}?format=j1`);
                console.log(response)
                if (response.data.current_condition) {
                    setWeather(response.data);
                    setError('');
                } else {
                    setWeather(null);
                    setError('Unable to fetch weather for this location.');
                }
            } catch (error) {
                setWeather(null);
                setError(`No place found like ${cityname}`);
                console.error("Error fetching weather data", error);
            }
        } else {
            setWeather(null);
            setError(`Enter a city or region for its weather status`);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCity(e.target.value)
        fetchWeather(e.target.value);
    };

    return (
        <div>
            <div className={styles.inputContainer}>
                <input
                    className={styles.cityInput}
                    type="text"
                    value={city}
                    onChange={handleChange}
                    placeholder="Enter city name"
                />
            </div>
            {error && (
                <p className={styles.error}>{error}</p>
            )}
            {weather && (
                <>
                    <p className={styles.currentCity}>
                        Weather in {weather.nearest_area[0].areaName[0].value}, {weather.nearest_area[0].region[0].value} in {weather.nearest_area[0].country[0].value}
                    </p>
                
                    <div className={styles.weather}>
                        <Current
                            className={styles.weatherCurrent}
                            weather={weather.current_condition[0]}
                        />
                        <div className={styles.weatherForecast}>
                            {Object.values(weather.weather).map((day: any) => {
                                return (
                                    <Forecast
                                        className={styles.weatherForecastDay}
                                        day={day}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
