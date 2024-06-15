<script>
    import { onMount } from 'svelte';
    import axios from 'axios';
    import Current from './Current.svelte';
    import Forecast from './Forecast.svelte';

    let city = "";
    let weather = null;
    let error = "";

    onMount(() => {
        fetchWeather();
    });

    $: fetchWeather()
    $: fetchWeather = async () => {
        if (city) {
            try {
                const response = await axios.get(`https://wttr.in/${city}?format=j1`);
                if (response.data.current_condition) {
                    weather = response.data;
                    error = '';
                } else {
                    weather = null;
                    error = 'Unable to fetch weather for this location.';
                }
            } catch (err) {
                weather = null;
                error = `No place found like ${city}`;
                console.error("Error fetching weather data", err);
            }
        } else {
            weather = null;
            error = `Enter a city or region for its weather status`;
        }
    }
</script>

<div>
    <div class="inputContainer">
        <input
            class="cityInput"
            type="text"
            bind:value={city}
            placeholder="Enter city name"
        />
    </div>
    <!-- {#if error}
        <p>{error}</p>
    {/if} -->
    {#if weather}
        <p class="currentCity">
            Weather in {weather.nearest_area[0].areaName[0].value}, {weather.nearest_area[0].region[0].value} in {weather.nearest_area[0].country[0].value}
        </p>
        <div class="weather">
            <Current
                weather={weather.current_condition[0]}
            />
            <div class="weatherForecast">
                {#each Object.values(weather.weather) as day}
                    <Forecast {day} />
                {/each}
            </div>
        </div>
    {/if}
</div>

<style>
    .inputContainer {
        margin: auto;
        width: fit-content;
        text-align: center;
        margin-top: 5rem;
    }

    .cityInput {
        font-size: 2rem;
        padding: 0.5rem;
        border-radius: 15px;
        box-shadow: 10px 10px 30px rgb(233, 233, 233);
    }

    .currentCity {
        text-align: center;
        font-size: 1.3rem;
    }

    .weather {
        width: 800px;
        margin: auto;
    }

    .weatherForecast {
        margin-top: 2rem;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 2rem;
    }
</style>