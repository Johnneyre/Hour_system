<script lang="ts">
	interface bannerInterface {
		id: number;
		name: string;
		url: string;
	}

	export let banners: any;

	let cacheBuster = '';
	let mainBannerWebUrl: string;
	let mainBannerMobileUrl: string;

	$: mainBannerWebUrl =
		JSON.parse(banners?.find((banner: bannerInterface) => banner.name === 'mainBannerWeb')?.url) ||
		'URL not found';

	$: mainBannerMobileUrl =
		JSON.parse(
			banners?.find((banner: bannerInterface) => banner.name === 'mainBannerMobile')?.url +
				cacheBuster
		) || 'URL not found';

	$: linkMainBanner =
		banners?.find((banner: bannerInterface) => banner.name === 'mainBannerWeb')?.link || '';
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
