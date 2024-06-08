"use client";

import React from 'react';

export default function Forecast({ className, day }) {
    const dateObj = new Date(day.date);
    const weekday = dateObj.toLocaleDateString('en-US', { weekday: 'long' });

    return (
        <div key={day.date} className={className}>
            <div>{weekday}</div>
            <div>{day.mintempC}°C - {day.maxtempC}°C</div>
            <div>{day.hourly[4].weatherDesc[0].value}</div>
            <div>Sunrise - Sunset</div> 
            <div>{day.astronomy[0].sunrise} - {day.astronomy[0].sunset}</div>
        </div>
    );
}
