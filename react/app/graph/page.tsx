"use client";

import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import ReactSlider from 'react-slider';

import styles from "./page.module.css";

export default function GDPChart() {
    const [gdpData, setGdpData] = useState<any>({});
    const [dateRange, setDateRange] = useState<[number, number]>([1974, 2022]);
    const countries = [
        { code: 'SWE', name: 'Sweden', color: "#89cff0" },
        { code: 'NOR', name: 'Norway', color: "#dfe2ec" },
        { code: 'DNK', name: 'Denmark', color: "#e52b50" },
        { code: 'FIN', name: 'Finland', color: "#e9967a" },
        { code: 'ISL', name: 'Iceland', color: "#336699" },
    ];

    useEffect(() => {
        fetchGDPData();
    }, []);

    const fetchGDPData = async () => {
        const fetchDataPromises = countries.map(async (country) => {
        const res = await fetch(`http://api.worldbank.org/v2/country/${country.code}/indicator/NY.GDP.MKTP.CD?format=json&date=1950:2024`);
        const data = await res.json();
            return { code: country.code, data: data[1].reverse() };
        });

        const results = await Promise.all(fetchDataPromises);
        const data: Record<string, any> = {};
        results.forEach(result => {
            data[result.code] = result.data;
        });

        setGdpData(data);
    };

    const formatDataForChart = () => {
        const labels = gdpData[countries[0].code] 
            ? gdpData[countries[0].code]
                .map((entry: any) => entry.date)
                .filter((date: any) => date >= dateRange[0] && date <= dateRange[1])
            : [];
        const datasets = countries.map(country => {
            return {
                label: `${country.name} GDP`,
                data: gdpData[country.code]
                    ? gdpData[country.code]
                        .map((entry: any) => entry.value)
                        .filter((_: number, index: number) => {
                            const date = gdpData[country.code][index].date;
                            return date >= dateRange[0] && date <= dateRange[1];
                    })
                    : [],
                fill: false,
                backgroundColor: country.color,
                borderColor: country.color,
            };
        });

        return {
            labels,
            datasets,
        };
    };

    const handleSliderChange = (values: [number, number]) => {
        setDateRange(values);
    };

    return (
        <div className={styles.graphContainer}>
        <h2>Historical GDP Data</h2>
        <ReactSlider
            className={styles.dateSlider}
            thumbClassName={styles.thumb}
            trackClassName={styles.track}
            min={1974}
            max={2022}
            value={dateRange}
            onChange={handleSliderChange}
            pearling
            minDistance={1}
        />
        <div className={styles.sliderValues}>
            <span>{dateRange[0]}</span> - <span>{dateRange[1]}</span>
        </div>
        {Object.keys(gdpData).length > 0 && (
            <Line data={formatDataForChart()} />
        )}
        </div>
    );
}
