<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import Mail from '$lib/assets/mail.svg';
	import Password from '$lib/assets/password.svg';
	import { toast } from '../../store/toast';
	import type { ActionData } from './$types';

	export let form: ActionData;

	let user = '';
	let password = '';

	$: if (form?.success && form?.message !== undefined) {
		toast.error(form?.message);
	}

	const submitSocialLogin: SubmitFunction = async ({ formData, cancel }) => {
		if (!user || !password) {
			toast.error('Por favor, digite su usuario y contraseña');
			return cancel();
		}
		formData.append('user', user);
		formData.append('password', password);
		user = '';
		password = '';
	};
</script>

<section class="flex justify-center items-center h-screen w-full bg-slate-800 overflow-hidden">
	<div class="flex w-full items-center justify-center flex-col gap-8 overflow-hidden">
		<div>
			<h2 class="text-white text-3xl font-medium w-full text-center">Bienvenido a Moto Betel</h2>
		</div>
		<form class="w-full px-4" method="POST" use:enhance={submitSocialLogin}>
			<label
				for="email-address-icon"
				class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>Correo Electrónico</label
			>
			<div class="relative">
				<div class="absolute inset-y-0 start-0 flex items-center ps-2.5 pointer-events-none">
					<img src={Mail} alt="Mail" />
				</div>
				<input
					type="text"
					id="email-address-icon"
					class="bg-gray-700 border border-gray-600 text-white placeholder-gray-400 text-sm focus:outline-gray-700 rounded-lg block w-full ps-11 p-2.5"
					placeholder="ejemplo@ejemplo.com"
					bind:value={user}
				/>
			</div>
			<label
				for="password-address-icon"
				class="block mb-2 mt-4 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label
			>
			<div class="relative">
				<div class="absolute inset-y-0 start-0 flex items-center ps-2.5 pointer-events-none">
					<img src={Password} alt="Password" />
				</div>
				<input
					type="password"
					id="password-address-icon"
					class="bg-gray-700 border border-gray-600 text-white placeholder-gray-400 text-sm focus:outline-gray-700 rounded-lg block w-full ps-11 p-2.5"
					placeholder="*********"
					bind:value={password}
				/>
			</div>
			<div class="flex mt-6">
				<button
					type="submit"
					class="w-full text-white bg-red-800 p-2 rounded-md hover:bg-red-600 font-medium"
					formaction="?/login">Iniciar Sesión</button
				>
			</div>
		</form>
	</div>
</section>
