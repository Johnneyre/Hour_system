<script lang="ts">
	import Aside from '$lib/components/aside.svelte';
	import Footer from '$lib/components/footer.svelte';
	import ModalSignOff from '$lib/components/modal-SignOff.svelte';
	import type { PageData } from './$types.js';

	export let data: PageData;

	let modalOpen = false;
</script>

<section class="flex flex-row w-full">
	<Aside bind:modalOpen />
	<slot />
</section>
<Footer bind:modalOpen user={data} />

{#if modalOpen}
	<ModalSignOff bind:modalOpen />
{/if}

<style>
	:global(:root) {
		background-color: #131314;
	}
</style>
