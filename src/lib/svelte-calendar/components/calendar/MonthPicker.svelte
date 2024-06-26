<script>
	//@ts-nocheck
	import { getContext } from 'svelte';
	import { storeContextKey } from '$lib/svelte-calendar/context';
	import dayjs from 'dayjs';
	import KeyControls from '$lib/svelte-calendar/components/generic/KeyControls.svelte';
	import Grid from '$lib/svelte-calendar/components/generic/Grid.svelte';
	import InfiniteGrid from '$lib/svelte-calendar/components/generic/InfiniteGrid.svelte';
	import scrollable from '$lib/svelte-calendar/directives/scrollable';
	import { scrollStep } from '$lib/svelte-calendar/config/scroll';

	const store = getContext(storeContextKey);

	let grid;

	const get = (index) => ({
		months: [
			'Enero',
			'Febrero',
			'Marzo',
			'Abril',
			'Mayo',
			'Junio',
			'Julio',
			'Agosto',
			'Septiembre',
			'Octubre',
			'Noviembre',
			'Diciembre'
		].map((d, i) => {
			const month = dayjs(new Date($store.start.getFullYear() + index, i, 1));
			return {
				year: $store.start.getFullYear() + index,
				label: d.slice(0, 3),
				index: i,
				disabled: !store.isSelectable(month, ['date'])
			};
		})
	});

	const close = () => store.setActiveView('days');

	const select = (month) => () => {
		if (month.disabled) return;
		store.setMonth(month.index);
		close();
	};

	const add = (amount) => () => {
		store.add(amount, 'month', ['date']);
	};

	const updateIndex = ({ detail: { step: newIndex } }) => {
		store.add(newIndex - yearIndex, 'year', ['month', 'date']);
	};

	const KEY_MAPPINGS = {
		left: add(-1),
		right: add(1),
		up: add(-3),
		down: add(3),
		enter: close,
		escape: close
	};

	$: yearIndex = $store.year - $store.start.getFullYear();
	$: initialY = yearIndex * scrollStep;
	$: itemCount = $store.end.getFullYear() - $store.start.getFullYear() + 1;
</script>

<KeyControls {...KEY_MAPPINGS} ctx={['months']} />
<div use:scrollable={{ y: initialY, step: scrollStep, maxSteps: itemCount }} on:y={updateIndex}>
	<InfiniteGrid cellCount={1} {itemCount} bind:index={yearIndex} {get} let:months bind:this={grid}>
		<Grid template="repeat(4, 1fr) / repeat(3, 1fr)">
			{#each months as month, i}
				<a
					class:disabled={month.disabled}
					class:selected={$store.month === i && $store.year === month.year}
					href="#selectMonth"
					on:click|preventDefault={select(month)}
				>
					{month.label}
				</a>
			{/each}
		</Grid>
	</InfiniteGrid>
</div>

<style>
	div {
		display: grid;
		height: 100%;
	}
</style>
