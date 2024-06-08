"use client";

import React from 'react';
import Image from "next/image";

export default function Current({ className, weather }) {
    return (
        <div className={className}>
            <h3>
                Current (observed
                {' ' + weather.localObsDateTime.split(' ')[1] + ' ' +
                weather.localObsDateTime.split(' ')[2]})
            </h3>
            <div>
                Wind:
                &nbsp;
                <Image
                    src="/img/up-arrow.png"
                    width={25}
                    height={25}
                    alt={`${weather.winddir16Point}`}
                    style={{ transform: `rotate(${weather.winddirDegree}deg)` }}
                />
                &nbsp;
                {weather.windspeedKmph} km/h
            </div>
            <div>
                {weather.temp_C}°C, feels like: {weather.FeelsLikeC}°C
            </div>
            <div>Condition: {weather.weatherDesc[0].value}</div>
            <div>UV index: {weather.uvIndex}</div>
            <div>Cloudcoverage: {weather.cloudcover}%</div>
            <div>Humidity: {weather.humidity}%</div>
        </div>
    );
}
