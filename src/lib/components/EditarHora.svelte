<script lang="ts">
	import IconDown from '$lib/assets/icon-down.svg';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { toast } from '../../store/toast';
	import { slide } from 'svelte/transition';
	import dayjs from 'dayjs';
	import { writable } from 'svelte/store';

	export let show: string;
	export let report: any;
	export let tasks: any[];
	export let user: any;
	export let reports: any[];
	export let isDateBlocked: any;
	export let dayBlocked: boolean;

	let showModal = false;
	let date: dayjs.Dayjs;

	let currentReport = { ...report };

	let disabled = false;

	let openSelect = false;

	let addedTasks: any[] = Array.isArray(currentReport.report_tasks)
		? currentReport.report_tasks
		: [];

	let totalhours = currentReport.hours;
	let lastTask = writable(addedTasks[addedTasks.length - 1]?.name || []);

	$: if (totalhours) {
		let addSum = addedTasks.reduce((prev, curr) => prev + (curr.hours || 0), 0);
		totalhours = addSum === 0 ? currentReport.hours : addSum;
	}

	let container: any;
	function onWindowClick(e: any) {
		if (openSelect) if (container.contains(e.target) == false) openSelect = false;
	}

	const deleteTask = (task: any) => {
		let index = addedTasks.indexOf(task);
		let arr = addedTasks;
		arr.splice(index, 1);
		addedTasks = [...arr];
	};

	const handleTaskCheck = (e: any, tarea: any, i: number) => {
		if (!e.target.checked) {
			addedTasks = addedTasks.filter((x) => !(x.id == tarea.id));
			lastTask.set(addedTasks[addedTasks.length - 1]?.name || '');
		} else {
			addedTasks = [...addedTasks, tarea];
			lastTask.set(tarea.name);
		}
	};

	const handleSubmit: SubmitFunction = async ({ data, cancel }) => {
		if (!currentReport.project) {
			toast.error('Seleccione un proyecto de la lista');
			return cancel();
		}
		if (!addedTasks || !addedTasks.length) {
			toast.error('Seleccione al menos una tarea');
			return cancel();
		}

		if (totalhours >= 24 || totalhours < 1) {
			toast.error('Superaste el limite de horas que puedes agregar');
			return cancel();
		}

		if (!currentReport.notes) {
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

		data.append('id', currentReport.id.toString());
		data.append('date', currentReport.date.toString());
		data.append('project_id', currentReport.project.id.toString());
		data.append('reports', JSON.stringify(reports));
		data.append('totalhoursPerUser', JSON.stringify(totalhoursPerUser));
		data.append('currentMonth', JSON.stringify(currentMonth));
		data.append('hoursPerMonth', JSON.stringify(hoursPerMonth));
		data.append('totalhours', JSON.stringify(totalhours));
		data.append('oldTasksHours', JSON.stringify(oldTasksHours));
		data.append('dayBloked', JSON.stringify(isDateBlocked(dayjs(date).format('YYYY-MM-DD'))));

		for (const task of addedTasks) {
			data.append('tasks', JSON.stringify(task));
		}

		data.append('hours', totalhours.toString());

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

<!--MODAL PARA REGISTRAR HORAS Y PROYECTO-->

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
						{$lastTask || 'Seleccione...'}
					</p>
					<span class="absolute right-0 top-0 mr-3 my-5 flex items-center justify-center">
						<img
							src={IconDown}
							alt="Icono de flecha hacia abajo"
							class="h-4 w-4 flex justify-center items-center"
						/>
					</span>
				</div>
				{#if openSelect && !dayBlocked}
					<div
						class="text-secundary-text border mt-1 border-gray-lines bg-secundary-background w-full left-0 p-2 rounded-md overflow-y-auto h-32"
					>
						{#each tasks as task, i}
							<div class="flex items-center gap-4 mb-3" transition:slide>
								<input
									type="checkbox"
									class="w-6 h-6 rounded-md min-w-[1.5rem] min-h-[1.5rem]"
									on:change={(e) => handleTaskCheck(e, task, i)}
									checked={addedTasks.some((obj) => {
										return obj.id == task.id;
									})}
								/>

								<p>{task.name}</p>
							</div>
						{/each}
					</div>
				{/if}
			</div>
			<div class="flex flex-wrap gap-2 pt-4 w-full text-secundary-text">
				{#each addedTasks as task}
					<span class="flex items-center p-3.5 rounded-lg gap-4 w-full">
						{#if task.id == 0}
							<p>{task.note}</p>
						{:else}
							<p>{task.name}</p>
						{/if}
						<p class="block ml-auto">Hrs</p>
						<input
							bind:value={task.hours}
							type="number"
							min="1"
							max="23"
							required
							disabled={dayBlocked}
							class="rounded-md border mt-1 border-gray-lines h-14 text-lg shadow-sm pl-4 text-black placeholder-gray-400 w-32 min-w-[8rem]"
						/>

						<button on:click|preventDefault={() => deleteTask(task)}> </button>
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
					bind:value={currentReport.notes}
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

{#if showModal}
	<div class="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
	<div class="modal-container">
		<div class="modal-content relative">
			<button
				class="absolute top-0 right-0 mt-2 mr-2 text-black text-xl font-bold"
				on:click={() => (showModal = false)}
			>
				<span class="material-symbols-outlined text-[#757095]"> close </span>
			</button>
			<h1 class="font-bold text-lg mb-2">¡UPS!</h1>
			<p class="text-left text-black">
				Tu petición supera el límite de horas que puedes reportar en este periodo de facturación,
				por favor ponte en contacto con el gerente del proyecto al que deseas reportar estas horas,
				puedes hacerlo dando clic aquí:
			</p>
			<!-- Additional content can go here -->
			<div class="flex justify-around mt-3 text-white">
				<a class="p-2 bg-blue-linktic rounded-lg w-[40%] hover:bg-[#5DA0FE]" href="/u/solicitudes"
					>Solicitar autorización</a
				>
				<button
					class="p-2 bg-red-700 rounded-lg w-[40%] hover:bg-[#de2020]"
					on:click={() => (showModal = false)}>Cancelar</button
				>
			</div>
		</div>
	</div>
{/if}

<style>
	.modal-container {
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 50; /* Adjust z-index as needed */
	}

	.modal-content {
		background: #f8f8f8; /* bg-gray-50 */
		box-shadow:
			0 4px 6px -1px rgba(0, 0, 0, 0.1),
			0 2px 4px -1px rgba(0, 0, 0, 0.06); /* shadow-2xl */
		border-radius: 0.5rem; /* rounded-2xl */
		padding: 1.5rem 2.5rem; /* p-6 */
		max-width: 37rem; /* max-w-lg */
		text-align: center; /* text-center */
		color: #b91c1c; /* text-red-600 */
	}
</style>
