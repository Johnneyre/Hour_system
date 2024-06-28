<script lang="ts">
  import { Icon, XCircle } from "svelte-hero-icons";
  import { slide } from "svelte/transition";

  export let headerText = "";
  export let open: boolean;
  export let big: boolean = false
  export let color = "text-white";
  export let addedClasses = ""
  
</script>

{#if open}

  <div id="logOutModal" class="pitch-black w-screen h-screen  min-h-screen flex justify-center items-center z-90 top-0 left-0 overflow-hidden fixed bg-[#00000099] z-200">
    <dialog transition:slide class="shadow-xl rounded-lg bg-[#1e1f20] p-0 overflow-hidden {big ? 'w-[550px]' : 'w-auto max-w-md'} <md:(w-4/5) block {addedClasses}">
        
      <b class={(color ? color : color)}>{headerText}</b>
      <section class="p-2 ">
        <slot />
      </section>
   
    </dialog>
  </div>

{/if}

<style lang="scss" scoped>
</style>


<!--PARTE DE AFUERA-->