<script lang="ts">
	import IconDown from '$lib/assets/icon-down.svg';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { toast } from '../../store/toast';
	import dayjs from 'dayjs';

	export let show: string;
	export let report: any;
	export let user: any;
	export let reports: any[];
	export let isDateBlocked: any;
	export let dayBlocked: boolean;
	export let date: dayjs.Dayjs;

	let showModal = false;
	let currentReport = { ...report };
	let disabled = false;
	let openSelect = false;

	let currentDay = dayjs(date).format('DD/MM/YYYY');
	let totalHoursDay = 0;

	totalHoursDay = 0;
	reports.forEach((reportss) => {
		const formattedDate = dayjs(reportss.date).format('DD/MM/YYYY');
		if (formattedDate === currentDay) {
			totalHoursDay += reportss.hours;
		}
	});

	const addTask = [
		{
			hours: currentReport.hours,
			...currentReport.task
		}
	];

	totalHoursDay -= addTask[0].hours;

	let taskOrigin = currentReport.task.name;
	let totalhours = currentReport.hours;

	let container: any;
	function onWindowClick(e: any) {
		if (openSelect) if (container.contains(e.target) == false) openSelect = false;
	}

	const changeTotalValue = (taskHour: number) => {
		totalhours = taskHour ?? 0;
	};

	const handleSubmit: SubmitFunction = async ({ formData, cancel }) => {
		const sumHours = totalHoursDay + totalhours;

		if (sumHours >= 24) {
			toast.error('Superaste el limite de horas que puedes agregar');
			return cancel();
		}

		if (totalhours < 1) {
			toast.error('Debes agregar minimo 1 hora en la asignación');
			return cancel();
		}

		if (!currentReport.description) {
			toast.error('No puedes continuar sin llenar el campo requerido');
			return cancel();
		}

		let currentMonth = dayjs(date).format('YYYY-MM');
		let totalhoursPerUser = user.allowed_hours;
		let hoursPerMonth = reports
			.filter((report) => dayjs(report.date).format('YYYY-MM') === currentMonth)
			.reduce((totalHours, report) => totalHours + report.hours, 0);

		const url = new URL(window.location.href);

		const dateFromUrl = url.searchParams.get('date');

		let oldTasksHours = reports
			.filter(
				(report) =>
					dayjs(report.date).format('YYYY-MM-DD') === dayjs(dateFromUrl).format('YYYY-MM-DD')
			)
			.reduce((totalHours, report) => totalHours + report.hours, 0);

		if (totalhoursPerUser && hoursPerMonth - oldTasksHours + totalhours > totalhoursPerUser) {
			showModal = true;

			return cancel();
		}

		formData.append('id', currentReport.id_hours);
		formData.append('date', currentReport.date.toString());
		formData.append('dayBloked', JSON.stringify(isDateBlocked(dayjs(date).format('YYYY-MM-DD'))));
		formData.append('tasks', JSON.stringify(currentReport.task));
		formData.append('hours', totalhours);
		formData.append('description', currentReport.description);

		disabled = true;

		return async ({ result: { data, type } }: any) => {
			disabled = false;
			if (type == 'failure') {
				toast.error(
					'Ha ocurrido un error al intentar registrar las horas. Por favor intente nuevamente.'
				);
			} else {
				toast.success('Tu registro de horas ha sido guardado con éxito.');
				show = '';
				invalidateAll();
			}
		};
	};
</script>

<svelte:window on:click={onWindowClick} />

<section
	id={currentReport.id_hours.toString()}
	class="w-screen overflow-y-scroll h-screen pt-4 pb-20 md:pt-4 md:pb-4 top-0 left-0 overflow-hidden fixed z-40"
>
	<div
		class="shadow-xl mx-auto md:ml-[20%] border rounded-lg border-red-betel bg-secundary-background px-8 py-8 max-w-sm md:max-w-md <md:(w-4/5) block"
	>
		<div class="flex flex-col items-center justify-center">
			<h1 class="text-3xl font-semibold text-center text-dark-text pb-2">Registro de horas</h1>
			<p class="text-lg text-secundary-text text-center">
				Ingrese los datos solicitados para registrar su jornada laboral.
			</p>
		</div>

		<form use:enhance={handleSubmit} method="post" action="?/update" class="pt-5">
			<label for="horas" class="text-md text-secundary-text px-2">Selecciona las tareas</label>
			<div class="relative pb-3" bind:this={container}>
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div
					class="w-full rounded-md border mt-1 border-gray-lines h-12 text-lg shadow-sm pl-4 pr-12 bg-no-repeat bg-right bg-contain appearance-none relative"
					on:click={() => (openSelect = !openSelect)}
					on:keydown={() => (openSelect = !openSelect)}
				>
					<p class="mt-2 block overflow-hidden text-ellipsis whitespace-nowrap text-gray-400">
						{taskOrigin}
					</p>
					<span class="absolute right-0 top-0 mr-3 my-5 flex items-center justify-center">
						<img
							src={IconDown}
							alt="Icono de flecha hacia abajo"
							class="h-4 w-4 flex justify-center items-center"
						/>
					</span>
				</div>
			</div>

			<div class="flex flex-wrap gap-2 pt-4 w-full text-secundary-text">
				{#each addTask as task}
					<span class="flex items-center p-3.5 rounded-lg gap-4 w-full">
						<p>{task.name}</p>
						<p class="block ml-auto">Hrs</p>
						<input
							bind:value={task.hours}
							type="number"
							min="1"
							max="23"
							required
							on:input={() => changeTotalValue(task.hours)}
							disabled={dayBlocked}
							class="rounded-md border mt-1 border-gray-lines h-14 text-lg shadow-sm pl-4 text-black placeholder-gray-400 w-32 min-w-[8rem]"
						/>
					</span>
				{/each}
				<span class="flex items-center p-3.5 rounded-lg gap-4 pr-10 justify-end w-full">
					<p>Total</p>
					<p class="border-b border-gray-lines w-32">{totalhours}</p>
				</span>
			</div>

			<hr class="bg-gray-lines mt-3" />

			<div class="flex flex-col pt-5">
				<label for="horas" class="text-md text-secundary-text px-2 pb-1"
					>Ingrese breve descripción de las tareas ejecutadas<span class="text-red-600">*</span
					></label
				>
				<textarea
					name="notes"
					bind:value={currentReport.description}
					class="w-auto h-12 border-gray-300 border rounded-lg py-2 px-4 text-lg bg-secundary-background text-white"
					placeholder="Inserte"
					disabled={dayBlocked}
					maxlength="100"
					minlength="10"
					required
				/>
			</div>

			<div class="flex flex-row items-center justify-center w-full pt-12 pb-1">
				<button
					{disabled}
					on:click|preventDefault={() => (show = '')}
					class="w-1/2 text-red-betel text-lg font-semibold hover:text-white transition duration-1000"
				>
					Cancelar
				</button>

				{#if !dayBlocked}
					<button
						{disabled}
						class="w-1/2 bg-red-betel text-white font-semibold py-4 rounded-xl hover:bg-[#8f4733] transition duration-1000"
					>
						Continuar
					</button>
				{:else}
					<button
						disabled={dayBlocked}
						class="w-1/2 bg-red-betel text-white font-semibold py-4 rounded-xl hover:bg-[#8f4733] transition duration-1000"
					>
						Continuar
					</button>
				{/if}
			</div>
		</form>
	</div>
</section>
