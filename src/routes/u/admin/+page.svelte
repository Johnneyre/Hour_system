<script lang="ts">
	import MobileBottomTapBar from '$lib/components/mobile-bottom-tap-bar.svelte';
	import { ChevronDown, ChevronUp, Icon, Pencil, Plus, Trash, User } from 'svelte-hero-icons';
	import ModalLarge from '$lib/components/ModalLarge.svelte';
	import Portal from 'svelte-portal';
	import { toast } from '../../../store/toast';
	import type { ActionData, PageData } from './$types';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';

	export let data: PageData;
	export let form: ActionData;

	let totalHours = 0;

	$: form;

	let openModalUser: boolean;
	let openModalTarea: boolean;
	let openModalDelete: boolean;
	let openModalEditU: boolean;
	let openModalEditT: boolean;

	let ShowHoursReport: boolean = false;

	let selectedUser: string = '';
	let userN: any;

	let fechaInicio: string = '';
	let fechaFin: string = '';

	let totalTasks: number = 0;

	let modalDeleteType: string;

	let idDelete: string;

	let idEdit: any;
	$: idEdit;

	let taskName: string;
	let taskDescription: string;

	let username: string;
	let password: string;
	let fullName: string;
	let C_I: string;
	let bithdate: string;
	let id_rol: string;

	const formData = new FormData();

	const submitDelete: SubmitFunction = ({ formData }: any) => {
		if (modalDeleteType == 'tarea') {
			formData.append('deleteId', String(idDelete));
		} else {
			formData.append('deleteType', modalDeleteType);
			formData.append('deleteId', String(idDelete));
		}
		openModalDelete = false;
	};

	async function submitCreate({ formData }: any) {
		openModalUser = false;
		openModalTarea = false;
	}

	async function GetHourAndTask() {
		const userData = data.Users.find((user: any) => user.id_user === selectedUser);
		userN = userData ? userData.fullName : '';
	}

	async function editTask(id: any) {
		modalDeleteType = 'tarea';
		idEdit = id;
		openModalEditT = true;
	}

	async function editUser(id: any) {
		modalDeleteType = 'usuario';
		idEdit = id;
		openModalEditU = true;
	}

	async function clearInput() {
		selectedUser = '';
		fechaInicio = '';
		fechaFin = '';
	}

	function formatFecha(fecha: any) {
		if (fecha) {
			const fechaObjeto = new Date(fecha);

			return fechaObjeto.toISOString();
		} else {
			return '';
		}
	}

	$: if (form) {

		if (form?.returnDelete) {
			toast.success(form.messageDelete);
		}

		if (form?.responseCreate) {
			toast.success(form.messageCreate);
		}

		if (form?.responseEdit) {
			toast.success(form.messageEdit);
		}

		if (form?.hours) {
			let fechaI = new Date();
			let fechaF = new Date();
			if (fechaInicio == '') {
				fechaI = new Date('2024-06-01T00:00:00.000Z');
			} else {
				fechaI = new Date(formatFecha(fechaInicio));
			}
			if (fechaFin == '') {
				let fechaActual = new Date().toISOString();
			} else {
				fechaF = new Date(formatFecha(fechaFin));
			}

			if (fechaInicio == '' && fechaFin == '') {
				const filteredHours = form.hours.filter((hour: any) => {
					const createdAtDate = new Date(hour.created_at);
					return createdAtDate >= fechaI && createdAtDate <= fechaF;
				});

				const horas_lista = form.hours?.map((item: { hours: any }) => item.hours);

				// Calculamos la suma utilizando la función reduce()
				totalHours = horas_lista?.reduce((acc: any, curr: any) => acc + curr, 0);

				totalTasks = 0;
				for (const item of form.hours) {
					if (item.task) {
						totalTasks++;
					}
				}
			} else {
				const filteredHours = form.hours.filter((hour: any) => {
					const createdAtDate = new Date(hour.created_at);
					return createdAtDate >= fechaI && createdAtDate <= fechaF;
				});

				const horas_lista = filteredHours.map((item: { hours: any }) => item.hours);

				// Calculamos la suma utilizando la función reduce()
				totalHours = horas_lista?.reduce((acc: any, curr: any) => acc + curr, 0);

				totalTasks = 0;
				for (const item of filteredHours) {
					if (item.task) {
						totalTasks++;
					}
				}
			}

			ShowHoursReport = true;
		}
	}
</script>

<svelte:window />

<div class="flex flex-col w-full px-5 pt-10 pb-20 md:pb-6">
	<h1 class="text-3xl font-bold text-white mb-6">Panel de Administrador</h1>

	<!-- Usuarios -->
	<div class="w-full bg-[#1e1f20] mb-5 rounded-2xl mt-3 px-4">
		<details>
			<summary
				class="text-left flex items-center justify-between cursor-pointer py-4 rounded-2xl relative"
			>
				<p class="text-2xl text-white font-bold">Usuarios</p>
				<div class="absolute left-[90%]">
					<span class="expand">
						<Icon
							src={ChevronDown}
							class=" h-8 w-8 bg-[#ff461e] text-white rounded-md expand p-2"
						/>
					</span>
				</div>

				<div class="flex">
					<span class="expanded">
						<button
							on:click={() => {
								modalDeleteType = 'usuario';
								openModalUser = true;
							}}
							type="button"
							class="cursor-pointer rounded-full text-white bg-[#ff461e] px-3 py-1">Nuevo</button
						>
					</span>
					<span class="expanded ml-2 items-start">
						<Icon src={ChevronUp} class="h-8 w-8 bg-[#ff461e] text-white rounded-md p-[5px]" />
					</span>
				</div>
			</summary>
			{#each data.Users as users, i}
				<div class=" flex justify-between items-center py-5">
					<!--Link Titulo-->

					<div class="w-[40%]">
						<p class="text-white">{users.fullName}</p>
					</div>

					<!--Link Acciones-->
					<div class="flex justify-around items-center ml-2">
						<button
							on:click={() => {
								editUser(i);
							}}
							type="button"
							class="cursor-pointer rounded-full text-white bg-[#ff461e] p-2 mx-1 sm:mx-2"
						>
							<Icon src={Pencil} class="w-4 h-4" />
						</button>
						<button
							on:click={() => {
								modalDeleteType = 'usuario';
								openModalDelete = true;
								idDelete = users.id_user;
							}}
							type="button"
							class="cursor-pointer rounded-full text-white bg-[#ff461e] p-2 mx-1 sm:mx-2"
						>
							<Icon src={Trash} class="w-4 h-4" /></button
						>
					</div>
				</div>
			{/each}
		</details>
	</div>

	<!-- TAREAS -->
	<div class="w-full bg-[#1e1f20] mb-5 rounded-2xl mt-3 px-4">
		<details>
			<summary
				class="text-left flex items-center justify-between cursor-pointer py-4 rounded-2xl relative"
			>
				<p class="text-2xl text-white font-bold">Tareas</p>
				<div class="absolute left-[90%]">
					<span class="expand">
						<Icon
							src={ChevronDown}
							class=" h-8 w-8 bg-[#ff461e] text-white rounded-md expand p-2"
						/>
					</span>
				</div>

				<div class="flex">
					<span class="expanded">
						<button
							on:click={() => {
								modalDeleteType = 'tarea';
								openModalTarea = true;
							}}
							type="button"
							class="cursor-pointer rounded-full text-white bg-[#ff461e] px-3 py-1">Nuevo</button
						>
					</span>
					<span class="expanded ml-2 items-start">
						<Icon src={ChevronUp} class="h-8 w-8 bg-[#ff461e] text-white rounded-md p-[5px]" />
					</span>
				</div>
			</summary>
			{#each data.Task as task, i}
				<div class=" flex justify-between py-2 w-full">
					<!--Link Titulo-->
					<div class="w-[40%]">
						<p class="text-white">{task.name}</p>
					</div>

					<!--Link Acciones-->
					<div class="flex justify-around items-center">
						<button
							on:click={() => {
								editTask(i);
							}}
							type="button"
							class="cursor-pointer rounded-full text-white bg-[#ff461e] p-2 mx-1 sm:mx-2"
						>
							<Icon src={Pencil} class="w-4 h-4" />
						</button>
						<button
							on:click={() => {
								modalDeleteType = 'tarea';
								openModalDelete = true;
								idDelete = task.id_tasks;
							}}
							type="button"
							class="cursor-pointer rounded-full text-white bg-[#ff461e] p-2 mx-1 sm:mx-2"
							><Icon src={Trash} class="w-4 h-4" /></button
						>
					</div>
				</div>
			{/each}
		</details>
	</div>

	<!-- Reporte de horas -->
	<div class="w-full bg-[#1e1f20] mb-5 rounded-2xl mt-3 p-4">
		<form method="post" use:enhance={() => GetHourAndTask()}>
			<h1 class="text-3xl font-bold text-white mb-6">Reporte de horas</h1>
			<p class="sm:text-lg text-white">Usuario</p>
			<select
				class="inline sm:text-lg mr-auto w-full bg-stone-300 pl-3 rounded-md mt-1 mb-4"
				placeholder="usuario"
				name="usuario"
				bind:value={selectedUser}
			>
				<option disabled selected hidden value="">Selecione un Usuario</option>
				{#each data.Users as user}
					<option value={user.id_user}>{user.fullName}</option>
				{/each}
			</select>
			<div class="flex justify-between">
				<div class="w-[45%]">
					<p class="sm:text-lg text-white">Fecha de inicio</p>
					<input
						type="date"
						class="inline sm:text-lg mr-auto w-full bg-stone-300 pl-3 rounded-md mt-1 mb-4"
						placeholder="Fecha de inicio"
						name="fechaInicio"
						bind:value={fechaInicio}
					/>
				</div>
				<div class="w-[45%]">
					<p class="sm:text-lg text-white">Fecha final</p>
					<input
						type="date"
						class="inline sm:text-lg mr-auto w-full bg-stone-300 pl-3 rounded-md mt-1 mb-4"
						placeholder="Fecha final"
						name="fechaFinal"
						bind:value={fechaFin}
					/>
				</div>
			</div>
			<div class="flex justify-center mb-4">
				<button
					type="submit"
					formaction="?/getReport"
					class="rounded-[20px] bg-[#ff461e] h-8 text-white text-lg font-medium pl-6 pr-6 hover:bg-[#f44848] duration-300 mx-auto"
				>
					Consultar
				</button>
				<button
					type="button"
					on:click={() => {
						ShowHoursReport = false
						clearInput()
					}}
					class="rounded-[20px] bg-[#ff461e] h-8 text-white text-lg font-medium pl-6 pr-6 hover:bg-[#f44848] duration-300 mx-auto"
				>
					Limpiar
				</button>
			</div>
		</form>
		{#if ShowHoursReport == true}
			<div class="p-3 flex justify-between bg-[#131314] rounded-2xl">
				<div
					class=" flex flex-col text-white bg-[#1e1f20] p-5 rounded-2xl w-[31%] items-center justify-center"
				>
					<p>{userN}</p>
				</div>
				<div
					class="flex flex-col text-white bg-[#1e1f20] p-5 rounded-2xl w-[31%] items-center justify-center text-center"
				>
					<p class="font-bold">{totalHours}</p>
					<p class="text-sm">Horas totales</p>
				</div>
				<div
					class="flex flex-col text-white bg-[#1e1f20] p-5 rounded-2xl w-[31%] items-center justify-center text-center"
				>
					<p class="font-bold">{totalTasks}</p>
					<p class="text-sm">Tareas totales</p>
				</div>
			</div>
		{/if}
	</div>
</div>

<!-- Modal Usuario -->
<Portal>
	<ModalLarge bind:open={openModalUser}>
		<form method="post" use:enhance={(e) => submitCreate(e)}>
			<div class="flex flex-col justify-center">
				<p class="text-2xl text-white text-center font-bold leading-8 pt-6 pb-4">
					Creacion de Usuario
				</p>
			</div>

			<div class="w-full px-4">
				<p class="sm:text-lg text-white">Nombre de usuario</p>
				<input type="hidden" value="usuario" name="typeCrear" />
				<input
					class="inline sm:text-lg mr-auto w-full bg-stone-300 pl-3 rounded-md mt-1 mb-4"
					placeholder="Nombre de usuario"
					name="username"
					bind:value={username}
				/>
				<p class="sm:text-lg text-white">Contraseña</p>
				<input
					class="inline sm:text-lg mr-auto w-full bg-stone-300 pl-3 rounded-md mt-1 mb-4"
					placeholder="Contraseña"
					name="password"
					bind:value={password}
				/>
				<p class="sm:text-lg text-white">Nombre y apellido</p>
				<input
					class="inline sm:text-lg mr-auto w-full bg-stone-300 pl-3 rounded-md mt-1 mb-4"
					placeholder="Nombre y apellido"
					name="fullName"
					bind:value={fullName}
				/>
				<p class="sm:text-lg text-white">Número de cedula</p>
				<input
					class="inline sm:text-lg mr-auto w-full bg-stone-300 pl-3 rounded-md mt-1 mb-4"
					placeholder="Número de cedula"
					name="C_I"
					bind:value={C_I}
				/>
				<p class="sm:text-lg text-white">Fecha de nacimiento</p>
				<input
					type="date"
					class="inline sm:text-lg mr-auto w-full bg-stone-300 pl-3 rounded-md mt-1 mb-4"
					placeholder="Fecha de nacimiento"
					name="bithdate"
					bind:value={bithdate}
				/>
				<p class="sm:text-lg text-white">Rol</p>
				<select
					class="inline sm:text-lg mr-auto w-full bg-stone-300 pl-3 rounded-md mt-1 mb-4"
					placeholder="Rol del usuario"
					name="rol"
					bind:value={id_rol}
				>
					<option disabled selected hidden value="">Selecione un rol</option>
					<option value="1">Administrador</option>
					<option value="2">Usuario</option>
				</select>
			</div>
			<div class="flex my-6 pt-4 justify-around">
				<button
					type="button"
					class="text-center h-14 rounded-md text-white font-semibold"
					on:click={() => (openModalUser = false)}
				>
					Cancelar
				</button>
				<button
					type="submit"
					formaction="?/createUser"
					class="rounded-[20px] bg-[#ff461e] h-12 text-white text-lg font-medium pl-6 pr-6 hover:bg-[#f44848] duration-300"
					on:click={submitCreate}
				>
					Crear
				</button>
			</div>
		</form>
	</ModalLarge>
</Portal>

<!-- Modal de edit Usuario-->
<Portal>
	<ModalLarge bind:open={openModalEditU}>
		<form method="post" use:enhance={editUser}>
			<div class="flex flex-col justify-center">
				<p class="text-2xl text-white text-center font-bold leading-8 pt-6 pb-4">Editar Usuario</p>
			</div>
			<input type="hidden" name="UserId" value={data.Users[idEdit].id_user} />
			<div class="w-full px-4">
				<p class="sm:text-lg text-white">Nombre de usuario</p>
				<input type="hidden" value="usuario" name="typeCrear" />
				<input
					class="inline sm:text-lg mr-auto w-full bg-stone-300 pl-3 rounded-md mt-1 mb-4"
					placeholder="Nombre de usuario"
					name="username"
					bind:value={data.Users[idEdit].username}
				/>
				<p class="sm:text-lg text-white">Contraseña</p>
				<input
					class="inline sm:text-lg mr-auto w-full bg-stone-300 pl-3 rounded-md mt-1 mb-4"
					placeholder="Contraseña"
					name="password"
					bind:value={data.Users[idEdit].password}
				/>
				<p class="sm:text-lg text-white">Nombre y apellido</p>
				<input
					class="inline sm:text-lg mr-auto w-full bg-stone-300 pl-3 rounded-md mt-1 mb-4"
					placeholder="Nombre y apellido"
					name="fullName"
					bind:value={data.Users[idEdit].fullName}
				/>
				<p class="sm:text-lg text-white">Número de cedula</p>
				<input
					class="inline sm:text-lg mr-auto w-full bg-stone-300 pl-3 rounded-md mt-1 mb-4"
					placeholder="Número de cedula"
					name="C_I"
					bind:value={data.Users[idEdit].C_I}
				/>
				<p class="sm:text-lg text-white">Fecha de nacimiento</p>
				<input
					type="date"
					class="inline sm:text-lg mr-auto w-full bg-stone-300 pl-3 rounded-md mt-1 mb-4"
					placeholder="Fecha de nacimiento"
					name="bithdate"
					bind:value={data.Users[idEdit].bithdate}
				/>
				<!-- <p class="sm:text-lg text-white">Estado</p>
				<select
					class="inline sm:text-lg mr-auto w-full bg-stone-300 pl-3 rounded-md mt-1 mb-4"
					placeholder="Rol del usuario"
					name="rol"
					bind:value={data.Users[idEdit].id_rol}
				>
					<option value=true>Activo</option>
					<option value=false>Inactivo</option>
				</select> -->
				<p class="sm:text-lg text-white">Rol</p>
				<select
					class="inline sm:text-lg mr-auto w-full bg-stone-300 pl-3 rounded-md mt-1 mb-4"
					placeholder="Rol del usuario"
					name="rol"
					bind:value={data.Users[idEdit].id_rol}
				>
					<option value={data.Users[idEdit].id_rol}></option>
					<option value="1">Administrador</option>
					<option value="2">Usuario</option>
				</select>
			</div>
			<div class="flex my-6 pt-4 justify-around">
				<button
					type="button"
					class="text-center h-14 rounded-md text-white font-semibold"
					on:click={() => (openModalEditU = false)}
				>
					Cancelar
				</button>
				<button
					type="submit"
					formaction="?/updateUser"
					class="rounded-[20px] bg-[#ff461e] h-12 text-white text-lg font-medium pl-6 pr-6 hover:bg-[#f44848] duration-300"
					on:click={(e) => {
						editUser(e);
						window.location.reload();
					}}
				>
					Editar
				</button>
			</div>
		</form>
	</ModalLarge>
</Portal>

<!-- Modal Tarea -->
<Portal>
	<ModalLarge bind:open={openModalTarea}>
		<form method="post" use:enhance={(e) => submitCreate(e)}>
			<div class="flex flex-col justify-center">
				<p class="text-2xl text-white text-center font-bold leading-8 pt-6 pb-4">Crear Tarea</p>
			</div>

			<div class="w-full px-4">
				<p class="sm:text-lg text-white">Nombre de la tarea</p>
				<input type="hidden" value="tarea" name="typeCrear" />
				<input
					class="inline sm:text-lg mr-auto mb-4 mt-1 w-full bg-stone-300 pl-3 rounded-md"
					placeholder="Nombre del usuario"
					name="taskName"
					bind:value={taskName}
				/>

				<p class="sm:text-lg text-white">Descripción</p>
				<input
					class="inline sm:text-lg mr-auto mb-4 mt-1 w-full bg-stone-300 pl-3 rounded-md"
					placeholder="Descripción"
					name="taskDescription"
					bind:value={taskDescription}
				/>
			</div>

			<div class="flex my-6 pt-4 justify-around">
				<button
					type="button"
					class="text-center h-14 rounded-md text-white font-semibold"
					on:click={() => (openModalTarea = false)}
				>
					Cancelar
				</button>
				<button
					type="submit"
					formaction="?/createTask"
					class="rounded-[20px] bg-[#ff461e] h-12 text-white text-lg font-medium pl-6 pr-6 hover:bg-[#f44848] duration-300"
					on:click={() => {
						submitCreate;
						
					}}
				>
					Crear
				</button>
			</div>
		</form>
	</ModalLarge>
</Portal>

<!-- Modal edit Tarea -->
<Portal>
	<ModalLarge bind:open={openModalEditT}>
		<form method="post" use:enhance={(e) => submitCreate(e)}>
			<div class="flex flex-col justify-center">
				<p class="text-2xl text-white text-center font-bold leading-8 pt-6 pb-4">Editar Tarea</p>
			</div>
			<input type="hidden" name="taskId" value={data.Task[idEdit].id_tasks} />
			<div class="w-full px-4">
				<p class="sm:text-lg text-white">Nombre de la tarea</p>
				<input type="hidden" value="tarea" name="typeCrear" />
				<input
					class="inline sm:text-lg mr-auto mb-4 mt-1 w-full bg-stone-300 pl-3 rounded-md"
					placeholder="Nombre de la tarea"
					name="taskName"
					bind:value={data.Task[idEdit].name}
				/>

				<p class="sm:text-lg text-white">Descripción</p>
				<input
					class="inline sm:text-lg mr-auto mb-4 mt-1 w-full bg-stone-300 pl-3 rounded-md"
					placeholder="Descripción"
					name="taskDescription"
					bind:value={data.Task[idEdit].description}
				/>
			</div>

			<div class="flex my-6 pt-4 justify-around">
				<button
					type="button"
					class="text-center h-14 rounded-md text-white font-semibold"
					on:click={() => (openModalEditT = false)}
				>
					Cancelar
				</button>
				<button
					type="submit"
					formaction="?/updateTask"
					class="rounded-[20px] bg-[#ff461e] h-12 text-white text-lg font-medium pl-6 pr-6 hover:bg-[#f44848] duration-300"
					on:click={() => {openModalEditT = false}}
				>
					Editar
				</button>
			</div>
		</form>
	</ModalLarge>
</Portal>

<!-- Modal Eliminacion -->
<Portal>
	<ModalLarge bind:open={openModalDelete}>
		<div class="flex flex-col justify-center">
			<p class="text-2xl text-white text-center font-bold leading-8 pt-6 pb-4">
				Elimiar {modalDeleteType}
			</p>
		</div>

		<div class="w-full px-4 text-center">
			<p class="sm:text-lg text-white font-extrabold">
				¿Estas seguro de eliminar {modalDeleteType == 'tarea' ? 'la tarea?' : 'el usuario?'}
			</p>
			<p class="sm:text-lg text-white">si decides eliminar no podrás recuperar esta informacion</p>
		</div>

		<div class="flex my-6 pt-4 justify-around">
			<button
				type="button"
				class="text-center h-14 rounded-md text-white font-semibold"
				on:click={() => (openModalDelete = false)}
			>
				Cancelar
			</button>
			<form method="post" use:enhance={(e) => submitDelete(e)}>
				<input type="hidden" bind:value={modalDeleteType} name="deleteType" />
				<button
					type="submit"
					formaction="?/delete"
					class="rounded-[20px] bg-[#ff461e] h-12 text-white text-lg font-medium pl-6 pr-6 hover:bg-[#f44848] duration-300"
				>
					Eliminar
				</button>
			</form>
		</div>
	</ModalLarge>
</Portal>

<MobileBottomTapBar />

<style>
	details .expanded {
		display: none;
	}

	details[open] .expanded {
		display: block;
	}

	details[open] .expand {
		display: none;
	}
</style>
