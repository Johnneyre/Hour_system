<script lang="ts">
	import banner from '$lib/assets/banner.jpg';

	let mainBannerWebUrl: string;
	let mainBannerMobileUrl: string;

	$: mainBannerWebUrl = banner;
	$: mainBannerMobileUrl = banner;
	$: linkMainBanner = banner;
</script>

<!--  BANNER DESKTOP-->
{#if linkMainBanner !== ''}
	<a class="w-auto p-1 pt-2 sm:p-7 hidden md:block" href={`${linkMainBanner}`} target="_blank">
		<img
			src={`${mainBannerWebUrl}?${new Date().getTime()}`}
			alt="banner"
			class="rounded-xl md:rounded-3xl w-full"
		/>
	</a>
{:else}
	<img
		src={`${mainBannerWebUrl}?${new Date().getTime()}`}
		alt="banner"
		class="rounded-xl md:rounded-3xl w-full hidden md:block"
	/>
{/if}

<!-- BANNER MOBILE -->
{#if linkMainBanner !== ''}
	<a class="w-auto p-1 pt-2 sm:p-7 block md:hidden" href={`${linkMainBanner}`} target="_blank">
		<img
			src={`${mainBannerMobileUrl}?${new Date().getTime()}`}
			alt="banner"
			class="rounded-xl md:rounded-3xl w-full overflow-x-scroll object-cover"
		/>
	</a>
{:else}
	<img
		src={`${mainBannerMobileUrl}?${new Date().getTime()}`}
		alt="banner"
		class="rounded-xl md:rounded-3xl w-full overflow-x-scroll object-cover md:hidden"
	/>
{/if}
