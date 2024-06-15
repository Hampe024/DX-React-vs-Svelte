<script>
    export let day;

    const dateObj = new Date(day.date);
    const weekday = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
</script>

<div class="weatherForecastDay">
    <div>{weekday}</div>
    <div>{day.mintempC}°C - {day.maxtempC}°C</div>
    <div>{day.hourly[4].weatherDesc[0].value}</div>
    <div>Sunrise - Sunset</div>
    <div>{day.astronomy[0].sunrise} - {day.astronomy[0].sunset}</div>
</div>

<style>
    .weatherForecastDay {
        display: grid;
        grid-template-columns: 1fr 1fr;
        margin-bottom: 1rem;
        font-size: 1.3rem;
        background-color: rgb(253, 253, 253);
        border-radius: 15px;
        box-shadow: 0 0 30px rgb(216, 216, 216);
        transition: box-shadow ease 700ms;
        padding: 0.7rem;
        height: 200px;
    }

    .weatherForecastDay:hover {
        box-shadow: 0 0 30px rgb(144, 144, 144);
    }

    .weatherForecastDay div {
        margin-bottom: 1rem;
    }

    .weatherForecastDay div:nth-child(1) {
        grid-column: 1 / 3;
        text-align: center;
        font-weight: bold;
        font-size: 1.5rem;
    }

    .weatherForecastDay div:nth-child(3) {
        text-align: right;
        height: 3rem;
    }

    .weatherForecastDay div:nth-child(4),
    .weatherForecastDay div:nth-child(5) {
        grid-column: 1 / 3;
        text-align: center;
        margin-bottom: -2rem;
    }
</style>