<script lang="ts">
	import logoprofile from '$lib/assets/profile.png';
	import ripor from '$lib/assets/ripor.svg';
	import HomeGrayIcon from '$lib/assets/aside/home-gray.svg';
	import HomeBlueIcon from '$lib/assets/aside/home-blue.svg';
	import HourGrayIcon from '$lib/assets/aside/hour-gray.svg';
	import HourBlueIcon from '$lib/assets/aside/hour-blue.svg';
	import CloseGrayIcon from '$lib/assets/aside/close-gray.svg';
	import CloseBlueIcon from '$lib/assets/aside/close-blue.svg';
	import { page } from '$app/stores';

	export let modalOpen = false;

	const canRegisterHours = true;
	const canLimitHours = true;
	let isCloseFocused = false;
</script>

<section class="flex sm:block min-h-full cont bg-secundary-background">
	<aside class="border-r h-screen min-h-full w-full min-w-[260px] border-[#e5e7eb89]">
		<div class="pt-5">
			<div class="flex justify-center items-center flex-col mx-auto">
				<img src={ripor} alt="logo-Betel" />
				<img class="pt-6 w-20" src={logoprofile} alt="personal" />
				<h3 class="pt-4 max-w-md px-2 text-xl font-bold text-center text-dark-text">
					{'user.first_names' + ' ' + 'user.last_names'}
				</h3>
				<h4 class="pt-1 text-base text-dark-text text-center mx-5">
					{'user.position'}
				</h4>
			</div>

			<hr class="hr_class my-6 mx-8" />

			<div
				class="w-4/6 px-1 space-y-4 my-6 flex flex-col text-secundary-text text-base font-medium mx-auto top-0 left-0 sm:w-1/6 min-w-[220px]"
			>
				<a
					href="/u"
					class:active={$page.url.pathname == '/u'}
					class="hover:bg-[#292929] md:py-1.5 md:pl-2 md:rounded-lg"
				>
					<span class="flex flex-row gap-4 m-auto items-center">
						{#if $page.url.pathname === '/u'}
							<img class="w-7" src={HomeBlueIcon} alt="icon-home" />
						{:else}
							<img class="w-7" src={HomeGrayIcon} alt="icon-home" />
						{/if}
						<p class="whitespace-nowrap">Inicio</p>
					</span>
				</a>

				{#if canRegisterHours}
					<a
						href="/u/horas"
						class:active={$page.url.pathname.includes('horas')}
						class="hover:bg-[#292929] md:py-1.5 md:pl-2 md:rounded-lg"
					>
						<span class="flex flex-row gap-4 m-auto items-center">
							{#if $page.url.pathname.includes('horas')}
								<img class="w-7" src={HourBlueIcon} alt="icon-home" />
							{:else}
								<img class="w-7" src={HourGrayIcon} alt="icon-home" />
							{/if}
							<p class="whitespace-nowrap">Registrar mis horas</p>
						</span>
					</a>
				{/if}

				{#if canLimitHours}
					<a
						href="/u/admin"
						class:active={$page.url.pathname.includes('admin')}
						class="hover:bg-[#292929] md:py-1.5 md:pl-2 md:rounded-lg"
					>
						<span class="flex flex-row gap-4 m-auto items-center">
							{#if $page.url.pathname.includes('admin')}
								<img class="w-7" src={HourBlueIcon} alt="icon-home" />
							{:else}
								<img class="w-7" src={HourGrayIcon} alt="icon-home" />
							{/if}
							<span class="flex flex-row gap-4 items-center">
								<p class="whitespace-nowrap">Horas límites</p>
							</span>
						</span>
					</a>
				{/if}

				<hr class="hr_class" />

				<button
					on:click={() => (modalOpen = true)}
					on:keydown={() => (modalOpen = true)}
					class="cursor-pointer focus:text-red-betel hover:bg-[#292929] md:py-2 md:pl-2 md:rounded-lg"
					on:focus={() => (isCloseFocused = true)}
					on:blur={() => (isCloseFocused = false)}
				>
					<span class="flex flex-row gap-5 m-auto items-center">
						{#if isCloseFocused}
							<img class="w-6" src={CloseBlueIcon} alt="icon-home" />
						{:else}
							<img class="w-6" src={CloseGrayIcon} alt="icon-home" />
						{/if}
						<p class="whitespace-nowrap">Cerrar sesión</p>
					</span>
				</button>
			</div>
		</div>
	</aside>
</section>

<style>
	.active {
		color: theme('colors.red-betel');
	}

	.hr_class {
		border-color: rgba(247, 174, 174, 0.34);
	}

	@media screen and (max-width: 768px) {
		.cont {
			display: none;
		}
	}
</style>
