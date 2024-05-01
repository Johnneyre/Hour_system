<script>
	export let dir = "left";
</script>

<span
	class="rounded-full bg-red-betel aspect-square w-11 flex items-center justify-center"
>
	<i class={dir} />
</span>

<style>
	i {
		display: inline-block;
		width: 10px;
		height: 10px;
		border-style: solid;
		border-color: white;
		border-width: 0;
		border-bottom-width: 3px;
		border-right-width: 3px;
		transform-origin: center center;
	}
	i.right {
		transform: translateX(-2px) rotate(-45deg);
	}
	i.left {
		transform: translateX(2px) rotate(135deg);
	}
</style>
