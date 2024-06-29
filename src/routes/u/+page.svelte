<script lang="ts">
	import Banner from '$lib/components/home/banner-home.svelte';
	import CardsHome from '$lib/components/home/cards-home.svelte';
	import MobileBottomTapBar from '$lib/components/mobile-bottom-tap-bar.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	let hoursInContract = 180;
	let totalHours = 15;

	console.log(data.tasks)

	// for (const item of data?.dedications) {
	// 	totalHours += item.project_hours;
	// }
</script>

<svelte:window />

<div class="flex flex-col w-full pb-20 md:pb-6">
	<div class="mx-5 md:mx-10 mt-4">
		<Banner />
	</div>

	<div class="px-5 sm:px-10 flex flex-col">
		<div class="flex flex-col sm:pl-4 items-center justify-center gap-x-14">
			<section class="flex items-center flex-col lg:flex-row justify-between w-full">
				<div class="w-full lg:w-1/3 pt-4 pb-8">
					<h1 class="text-2xl font-bold text-dark-text">
						Hola, {data.user?.fullName}
					</h1>
					<p class="text-lg text-dark-text pt-2">No olvides registrar tu jornada laboral.</p>
					<div class="flex items-center justify-start pt-4">
						<a
							href="/u/horas"
							class="text-white whitespace-nowrap font-semibold bg-red-betel rounded-xl py-3 px-8 md:px-12 text-center"
							>Registrar Horas</a
						>
					</div>
				</div>
			</section>
			{#if data.dedications.length > 0}
				<div class="mr-auto w-full">
					<div
						class="pt-12 flex flex-wrap justify-center md:justify-between pb-5 text-center lg:text-left font-bold text-dark-text"
					>
						<h1 class="text-3xl">Asignaciones del mes</h1>

						<div class="flex flex-col w-[125px] max-w-[125px]">
							<progress max="100" value={(totalHours / hoursInContract) * 100} />
							<span class="text-sm">{totalHours} hrs / {hoursInContract} hrs</span>
						</div>
					</div>

					<div
						class="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-auto gap-5"
					>
						{#each data.dedications as dedication}
							<CardsHome bind:dedication tasks={data.tasks} />
						{/each}
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>
<MobileBottomTapBar />

<style>
	progress {
		width: 100%;
		height: 10px;
		border-radius: 10px;
	}

	progress::-webkit-progress-bar {
		background-color: #f2f8ff;
		border-radius: 10px;
	}

	progress::-webkit-progress-value {
		background-color: #ff461e;
		border-radius: 10px;
	}

	progress::-moz-progress-bar {
		background-color: #ff461e;
		border-radius: 10px;
	}
</style>
