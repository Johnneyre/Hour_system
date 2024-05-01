<script lang="ts">
	import '../app.css';
	import Snakcbar from '$lib/components/Snackbar.svelte';
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@300;500;600;700;800&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<main>
	<slot />
</main>
<Snakcbar />

<style>
	:global(:root) {
		font-family: 'Red Hat Display', sans-serif;
	}
</style>
