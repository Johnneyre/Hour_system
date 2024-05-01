<script lang="ts">
  import Aside from '$lib/components/aside.svelte'
  import Footer from '$lib/components/footer.svelte'
  import ModalSignOff from '$lib/components/modal-SignOff.svelte'

  // export let data
  let modalOpen = false
</script>

<section class="flex flex-row w-full">
  <Aside
    bind:modalOpen
  />
  <slot />
</section>
<Footer bind:modalOpen/>

{#if modalOpen}
  <ModalSignOff bind:modalOpen />
{/if}

<style>
  :global(:root) {
    background-color: #131314;
  }
</style>