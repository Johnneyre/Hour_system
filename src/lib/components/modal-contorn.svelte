<script>
  import { fade, slide } from "svelte/transition";
</script>

<!-- MODAL PADRE FIXED -->
<section
  transition:fade
  id="modal-outline"
  class="w-screen overflow-y-scroll h-screen flex justify-center items-center z-10 top-0 left-0 overflow-hidden fixed bg-black/30"
>
  <div
    class="shadow-xl rounded-lg bg-[#1e1f20] pt-20 px-10 max-w-sm md:max-w-md <md:(w-4/5) block"
  >
    <!-- Agregar el slot aquí -->
    <slot name="modal-DeleteRegister" />
    <slot name="modal-SignOff" />
    <slot name="modal-RegisterHours" />
  </div>
</section>

<!--  QUITAR SHADOW Y PONER OPACIDAD AL FONDO AL ABRIRLO -->
