<script lang="ts">
	import PencilIcon from '$lib/assets/icon-pencil.svg';
	import XIcon from '$lib/assets/icon-x.svg';
	import ModalDeleteRegister from './modalDeleteRegister.svelte';

	export let report: any;
	export let dayBlocked: boolean;

	let showDm = false;
	export let showEm;
</script>

<!-- SE EXPORTAN A REGISTER-ACTIVITIES.SVELTE -->
{#if !dayBlocked}
	<ModalDeleteRegister bind:show={showDm} {report} />
{/if}

<section
	class="flex flex-col justify-between min-w-[12rem] items-center py-2 md:mx-0 container_register max-w-[46%]"
>
	<div
		class="card border border-black rounded-2xl h-auto my-1 w-full mx-auto p-3 bg-red-betel container_card_register"
	>
		<h1 class="font-bold text-lg text-blue-100">
			{report.hours}
			{report.hours > 1 ? 'horas' : 'hora'}
		</h1>
		<span class="flex flex-row items-center justify-start">
			<p class="text-blue-100 text-base">
				{report?.task?.name} - {report?.task?.description}
			</p>
			<div class="flex flex-col lg:flex-row justify-center pl-3 lg:px-0 items-center ml-auto">
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div
					on:click={() => (showEm = report.id_hours)}
					on:keydown={() => (showEm = report.id_hours)}
					class="w-4 md:w-6 cursor-pointer"
				>
					<img class="lg:-mx-5" src={PencilIcon} alt="icon-pencil" />
				</div>
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div
					on:click={() => (showDm = !showDm)}
					on:keydown={() => (showDm = !showDm)}
					class="w-4 md:w-6 cursor-pointer"
				>
					<img class="lg:mx-0 pt-3 lg:pt-0" src={XIcon} alt="icon-x" />
				</div>
			</div>
		</span>
	</div>
</section>