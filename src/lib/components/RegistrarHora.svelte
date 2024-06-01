<script lang="ts">
	import IconDown from '$lib/assets/icon-down.svg';
	import MagnifyingGlass from '$lib/assets/icon-glass.svg';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { toast } from '../../store/toast';
	import dayjs from 'dayjs';
	import { slide } from 'svelte/transition';
	import { ArrowLeft, Icon } from 'svelte-hero-icons';
	import 'dayjs/plugin/utc';
	import 'dayjs/plugin/timezone';
	import Modal from '$lib/components/modal-limiteHoras.svelte';
	import { writable } from 'svelte/store';

	export let date: dayjs.Dayjs;
	export let show = false;
	export let showModal = false;
	export let projects: any[];
	export let tasks: any[];
	export let reports: any[];

	$: totalhours = addedTasks.reduce((prev, curr) => prev + (curr.hours || 0), 0);

	let fullNameProject = '';
	let selected: any | null;
	let notes: string;
	let disabled = false;
	let openSelect = false;
	let addedTasks: any[] = [];
	let lastTask = writable('');
	let container: any;

	function onWindowClick(e: any) {
		if (openSelect) if (container.contains(e.target) == false) openSelect = false;
	}

	const deleteTarea = (task: any) => {
		let index = addedTasks.indexOf(task);
		let arr = addedTasks;
		arr.splice(index, 1);
		addedTasks = [...arr];
	};

	const handleTareaCheck = (e: any, task: any, i: number) => {
		if (!e.target.checked) {
			deleteTarea(task);
			lastTask.set(addedTasks[addedTasks.length - 1]?.name || '');
		} else {
			if (addedTasks.includes(task)) return;
			addedTasks = [...addedTasks, task];
			lastTask.set(task.name);
		}
	};

	const handleSubmit: SubmitFunction = async ({ data, cancel }) => {
		if (!selected) {
			toast.error('Seleccione un proyecto de la lista');
			return cancel();
		}

		if (!addedTasks || !addedTasks.length) {
			toast.error('Seleccione al menos una tarea');
			return cancel();
		}

		if (!notes) {
			toast.error('No puedes continuar sin llenar el campo requerido');
			return cancel();
		}

		let currentMonth = dayjs(date).format('YYYY-MM');
		let hoursPerMonth = reports
			.filter((report) => dayjs(report.date).format('YYYY-MM') === currentMonth)
			.reduce((totalHours, report) => totalHours + report.hours, 0);

		if (totalhours >= 24 || totalhours < 1) {
			toast.error('Superaste el limite de horas que puedes agregar al dia');
			return cancel();
		}

		data.append('date', dayjs(date).format('YYYY-MM-DD'));
		data.append('project_id', selected.id.toString());
		data.append('hours', totalhours.toString());
		data.append('reports', JSON.stringify(reports));
		data.append('currentMonth', JSON.stringify(currentMonth));
		data.append('hoursPerMonth', JSON.stringify(hoursPerMonth));
		data.append('totalhours', JSON.stringify(totalhours));

		for (const task of addedTasks) {
			data.append('tasks', JSON.stringify(task));
		}

		disabled = true;

		return async ({ result: { data, type } }: any) => {
			disabled = false;
			if (type == 'failure') {
				toast.error(data.message);
			} else {
				toast.success('Tu registro de horas ha sido guardado con éxito.');

				invalidateAll();
				show = false;
			}
		};
	};
</script>

<!--MODAL PARA REGISTRAR HORAS Y PROYECTO-->

<svelte:window on:click={onWindowClick} />

{#if show}
	<section
		transition:slide
		id={Date()}
		class="w-screen overflow-y-scroll h-screen pt-4 pb-24 md:pt-4 md:pb-4 top-0 left-0 overflow-hidden fixed z-40"
	>
		<div
			class="shadow-xl mx-auto md:ml-[20%] border border-red-betel rounded-lg bg-secundary-background px-8 py-8 max-w-sm md:max-w-[30rem] <md:(w-4/5) block"
		>
			<div class="flex flex-col items-center justify-center">
				<h1 class="text-3xl font-semibold text-center text-dark-text pb-2">Registro de horas</h1>
				<p class="text-lg text-secundary-text text-center">
					Ingrese los datos solicitados para registrar su jornada laboral.
				</p>
			</div>

			<form action="?/create" use:enhance={handleSubmit} method="post" class="pt-5">
				<label for="project" class="text-md text-secundary-text px-2">Ingresa el proyecto</label>
				<div class="relative pb-5">
					<input
						list={'name'}
						id="project-input"
						type="text"
						class="w-full rounded-md border mt-1 bg-secundary-background h-14 text-lg pl-4 pr-12 placeholder-gray-400"
						placeholder="Insertar"
						bind:value={fullNameProject}
						on:focus={() => (fullNameProject = '')}
						required
						autocomplete="off"
					/>
					<datalist id={'name'}>
						{#each projects as project}
							<option value={project.name} />
						{/each}
					</datalist>

					<div
						class="absolute inset-y-0 flex items-center right-1 pr-2 pb-3 pointer-events-none bg-secundary-background h-8 top-6"
					>
						<img src={MagnifyingGlass} alt="glass" />
					</div>
				</div>

				<label for="horas" class="text-md text-secundary-text px-2">Selecciona las tareas</label>
				<div class="relative pb-3" bind:this={container}>
					<!-- svelte-ignore a11y-no-static-element-interactions -->
					<div
						class="w-full rounded-md border mt-1 border-gray-line h-12 text-lg shadow-sm pl-4 pr-12 bg-no-repeat bg-right bg-contain appearance-none relative"
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

					{#if openSelect}
						<div
							class="text-secundary-text border mt-1 border-gray-lines bg-secundary-background w-full left-0 p-2 rounded-md overflow-y-auto h-32 z-20"
						>
							{#each tasks as task, i}
								<div class="flex items-center gap-4 mb-3">
									<input
										type="checkbox"
										class="w-6 h-6 rounded-md min-w-[1.5rem] min-h-[1.5rem]"
										on:change={(e) => handleTareaCheck(e, task, i)}
										checked={addedTasks.some((obj) => obj.id === task.id)}
									/>
									<p>{task.name}</p>
								</div>
							{/each}
						</div>
					{/if}
				</div>

				<div class="flex flex-wrap gap-2 text-secundary-text">
					{#each addedTasks as task}
						<span class="flex items-center p-3.5 rounded-lg gap-4 w-full">
							<p>{task.name}</p>
							<p class="block ml-auto">Hrs</p>
							<input
								type="number"
								bind:value={task.hours}
								required
								min="1"
								max="24"
								class="rounded-md border mt-1 border-gray-lines h-14 text-lg shadow-sm pl-4 text-black placeholder-gray-400 w-16 min-w-16rem]"
							/>
							<button on:click|preventDefault={() => deleteTarea(task)}> </button>
						</span>
					{/each}
					{#if addedTasks.length}
						<span class="flex items-centerp-3.5 rounded-lg gap-4 pr-10 justify-end w-full">
							<p>Total</p>
							<p class="border-b border-gray-lines w-32">
								{totalhours}
							</p>
						</span>
					{/if}
				</div>

				<hr class="hr_class mt-3" />

				<div class="flex flex-col pt-5">
					<label for="horas" class="text-md text-secundary-text px-2 pb-1">
						Ingrese breve descripción de las tareas ejecutadas<span class="text-red-600">*</span>
					</label>
					<textarea
						name="notes"
						bind:value={notes}
						class="w-auto h-12 border-gray-300 border resize-none bg-secundary-background rounded-lg py-2 px-4 text-lg"
						placeholder="Inserte"
						maxlength="100"
						minlength="10"
						required
					/>
				</div>

				<div class="flex flex-row items-center justify-center w-full pt-4 pb-4">
					<button
						on:click|preventDefault={() => (show = !show)}
						class="w-1/2 text-red-betel text-lg font-semibold hover:text-white transition duration-1000"
						type="button"
					>
						Cancelar
					</button>

					<button
						class="w-1/2 bg-red-betel text-white font-semibold py-4 rounded-xl hover:bg-[#8f4733] transition duration-1000"
					>
						Continuar
					</button>
				</div>
			</form>
		</div>
	</section>
{/if}
<Modal bind:showModal />

<style>
	.hr_class {
		border-color: rgba(247, 174, 174, 0.34);
	}
</style>
