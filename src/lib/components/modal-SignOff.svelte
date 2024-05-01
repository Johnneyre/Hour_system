<script>
	import SignOffImg from '$lib/assets/SignOffIcon.svg';
	import { scale } from 'svelte/transition';
	import ModalContorn from './modal-contorn.svelte';
	import { page } from '$app/stores';
	import { invalidateAll } from '$app/navigation';
	export let modalOpen;

	const logOut = async () => {
		await $page.data.supabase.auth.signOut();
		modalOpen = false;
		invalidateAll();
	};
</script>

<!--MODAL PARA CERRAR SESION-->
<ModalContorn>
	<section
		slot="modal-DeleteRegister"
		class="modal-signoff-content"
		transition:scale={{ start: 0 }}
	>
		<div class="flex flex-col items-center justify-center -mt-12">
			<img src={SignOffImg} alt="icon-out" />
			<b class="text-2xl text-white text-center font-bold leading-8 pt-5 pb-4">
				Confirmación
			</b>
			<p class="text-center text-lg leading-6 px-10 text-[#ffffffd6]">
				¿Estás seguro de cerrar sesión?
			</p>
		</div>

		<div class="flex flex-col items-center justify-center w-full pt-10 pb-4 gap-4">
			<button
				on:click={logOut}
				class="w-full bg-red-betel text-white font-semibold py-4 rounded-xl hover:bg-[#8f4733] transition duration-1000"
				>Continuar</button
			>
			<button
				class="w-full py-4 text-red-betel text-lg font-semibold rounded-xl hover:bg-[#454242] hover:text-white transition duration-1000"
				on:click={() => (modalOpen = false)}>Cancelar</button
			>
		</div>
	</section>
</ModalContorn>
