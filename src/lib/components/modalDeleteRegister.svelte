<script lang="ts">
	import SignOffImg from '$lib/assets/SignOffIcon.svg';
	import ModalContorn from './modal-contorn.svelte';
	import { enhance } from '$app/forms';
	import { toast } from '../../store/toast';
	import { invalidateAll } from '$app/navigation';
	import type { SubmitFunction } from '@sveltejs/kit';
	export let show: boolean;
	export let report: any;

	let disabled = false;

	const resolver: SubmitFunction = async ({ formData }) => {
		formData.append('id', report.id_hours);

		return async ({ result: { data, type } }: any) => {
			disabled = false;
			if (type == 'failure') {
				toast.error(
					'Ha ocurrido un error al intentar registrar las horas. Por favor intente nuevamente.'
				);
			} else {
				toast.success('Tu registro ha sido eliminado con éxito.');
				show = false;

				invalidateAll();
			}
		};
	};
</script>

{#if show}
	<!--MODAL PARA ELIMINAR REGISTRO DE HORAS-->
	<ModalContorn>
		<section slot="modal-DeleteRegister" class="modal-signoff-content">
			<div class="flex flex-col items-center justify-center -mt-12">
				<img src={SignOffImg} alt="icon-out" />
				<b class="text-2xl text-center font-bold leading-8 pt-5 pb-4 text-white"> Confirmación </b>
				<p class="text-center text-lg max-w-xs leading-6 px-10 text-secundary-text">
					¿Estás seguro que deseas eliminar este registro?
				</p>
			</div>

			<div class="flex flex-col items-center justify-center w-full pt-10 pb-8">
				<form class="w-full" action={`?/delete`} method="post" use:enhance={resolver}>
					<button
						{disabled}
						type="submit"
						class="block w-full bg-red-betel text-white font-semibold py-4 mb-8 rounded-xl hover:bg-[#8f4733] transition duration-1000"
						>Continuar</button
					>
				</form>
				<button
					on:click={() => (show = !show)}
					class="w-full text-red-betel text-lg font-semibold hover:text-white transition duration-1000"
					>Cancelar</button
				>
			</div>
		</section>
	</ModalContorn>
{/if}
