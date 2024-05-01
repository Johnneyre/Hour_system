<script lang="ts">
	import IconPerson from '$lib/assets/icono-person.svg';
	export let dedication: any;
</script>

<div
	class="border p-3 border-gray-lines rounded-xl rounded-tr-cardxl rounded-bl-3xl w-full max-w-xs mx-auto"
>
	<img src={IconPerson} alt="cards" />
	<p class="pt-2 text-dark-text">
		{dedication?.project_cost_center} - {dedication?.project_name}
	</p>
	<h1 class="text-3xl font-bold text-dark-text">
		{Math.round((dedication?.percentage_dedication + Number.EPSILON) * 100) / 100} %
	</h1>
	<h2 class="text-md font-semibold text-dark-text">
		{dedication.project_hours} Horas
	</h2>
</div>
