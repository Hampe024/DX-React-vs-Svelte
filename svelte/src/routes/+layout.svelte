<script lang="ts">
	import Nav from './Nav.svelte';
	import './styles.css';
</script>

<div class="app">
	<Nav />

	<div class="wrapper">
		<slot />
	</div>
</div>

<style>
</style>
