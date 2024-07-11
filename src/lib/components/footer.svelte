<script lang="ts">
	import { Clock, Folder, Home, Icon, UserCircle } from 'svelte-hero-icons';
	import { page } from '$app/stores';

	export let modalOpen = false;
	export let user;

	let canRegisterHours = true;
	let canLimitHours = false;

	if (user.id_rol === 1) {
		canLimitHours = true;
		canRegisterHours = false
	}
</script>

<footer class="md:hidden fixed bottom-0 w-full bg-secundary-background z-[80]">
	<nav class="flex justify-around pt-5 pb-7">
		<a href="/u" class:active={$page.url.pathname == '/u'}>
			<Icon src={Home} class="text-gray-texts w-6" />
		</a>

		{#if canRegisterHours}
			<a href="/u/horas" class:active={$page.url.pathname.includes('horas')}>
				<Icon src={Clock} class="text-gray-texts w-6" />
			</a>
		{/if}

		{#if canLimitHours}
			<a href="/u/admin" class:active={$page.url.pathname.includes('admin')}>
				<span class="flex flex-row gap-4 m-auto items-center">
					<Icon class="text-gray-texts w-6" src={Folder} alt="icon-home" />
				</span>
			</a>
		{/if}

		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<span on:click={() => (modalOpen = true)} on:keydown={() => (modalOpen = true)}>
			<Icon src={UserCircle} class="text-gray-texts w-6" />
		</span>
	</nav>
</footer>

<style>
	.active {
		position: relative;
	}
	.active::after {
		content: '';
		width: 0.5rem;
		height: 0.5rem;
		display: block;
		position: absolute;
		background: theme('colors.red-betel');
		border-radius: 100%;
		margin: auto;
		left: 8px;
		margin-top: 4px;
	}
</style>
