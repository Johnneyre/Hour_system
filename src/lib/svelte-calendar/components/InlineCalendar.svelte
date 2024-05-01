<script>
	import dayjs from 'dayjs';
	import { light as lightTheme } from '$lib/svelte-calendar/config/theme';
	import { dark as darkTheme } from '$lib/svelte-calendar/config/theme';
	import datepickerStore from '$lib/svelte-calendar/stores/datepicker';
	import { keyControlsContextKey, storeContextKey } from '$lib/svelte-calendar/context';
	import { setContext } from 'svelte';
	import { derived, writable } from 'svelte/store';
	import Theme from '$lib/svelte-calendar/components/generic/Theme.svelte';
	import Calendar from '$lib/svelte-calendar/components/calendar/Calendar.svelte';
	import CrossfadeBoundary from './generic/crossfade/CrossfadeBoundary.svelte';
	import { calendar as calendarDefaults } from '$lib/svelte-calendar/config/defaults';

	export let selected = calendarDefaults.selected;
	export let start = calendarDefaults.start;
	export let end = calendarDefaults.end;
	export let format = calendarDefaults.format;
	export let formatted = '';
	export let theme = {};
	export let defaultTheme = darkTheme;
	export let startOfWeekIndex = 0;
	export let store = datepickerStore.get({ selected, start, end, startOfWeekIndex });
	// @ts-ignore
	export let marks;
	// @ts-ignore
	export let festivos;
	// @ts-ignore
	export let daysBlockedAvailable;

	const focused = writable(false);

	setContext(storeContextKey, store);
	setContext(
		keyControlsContextKey,
		derived([store, focused], ([$s, $focused]) => ($focused ? $s.activeView : undefined))
	);

	// @ts-ignore
	const getFocusSetter = (bool) => () => focused.set(bool);

	// @ts-ignore
	$: selected = $store.selected;
	// @ts-ignore
	$: formatted = dayjs(selected).format(format);
</script>

<CrossfadeBoundary>
	<Theme {defaultTheme} {theme} let:style>
		<div
			{style}
			on:focus={getFocusSetter(true)}
			on:blur={getFocusSetter(false)}
			on:mouseover={getFocusSetter(true)}
			on:mouseout={getFocusSetter(false)}
		>
			<Calendar bind:marks bind:festivos bind:daysBlockedAvailable />
		</div>
	</Theme>
</CrossfadeBoundary>

<style>
	div {
		display: inline-block;
	}
</style>
