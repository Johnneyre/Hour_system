<script lang="ts">
  import { scale } from 'svelte/transition'

  export let showModal: boolean
</script>

{#if showModal}
  <!-- Backdrop -->
  <div class="fixed inset-0 bg-black bg-opacity-50 z-40"></div>

  <!-- Modal Section -->
  <section
    class="absolute flex justify-center items-center w-full h-full z-50"
    transition:scale={{ start: 0 }}
  >
    <!-- Modal Content -->
    <div
      class="absolute bg-gray-50 shadow-2xl rounded-2xl p-6 px-10 max-w-[37rem] h-fit flex flex-col text-red-600 text-center"
    >
      <!-- Close button -->
      <button
        class="absolute top-0 right-0 mt-2 mr-2 text-black text-xl font-bold"
        on:click={() => (showModal = false)}
      >
        <span class="material-symbols-outlined text-[#757095]"> close </span>
      </button>

      <h1 class="font-bold text-xl mb-2">¡UPS!</h1>
      <p class="text-left text-black">
        Tu petición supera el límite de horas que puedes reportar en este
        periodo de facturación, por favor ponte en contacto con el gerente del
        proyecto al que deseas reportar estas horas, puedes hacerlo dando clic
        aquí:
      </p>
      <!-- Rest of your code -->
      <div class="flex justify-around mt-5 text-white">
        <a
          class="p-2 bg-blue-linktic rounded-lg w-[40%] hover:bg-[#5DA0FE]"
          href="/u/solicitudes"
        >
          Solicitar autorización
        </a>
        <button
          class="p-2 bg-red-700 rounded-lg w-[40%] hover:bg-[#de2020]"
          on:click={() => (showModal = false)}
        >
          Cancelar
        </button>
      </div>
      <slot />
    </div>
  </section>
{/if}
