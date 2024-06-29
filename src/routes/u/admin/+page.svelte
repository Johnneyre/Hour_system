<script lang="ts">
	import Banner from '$lib/components/home/banner-home.svelte';
	import CardsHome from '$lib/components/home/cards-home.svelte';
	import MobileBottomTapBar from '$lib/components/mobile-bottom-tap-bar.svelte';
	import { ChevronDown, ChevronUp, Icon, Pencil, Plus, Trash } from 'svelte-hero-icons';
	import ModalLarge from '$lib/components/ModalLarge.svelte';
	import Portal from 'svelte-portal';
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';

	export let data: PageData;

	console.log(data);

	let openModalUser: boolean;
	let openModalTarea: boolean;
	let openModalDelete: boolean;

	let modalDeleteType: string;

	let idDelete: string;

	async function handleCreateUser() {
		// await new Promise((resolve) => setTimeout(resolve, 0));
		openModalUser = false;
	}

	async function handleCreateTarea() {
		// await new Promise((resolve) => setTimeout(resolve, 0));
		openModalTarea = false;
	}

	async function handleDelete() {
		await new Promise((resolve) => setTimeout(resolve, 0));
		openModalDelete = false;
	}

	async function submitDelete({ formData }: any) {
		if (modalDeleteType == 'tarea') {
			console.log('Eliminar tarea');
			console.log(idDelete);
			formData.append('deleteType', String(modalDeleteType));
			formData.append('deleteId', String(idDelete));
		} else {
			console.log('Eliminar usuario');
			console.log(idDelete);
			formData.append('deleteType', String(modalDeleteType));
			formData.append('deleteId', String(idDelete));
		}
		await new Promise((resolve) => setTimeout(resolve, 0));
		openModalDelete = false;
	}

	async function submitCreate({ formData }: any) {
		if (modalDeleteType == 'tarea') {
			console.log('Crear tarea');
			formData.append('createType', String(modalDeleteType));
			let taskName = String(formData.get('Nombre de la tarea'));
			let taskDescription = String(formData.get('descripcion'));
		} else {
			console.log('Crear usuario');
			formData.append('createType', String(modalDeleteType));
			let username = String(formData.get('username'));
			let password = String(formData.get('password'));
			let fullName = String(formData.get('fullName'));
			let C_I = String(formData.get('C_I'));
			let bithdate = String(formData.get('bithdate'));
			let id_rol = String(formData.get('id_rol'));

			console.log(username, password, fullName, C_I, bithdate, id_rol);
		}
		await new Promise((resolve) => setTimeout(resolve, 0));
		openModalDelete = false;
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
			{#each data.Users as users}
				<div class=" flex justify-between items-center py-5">
					<!--Link Titulo-->

					<div class="w-[40%]">
						<p class="text-white">{users.fullName}</p>
					</div>

					<!--Link Acciones-->
					<div class="flex justify-around items-center ml-2">
						<p class="cursor-pointer rounded-full text-white bg-[#ff461e] p-2 mx-1 sm:mx-2">
							<Icon src={Pencil} class="w-4 h-4" />
						</p>
						<button
							on:click={() => {
								modalDeleteType = 'usuario';
								openModalDelete = true;
								idDelete = users.id_user;
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
			{#each data.Task as task}
				<div class=" flex justify-between py-2 w-full">
					<!--Link Titulo-->
					<div class="w-[40%]">
						<p class="text-white">{task.name}</p>
					</div>

					<!--Link Acciones-->
					<div class="flex justify-around items-center">
						<p class="cursor-pointer rounded-full text-white bg-[#ff461e] p-2 mx-1 sm:mx-2">
							<Icon src={Pencil} class="w-4 h-4" />
						</p>
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
		<h1 class="text-3xl font-bold text-white mb-6">Reporte de horas</h1>
		<p class="sm:text-lg text-white">Usuario</p>
		<select
			class="inline sm:text-lg mr-auto w-full bg-stone-300 pl-3 rounded-md mt-1 mb-4"
			placeholder="usuario"
			name="usuario"
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
				/>
			</div>
			<div class="w-[45%]">
				<p class="sm:text-lg text-white">Fecha final</p>
				<input
					type="date"
					class="inline sm:text-lg mr-auto w-full bg-stone-300 pl-3 rounded-md mt-1 mb-4"
					placeholder="Fecha final"
					name="fechaFinal"
				/>
			</div>
		</div>

		<div class="p-3 flex justify-between bg-[#131314] rounded-2xl">
			<div class=" flex flex-col text-white bg-[#1e1f20] p-5 rounded-2xl w-[31%] items-center justify-center">
				<p>Juanito Alimaña</p>
			</div>
			<div class="flex flex-col text-white bg-[#1e1f20] p-5 rounded-2xl w-[31%] items-center justify-center text-center">
				<p class="font-bold">40</p>
				<p class="text-sm">Horas totales</p>
			</div>
			<div class="flex flex-col text-white bg-[#1e1f20] p-5 rounded-2xl w-[31%] items-center justify-center text-center">
				<p class="font-bold">18</p>
				<p class="text-sm">Tareas totales</p>
			</div>
		</div>
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
				<input
					class="inline sm:text-lg mr-auto w-full bg-stone-300 pl-3 rounded-md mt-1 mb-4"
					placeholder="Nombre de usuario"
					name="username"
				/>
				<p class="sm:text-lg text-white">Contraseña</p>
				<input
					class="inline sm:text-lg mr-auto w-full bg-stone-300 pl-3 rounded-md mt-1 mb-4"
					placeholder="Contraseña"
					name="password"
				/>
				<p class="sm:text-lg text-white">Nombre y apellido</p>
				<input
					class="inline sm:text-lg mr-auto w-full bg-stone-300 pl-3 rounded-md mt-1 mb-4"
					placeholder="Nombre y apellido"
					name="fullName"
				/>
				<p class="sm:text-lg text-white">Número de cedula</p>
				<input
					class="inline sm:text-lg mr-auto w-full bg-stone-300 pl-3 rounded-md mt-1 mb-4"
					placeholder="Número de cedula"
					name="C_I"
				/>
				<p class="sm:text-lg text-white">Fecha de nacimiento</p>
				<input
					type="date"
					class="inline sm:text-lg mr-auto w-full bg-stone-300 pl-3 rounded-md mt-1 mb-4"
					placeholder="Fecha de nacimiento"
					name="bithdate"
				/>
				<p class="sm:text-lg text-white">Nombre y apellido</p>
				<select
					class="inline sm:text-lg mr-auto w-full bg-stone-300 pl-3 rounded-md mt-1 mb-4"
					placeholder="Rol del usuario"
					name="Rol del usuario"
				>
					<option disabled selected hidden value="">Selecione un rol</option>
					{#each data.Task as task}
						<option value={task.id_tasks}>{task.name}</option>
					{/each}
				</select>
			</div>
			<!-- </form> -->
			<div class="flex my-6 pt-4 justify-around">
				<button
					class="text-center h-14 rounded-md text-white font-semibold"
					on:click|self={() => (openModalTarea = false)}
				>
					Cancelar
				</button>
				<!-- <form method="post" use:enhance={(e) => submitCreate(e)}> -->
				<button
					type="submit"
					formaction="?/create"
					class="rounded-[20px] bg-[#ff461e] h-12 text-white text-lg font-medium pl-6 pr-6 hover:bg-[#f44848] duration-300"
					on:click={submitCreate}
				>
					Crear
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
				<input
					class="inline sm:text-lg mr-auto mb-4 mt-1 w-full bg-stone-300 pl-3 rounded-md"
					placeholder="Nombre del usuario"
					name="Nombre de la tarea"
				/>

				<p class="sm:text-lg text-white">Descripción</p>
				<input
					class="inline sm:text-lg mr-auto mb-4 mt-1 w-full bg-stone-300 pl-3 rounded-md"
					placeholder="Descripción"
					name="descripcion"
				/>
			</div>

			<div class="flex my-6 pt-4 justify-around">
				<button
					class="text-center h-14 rounded-md text-white font-semibold"
					on:click|self={() => (openModalTarea = false)}
				>
					Cancelar
				</button>
				<button
					type="submit"
					formaction="?/create"
					class="rounded-[20px] bg-[#ff461e] h-12 text-white text-lg font-medium pl-6 pr-6 hover:bg-[#f44848] duration-300"
					on:click={handleCreateTarea}
				>
					Crear
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
				class="text-center h-14 rounded-md text-white font-semibold"
				on:click|self={() => (openModalDelete = false)}
			>
				Cancelar
			</button>
			<form method="post" use:enhance={(e) => submitDelete(e)}>
				<button
					type="submit"
					formaction="?/delete"
					class="rounded-[20px] bg-[#ff461e] h-12 text-white text-lg font-medium pl-6 pr-6 hover:bg-[#f44848] duration-300"
					on:click={handleDelete}
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
