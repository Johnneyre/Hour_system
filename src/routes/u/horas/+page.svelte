<script lang="ts">
	import CardsRegister from '$lib/components/cards-register.svelte';
	import GoPlus from '$lib/assets/GoPlus.svg';
	import type { ActionData, PageData } from './$types.js';
	import RegistrarHora from '$lib/components/RegistrarHora.svelte';
	import { toast } from '../../../store/toast.js';
	import InlineCalendar from '$lib/svelte-calendar/components/InlineCalendar.svelte';
	import dayjs from 'dayjs';
	import 'dayjs/locale/es';
	import 'dayjs/plugin/updateLocale';
	import updateLocale from 'dayjs/plugin/updateLocale';
	import { meses } from '$lib/utils/meses.js';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { ArrowLeft, Icon } from 'svelte-hero-icons';
	import EditarHora from '$lib/components/EditarHora.svelte';
	import AlertInformativo from '$lib/components/Alert-informativo.svelte';

	export let data: PageData;
	export let form: ActionData;
	console.log(data);

	let newData: any;
	let store: any;
	let continuar = false;

	//show modal registrar hora
	let show = false;
	let showModal = false;
	let selected = false;
	let dayBlocked = false;
	let claseContenedor = 'container__dia__seleccionado';

	let showEm = '';
	let width = 0;
	let messageAlertInfoCreateSoli = [
		'Has superado el tiempo límite para reportar tus actividades de este día.',
		'Si crees que hay un error o tuviste una novedad relacionada con el reporte de horas, crea la solicitud correspondiente.'
	];

	dayjs.extend(updateLocale);
	dayjs.updateLocale('es', {
		months: [
			'Enero',
			'Febrero',
			'Marzo',
			'Abril',
			'Mayo',
			'Junio',
			'Julio',
			'Agosto',
			'Septiembre',
			'Octubre',
			'Noviembre',
			'Diciembre'
		]
	});

	dayjs.locale('es');

	onMount(() => {
		$store.selected = dayjs(data.date).toDate();
		checkRegistros();
	});

	function checkRegistros() {
		if (Array.isArray(data.reports)) {
			filteredReports = data.reports.filter((report) =>
				dayjs($store?.selected).isSame(report.date, 'days')
			);
		}
	}

	function cambiarClase() {
		claseContenedor =
			claseContenedor === 'container__dia__seleccionado'
				? filteredReports.length > 0 && isDateBlocked($store?.selected)
					? 'container__dia__seleccionado__extendido__bloqueado'
					: 'container__dia__seleccionado__extendido'
				: 'container__dia__seleccionado';
	}

	$: $store?.selected !== selected ? (claseContenedor = 'container__dia__seleccionado') : null;

	$: claseContenedor = showModal ? 'container__dia__bloqueado' : 'container__dia__seleccionado';

	function isDateBlocked(date: Date) {
		const today = dayjs();
		const fourteenDaysAgo = today.subtract(14, 'day');

		if (data.daysBlockedAvailable) {
			return false;
		}

		return dayjs(date).isSame(fourteenDaysAgo, 'day') || dayjs(date).isBefore(fourteenDaysAgo);
	}

	$: if (isDateBlocked($store?.selected) && $store?.selected !== selected) {
		showModal = true;

		selected = $store?.selected;
	} else {
		showModal = false;
	}

	$: if (isDateBlocked($store?.selected)) {
		dayBlocked = true;
	} else {
		dayBlocked = false;
	}

	//toas fot delete hora
	$: if (form?.type == 'delete') {
		if (form?.success) {
			toast.success('Tu registro de horas ha sido eliminado con éxito.');
		} else {
			toast.error(
				'Ha ocurrido un error al intentar registrar las horas. Por favor intente nuevamente.'
			);
		}
	}
	// $: if (browser && data?.mes != meses[dayjs($store?.selected).format('M')]) {
	//   goto(`?date=${dayjs($store?.selected).format('MM/DD/YYYY')}`, {
	//     invalidateAll: true
	//   })

	// } else if (browser) {
	// goto(`?date=${dayjs($store?.selected).format('MM/DD/YYYY')}`)
	// }

	//set day to date form backend
	// let date=dayjs(data.date)

	// $:date=dayjs(($store?.selected))
	let filteredReports: any = [];

	$: if (Array.isArray(data.reports)) {
		filteredReports = data.reports.filter((report) =>
			dayjs($store?.selected).isSame(report.date, 'days')
		);
	}
</script>

{#if $store?.selected}
	<RegistrarHora
		bind:show
		bind:date={$store.selected}
		projects={data.projects}
		tasks={data.tasks}
		reports={data.reports}
	/>
{/if}

<main class="flex flex-col w-full min-h-full overflow-x-hidden overflow-y-scroll">
	<div class="flex flex-row container_principal">
		<div
			bind:offsetWidth={width}
			class="block {continuar
				? 'overflow-hidden w-0'
				: 'w-full'} md:w-4/12 md:mx-10 transition-all duration-200 pb-16 md:pb-0 flex flex-col container__1"
		>
			<h1 class="text-3xl leading-9 pt-12 font-bold text-dark-text px-6 w-full mb-4">
				Selecciona un día
			</h1>
			<InlineCalendar
				bind:festivos={data.festivos}
				bind:marks={data.reports}
				bind:store
				theme={{
					calendar: {
						shadow: '0',
						width: width + 'px',
						colors: {
							border: '0',
							background: {
								highlight: '#FF461E',
								festivity: '#DADCEE'
							}
						},
						font: {
							regular: '1rem'
						}
					}
				}}
				bind:daysBlockedAvailable={data.daysBlockedAvailable}
			/>

			<section class="transition-all flex flex-col h-full bg-white {claseContenedor}">
				<div class="w-full">
					<div class="flex flex-row flex-wrap justify-between items-center pb-3 md:mx-3">
						<div class="flex items-center justify-between mr-auto w-full">
							<p class="text-lg text-black-linktic ml-[16px] mt-[16px] mb-[16px]">
								{dayjs($store?.selected).format('D [de] MMMM [de] YYYY')}
							</p>
							{#if filteredReports.length > 0}
								<button on:click={cambiarClase}>
									<svg
										class="mr-[24px] mt-[10px]"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<g clip-path="url(#clip0_2103_1040)">
											<path
												d="M7.41 8.59L12 13.17L16.59 8.59L18 10L12 16L6 10L7.41 8.59Z"
												fill="#B6B7C3"
											/>
										</g>
										<defs>
											<clipPath id="clip0_2103_1040">
												<rect width="24" height="24" fill="white" />
											</clipPath>
										</defs>
									</svg>
								</button>
							{:else}
								<svg
									class="mr-[24px] mt-[10px]"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<g clip-path="url(#clip0_2103_1040)">
										<path
											d="M7.41 8.59L12 13.17L16.59 8.59L18 10L12 16L6 10L7.41 8.59Z"
											fill="#B6B7C3"
										/>
									</g>
									<defs>
										<clipPath id="clip0_2103_1040">
											<rect width="24" height="24" fill="white" />
										</clipPath>
									</defs>
								</svg>
							{/if}
						</div>
						<div class="linea_separadora"></div>

						<!--INSERTAR CARDS-->
						{#if filteredReports.length > 0}
							<div
								class="flex flex-col overflow-auto mb-[20px] h-[180px] container__cards_register"
							>
								{#each filteredReports as report}
									<CardsRegister bind:report bind:showEm bind:dayBlocked />
									{#if showEm == report.id.toString()}
										<EditarHora
											{isDateBlocked}
											bind:dayBlocked
											bind:show={showEm}
											bind:report
											projects={data?.projects}
											tasks={data.tasks}
											reports={data?.reports}
											user={data?.user}
										/>
									{/if}
								{/each}
							</div>
						{/if}

						{#if $store?.selected}
							{#if showModal || isDateBlocked($store?.selected)}
								<div
									class="flex flex-row flex-wrap justify-between items-center md:mx-3 overflow-aut"
								>
									<AlertInformativo message={messageAlertInfoCreateSoli} btnSolicitud={true} theme={false}/>
								</div>
							{/if}
						{/if}

						{#if dayjs($store?.selected).isBefore(dayjs()) && dayjs($store?.selected).isAfter(dayjs('2022-07-01')) && !isDateBlocked($store?.selected)}
							<div class="flex flex-col items-center w-full">
								{#if filteredReports.length === 0}
									<p class="text-center text-[#6E6E78] mt-5 mr-10 ml-10 mb-5">
										No has registrado actividades laboral en este día
									</p>
								{/if}

								<button
									on:click={() => {
										show = !show;
									}}
									class="bg-red-betel hover:bg-[#ff471e73]"
									style="width:161px;
               height:40px;
               padding: 10px, 30px, 10px, 30px;
               border-radius: 10px;
               gap: 6px;"
								>
									<div class="icon-container flex justify-center items-center">
										<div class="container-icon w-4 h-4">
											<svg
												width="21"
												height="20"
												viewBox="0 0 21 20"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													d="M9.66666 14.1667H11.3333V10.8334H14.6667V9.16669H11.3333V5.83335H9.66666V9.16669H6.33332V10.8334H9.66666V14.1667ZM10.5 18.3334C9.34721 18.3334 8.26388 18.1146 7.24999 17.6771C6.2361 17.2396 5.35416 16.6459 4.60416 15.8959C3.85416 15.1459 3.26041 14.2639 2.82291 13.25C2.38541 12.2361 2.16666 11.1528 2.16666 10C2.16666 8.84724 2.38541 7.76391 2.82291 6.75002C3.26041 5.73613 3.85416 4.85419 4.60416 4.10419C5.35416 3.35419 6.2361 2.76044 7.24999 2.32294C8.26388 1.88544 9.34721 1.66669 10.5 1.66669C11.6528 1.66669 12.7361 1.88544 13.75 2.32294C14.7639 2.76044 15.6458 3.35419 16.3958 4.10419C17.1458 4.85419 17.7396 5.73613 18.1771 6.75002C18.6146 7.76391 18.8333 8.84724 18.8333 10C18.8333 11.1528 18.6146 12.2361 18.1771 13.25C17.7396 14.2639 17.1458 15.1459 16.3958 15.8959C15.6458 16.6459 14.7639 17.2396 13.75 17.6771C12.7361 18.1146 11.6528 18.3334 10.5 18.3334ZM10.5 16.6667C12.3611 16.6667 13.9375 16.0209 15.2292 14.7292C16.5208 13.4375 17.1667 11.8611 17.1667 10C17.1667 8.13891 16.5208 6.56252 15.2292 5.27085C13.9375 3.97919 12.3611 3.33335 10.5 3.33335C8.63888 3.33335 7.06249 3.97919 5.77082 5.27085C4.47916 6.56252 3.83332 8.13891 3.83332 10C3.83332 11.8611 4.47916 13.4375 5.77082 14.7292C7.06249 16.0209 8.63888 16.6667 10.5 16.6667Z"
													fill="white"
												/>
											</svg>
										</div>
										<p class="pl-4 text-base text-white font-semibold">Registrar</p>
									</div>
								</button>
							</div>
						{:else if !showModal && !isDateBlocked($store?.selected)}
							<AlertInformativo
								message="Aún no puedes reportar actividades en este día"
								btnSolicitud={false}
                theme={true}
							/>
						{/if}
					</div>
				</div>
			</section>

			<div
				class="mt-auto {showModal
					? 'container__leyenda__movile_bloqueado'
					: 'container__leyenda__movile'}"
			>
				<h2 class="text-sm text-dark-text">Leyenda</h2>
				<div class="flex my-4 items-center w-full text-secundary-text">
					<div class="text-xs flex flex-col m-[8px] gap-2 text-center items-center">
						<p class="text-secundary-text text-sm inline-flex w-[30px] justify-center">1</p>
						Día no hábil
					</div>
					<div class="text-xs flex flex-col m-[8px] gap-2 text-center items-center">
						<p class="text-sm w-[30px] flex flex-col items-center justify-center">
							1
							<sub class="w-[8px] h-[8px] rounded-full bg-red-betel mx-auto block" />
						</p>
						Día con registro
					</div>
					<div class="flex flex-col m-[8px] gap-2 items-center text-xs text-center">
						<div
							class="bg-red-betel w-[30px] h-[29px] rounded-full text-white flex justify-center items-center"
						>
							<p class="text-sm">1</p>
						</div>
						Día selecc.
					</div>
					<div class="flex flex-col m-[8px] gap-2 items-center text-xs text-center">
						<div
							class="bg-[#009fff] text-xl w-[30px] h-[29px] rounded-full flex justify-center items-center"
						>
							<p class="text-sm">1</p>
						</div>
						Día festivo
					</div>
					<div class="text-xs flex flex-col m-[8px] gap-2 text-center items-center">
						<p class="line-through text-sm w-[30px] flex flex-col items-center justify-center">
							1
							<sub class="w-[8px] h-[8px] rounded-full bg-red-betel mx-auto block" />
						</p>
						Día bloq.
					</div>
				</div>
			</div>

			<!-------------------------------------------------------------->

			<div class="mt-auto container__leyenda">
				<h2 class="text-xl text-dark-text">Leyenda</h2>
				<div class="grid grid-cols-2 my-4 gap-4 text-secundary-text">
					<div>
						<p class="text-secundary-text text-xl inline-flex w-10 justify-center">1</p>
						Día no hábil
					</div>
					<div class="flex">
						<p class=" text-xl w-10 flex flex-col items-center justify-center">
							1
							<sub class="w-3 h-3 min-w-3 min-h-3 rounded-full bg-red-betel mx-auto block" />
						</p>
						Día con horas registradas
					</div>
					<div class="flex gap-2 items-center">
						<div
							class="bg-red-betel text-xl w-10 h-10 rounded-full text-white flex justify-center items-center"
						>
							<p>1</p>
						</div>
						Día seleccionado
					</div>
					<div class="flex gap-2 items-center">
						<div
							class="bg-[#009fff] text-xl w-10 h-10 rounded-full flex justify-center items-center"
						>
							<p>1</p>
						</div>
						Día festivo
					</div>
				</div>
			</div>
		</div>

		<form
			bind:this={newData}
			method="post"
			action={`/u/horas?date=${dayjs($store?.selected).format('MM/DD/YYYY')}`}
		/>

		<section
			class="{continuar
				? 'w-full'
				: 'overflow-hidden w-0'} transition-all flex flex-col top-0 right-0 md:w-8/12 min-h-screen max-h-screen overflow-auto md:overflow-auto h-full bg-[#131314] border-l border-[#e5e7eb89] md:min-w-[220px] pb-16 md:pb-0 container__2"
		>
			<div class="px-4 md:px-16 w-full">
				<button
					class=" sm:hidden bg-blue-100 rounded-md p-2 mt-6"
					on:click|preventDefault={() => (continuar = false)}
				>
					<Icon src={ArrowLeft} class="w-5 h-5 " />
				</button>
				<h1 class="text-3xl w-auto max-w-xs leading-9 pt-6 font-bold text-white">
					Registra tus actividades laborales
				</h1>

				<div class="flex flex-row flex-wrap justify-between items-center pt-12 pb-3 md:mx-3">
					<div class="flex flex-col justify-start items-start mr-auto">
						<h4 class="font-bold pt-1 text-secundary-text">Día seleccionado:</h4>
						<p class="text-lg text-secundary-text">
							{dayjs($store?.selected).format('D [de] MMMM [de] YYYY')}
						</p>
					</div>

					{#if dayjs($store?.selected).isBefore(dayjs()) && dayjs($store?.selected).isAfter(dayjs('2022-07-01')) && !isDateBlocked($store?.selected)}
						<button
							on:click={() => {
								show = !show;
							}}
							class="bg-red-betel ml-auto md:mx-0 hover:bg-[#ff471e73] transition duration-1000 rounded-xl px-8 py-3"
						>
							<span class="icon-container flex justify-center gap-5 items-center">
								<div class="container-icon w-4 h-4">
									<img src={GoPlus} alt="plus" class="text-red-bete" />
								</div>
								<p class="pl-4 text-xl text-[#fff] font-semibold">Registrar</p>
							</span>
						</button>
					{:else if !showModal && !isDateBlocked($store?.selected)}
						<AlertInformativo
							message="Aún no puedes reportar actividades en este día"
							btnSolicitud={false}
              theme={true}
						/>
					{/if}
				</div>

				<!--INSERTAR CARDS-->
				<div class="flex flex-col">
					{#each filteredReports as report}
						<CardsRegister bind:report bind:showEm bind:dayBlocked />
						{#if showEm == report.id.toString()}
							<EditarHora
								{isDateBlocked}
								bind:dayBlocked
								bind:show={showEm}
								bind:report
								projects={data?.projects}
								tasks={data.tasks}
								reports={data?.reports}
								user={data?.user}
							/>
						{/if}
					{/each}
				</div>

				{#if $store?.selected}
					{#if showModal || isDateBlocked($store?.selected)}
						<div class="flex flex-row flex-wrap justify-between items-center md:mx-3">
							<AlertInformativo message={messageAlertInfoCreateSoli} btnSolicitud={true} theme={true}/>
						</div>
					{/if}
				{/if}
			</div>
		</section>
	</div>
</main>

<style>
	.container-icon {
		color: #ff461e;
	}

	@media screen and (max-width: 1140px) {
		.container_principal {
			flex-direction: column;
		}

		.container__1 {
			order: 2;
			width: 90%;
		}

		.container__2 {
			min-height: auto;
			width: 100%;
		}
	}

	@media screen and (max-width: 768px) {
		.container_principal {
			flex-direction: row;
		}

		.container__1 {
			width: 100%;
		}

		.container__2 {
			width: 0%;
		}

		.container__dia__seleccionado__extendido {
			width: 100%;
			position: absolute;
			bottom: 200px;
			height: 400px;
			border-top-left-radius: 8%;
			border-top-right-radius: 8%;
			background-color: #ffffff;
			border-bottom: 1px solid #dadcee;
			box-shadow: 0px -10px 25px 0px #d2d2d433;
			z-index: 10;
		}

		.container__dia__bloqueado {
			width: 100%;
			position: absolute;
			bottom: 200px;
			height: 350px;
			border-top-left-radius: 8%;
			border-top-right-radius: 8%;
			background-color: #ffffff;
			border-bottom: 1px solid #dadcee;
			box-shadow: 0px -10px 25px 0px #d2d2d433;
			overflow: hidden;
			z-index: 1;
		}

		.container__dia__seleccionado__extendido__bloqueado {
			width: 100%;
			position: absolute;
			bottom: 200px;
			height: 550px;
			border-top-left-radius: 8%;
			border-top-right-radius: 8%;
			background-color: #ffffff;
			border-bottom: 1px solid #dadcee;
			box-shadow: 0px -10px 25px 0px #d2d2d433;
			z-index: 10;
		}

		.container__dia__seleccionado {
			width: 100%;
			position: absolute;
			bottom: 165px;
			height: 190px;
			border-top-left-radius: 8%;
			border-top-right-radius: 8%;
			background-color: #ffffff;
			border-bottom: 1px solid #dadcee;
			box-shadow: 0px -10px 25px 0px #d2d2d433;
			overflow: hidden;
			z-index: 1;
		}

		.container__dia__seleccionado .container__cards_register {
			overflow: hidden;
		}

		.linea_separadora {
			width: 100%;
			border-bottom: 1px solid #dadcee;
		}

		.container__leyenda__movile {
			margin-left: 1rem;
			margin-top: 210px;
		}

		.container__leyenda__movile_bloqueado {
			margin-left: 1rem;
			margin-top: 360px;
		}

		.container__leyenda {
			display: none;
		}
	}

	@media screen and (min-width: 769px) {
		.container__dia__seleccionado {
			display: none;
		}
		.container__leyenda__movile {
			display: none;
		}

		.container__dia__seleccionado__extendido {
			display: none;
		}

		.container__dia__bloqueado {
			display: none;
		}

		.linea_separadora {
			display: none;
		}

		.container__leyenda__movile_bloqueado {
			display: none;
		}
	}
	/* shitty css DELETE */
</style>
