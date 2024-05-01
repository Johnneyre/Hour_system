<script>
	// @ts-nocheck
	import { getContext, onMount } from 'svelte';
	import { storeContextKey } from '$lib/svelte-calendar/context';
	import KeyControls from '$lib/svelte-calendar/components/generic/KeyControls.svelte';
	import Grid from '$lib/svelte-calendar/components/generic/Grid.svelte';
	import InfiniteGrid from '$lib/svelte-calendar/components/generic/InfiniteGrid.svelte';
	import dayjs from 'dayjs';
	import Crossfade from '../generic/crossfade/Crossfade.svelte';
	import scrollable from '$lib/svelte-calendar/directives/scrollable';
	import { scrollStep } from '$lib/svelte-calendar/config/scroll';

	const store = getContext(storeContextKey);
	export let marks;

	export let festivos;
	export let daysBlockedAvailable;

	function isValidMarksArray(marks) {
		return Array.isArray(marks) && !marks.hasOwnProperty('detail');
	}

	const duration = 450;

	const legend = Array(7)
		.fill(0)
		.map((d, i) =>
			dayjs()
				.day(($store.startOfWeekIndex + i) % 7)
				.format('ddd')
		);

	const add = (amount) => () => store.add(amount, 'day');

	const select = (day) => () => {
		if (!store.isSelectable(day)) return;
		store.setDay(day || $store.selected);
		if (!$store.shouldEnlargeDay) return store.selectDay();
		store.enlargeDay();
		setTimeout(() => {
			store.selectDay();
			store.enlargeDay(false);
		}, duration + 60);
	};

	const KEY_MAPPINGS = {
		left: add(-1),
		right: add(1),
		up: add(-7),
		down: add(7),
		enter: select(),
		escape: () => store.close()
	};

	const calPagesBetweenDates = (a, b) => {
		const yearDelta = b.getFullYear() - a.getFullYear();
		const firstPartialYear = yearDelta ? 12 - a.getMonth() : b.getMonth() - a.getMonth() + 1;
		const fullYears = yearDelta > 1 ? (yearDelta - 1) * 12 : 0;
		const lastPartialYear = yearDelta ? b.getMonth() + 1 : 0;
		return firstPartialYear + fullYears + lastPartialYear;
	};

	const get = (index) => {
		const d = dayjs($store.start).add(index, 'month');
		return { days: store.getCalendarPage(d.month(), d.year()) };
	};

	const updateIndex = ({ detail: { step: newIndex } }) => {
		store.add(newIndex - monthIndex, 'month', ['date']);
	};

	function isDateBlocked(date) {
		const today = dayjs();
		const fourteenDaysAgo = today.subtract(14, 'day');

		if (daysBlockedAvailable) {
			return false;
		}

		return dayjs(date).isSame(fourteenDaysAgo, 'day') || dayjs(date).isBefore(fourteenDaysAgo);
	}

	$: totalMonths = calPagesBetweenDates($store.start, $store.end);
	$: monthIndex = calPagesBetweenDates($store.start, $store.selected) - 1;
	// $: initialY = monthIndex * scrollStep;
</script>

<KeyControls {...KEY_MAPPINGS} ctx={['days']} />

<div class="containerCalendar">
	<div class="legend border-b-2 border-b-gray-texts">
		{#each legend as label}
			<span class="font-semibold text-base">{label}</span>
		{/each}
	</div>
	<Crossfade {duration} let:key let:receive let:send>
		<div class="stage" on:y={updateIndex}>
			<!-- 			use:scrollable={{ y: initialY, step: scrollStep }}-->
			<InfiniteGrid
				cellCount={1}
				itemCount={totalMonths}
				bind:index={monthIndex}
				{get}
				let:days
				let:index
			>
				<Grid template="repeat(6, 1fr) / repeat(7, 1fr)">
					{#each days as day, i (day)}
						{#if !$store.enlargeDay || index !== monthIndex || !dayjs(day.date).isSame($store.selected)}
							<a
								class={festivos.some((fecha) => dayjs(day.date).isSame(fecha))
									? 'relative festiv__class'
									: 'relative'}
								class:inactive={!store.isSelectable(day.date) || isDateBlocked(day.date)}
								href="#pickday"
								on:keydown|preventDefault
								on:click|preventDefault={select(day.date)}
								class:disabled={!store.isSelectable(day.date) || isDateBlocked(day.date)}
								class:selected={index === monthIndex &&
									dayjs(day.date).isSame($store.selected, 'day')}
								class:outsider={day.outsider}
								class:festivity={festivos.some((fecha) => dayjs(day.date).isSame(fecha))}
								out:send|local={{ key }}
								in:receive|local={{ key }}
							>
								{day.date.getDate()}
								{#if isValidMarksArray(marks)}
									{#if marks.some((r) => dayjs(day.date).isSame(r.date, 'days'))}
										<p class="absolute block w-full bottom-2">
											<sub class="w-2 h-2 rounded-full bg-red-betel mx-auto block" />
										</p>
									{/if}
								{/if}
							</a>
						{/if}
					{/each}
				</Grid>
			</InfiniteGrid>
		</div>
		{#if $store.enlargeDay}
			<div class="stage selected-big" in:receive|local={{ key }} out:send|local={{ key }}>
				{dayjs($store.selected).date()}
			</div>
		{/if}
	</Crossfade>
</div>

<style>
	.inactive {
		text-decoration: line-through;
	}
	.containerCalendar {
		display: grid;
		grid-template-rows: auto 1fr;
	}
	.legend {
		display: grid;
		grid-template: 1fr / repeat(7, 1fr);
		height: var(--sc-theme-calendar-legend-height);
		z-index: 2;
		background: var(--sc-theme-calendar-colors-background-primary);
		border-bottom: 2px solid theme('colors.gray-lines');
		align-items: center;
	}
	a {
		font-size: 1em;
	}
	.stage {
		display: grid;
		grid-row: 2;
		grid-column: 1;
	}
	.selected-big {
		color: var(--sc-theme-calendar-colors-background-highlight);
		background: var(--sc-theme-calendar-colors-background-hover);
		text-align: center;
		align-items: center;
		font-size: var(--sc-theme-calendar-font-large);
		z-index: 2;
		opacity: 1;
		line-height: 0;
	}

  .festiv__class {
    background-color: #009fff !important;
  }

	@media (max-width: 720px) {
		.selected-big {
			font-size: calc(var(--sc-theme-calendar-font-large) * 0.7);
		}
	}
</style>
