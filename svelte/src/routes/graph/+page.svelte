<script lang="ts">
    import { onMount } from 'svelte';
    import { Line } from 'svelte-chartjs';
	import 'chart.js/auto';
    import RangeSlider from "svelte-range-slider-pips";
    
    let gdpData: object = {};
    let chartData: object
    let dateRange: [number, number] = [1974, 2022];
    const countries: array<{ code: string, name: string, color: string }> = [
        { code: 'SWE', name: 'Sweden', color: "#89cff0" },
        { code: 'NOR', name: 'Norway', color: "#dfe2ec" },
        { code: 'DNK', name: 'Denmark', color: "#e52b50" },
        { code: 'FIN', name: 'Finland', color: "#e9967a" },
        { code: 'ISL', name: 'Iceland', color: "#336699" },
    ];

    onMount(async () => {
		await fetchGDPData()
      	chartData = await formatDataForChart();
    })

    async function fetchGDPData() {
		const fetchDataPromises = countries.map(async (country) => {
			const res = await fetch(`http://api.worldbank.org/v2/country/${country.code}/indicator/NY.GDP.MKTP.CD?format=json&date=1950:2024`);
			const data = await res.json();
			return { code: country.code, data: data[1].reverse() };
		});

        const results = await Promise.all(fetchDataPromises);
        const data = {};
        results.forEach(result => {
            data[result.code] = result.data;
        });
  
        gdpData = data;
    }

    $: formatDataForChart().then(data => chartData = data);
    $: formatDataForChart = async () => {
        const filteredData = {};
        for (const country of countries) {
            filteredData[country.code] = gdpData[country.code]?.filter(entry => {
                const year = parseInt(entry.date);
                return year >= dateRange[0] && year <= dateRange[1];
            }) || [];
        }

        const labels = filteredData[countries[0].code] 
            ? filteredData[countries[0].code].map(entry => entry.date)
            : [];
        const datasets = countries.map(country => {
            return {
				label: `${country.name} GDP`,
				data: filteredData[country.code]
				    ? filteredData[country.code].map(entry => entry.value).filter((_, index) => {
				        const date = filteredData[country.code][index].date;
				        return date;
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
</script>
  
<div class="graphContainer">
    <h2>Historical GDP Data</h2>
    <RangeSlider 
        bind:values={dateRange}
        min={1974} max={2022}
        pips all="pip" first="label" last="label" rest="pip" 
    />
    <Line data={chartData}/>
</div>
  
<style>
    .graphContainer {
		width: 100%;
		margin: auto;
	}
</style>