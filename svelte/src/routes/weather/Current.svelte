<script>
    import arrow from "$lib/images/up-arrow.png"

    export let weather;

    function formatDate(dateTime) {
        const dateParts = dateTime.split(' ');
        return `${dateParts[1]} ${dateParts[2]}`;
    }
</script>

<style>
    .weatherCurrent {
        font-size: 2rem;
        display: grid;
        grid-template-columns: 1fr 1fr;
        background-color: rgb(253, 253, 253);
        border-radius: 15px;
        box-shadow: 0 0 30px rgb(216, 216, 216);
        transition: box-shadow ease 700ms;
        padding: 1rem;
    }

    .weatherCurrent:hover {
        box-shadow: 0 0 30px rgb(144, 144, 144);
    }

    .weatherCurrent h3 {
        grid-column: 1 / 3;
        text-align: center;
        margin-top: 0;
    }

    .weatherCurrent div {
        margin-bottom: 1rem;
    }

    .weatherCurrent div:nth-child(2n + 1) {
        text-align: right;
    }
</style>

<div class="weatherCurrent">
    <h3>
        Current (observed {formatDate(weather.localObsDateTime)})
    </h3>
    <div>
        Wind:
        <img
            src={arrow}
            width={25}
            height={25}
            alt={weather.winddir16Point}
            style={`transform: rotate(${weather.winddirDegree}deg)`}
        />
        {weather.windspeedKmph} km/h
    </div>
    <div>{weather.temp_C}°C, feels like: {weather.FeelsLikeC}°C</div>
    <div>Condition: {weather.weatherDesc[0].value}</div>
    <div>UV index: {weather.uvIndex}</div>
    <div>Cloudcoverage: {weather.cloudcover}%</div>
    <div>Humidity: {weather.humidity}%</div>
</div>
