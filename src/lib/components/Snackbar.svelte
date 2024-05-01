<script lang="ts">
  import { toast } from "../../store/toast";
  import { slide } from "svelte/transition";
  import { Icon, Check } from "svelte-hero-icons";

  $: info = {
    red: {
      bubble: "cross",
      bg: "bg-white",
      color: "rgb(153 27 27)",
      title: "Algo salio mal",
    },
    green: {
      bubble: "check",
      color: "rgb(22 101 52)",
      bg: "bg-white",
      title: "Excelente",
    },
    purple: {
      bubble: "Exclamation",
      color: "rgb(107 33 168)",
      bg: "bg-white",
      title: "Notificación",
    },
  }[$toast.type];

  let time: any;

  $: if ($toast.open) time = toast.time();
</script>

{#if $toast.open}
  <div class="flex justify-center transition-all">
    <dialog class={"top-8 z-50 bg-transparent block fixed"} transition:slide>
      <section
        class={"md:w-[500px] h-20 flex items-center justify-start gap-2 shadow-md px-6 rounded-2xl " +
          info?.bg}
        class:info={info?.bg}
      >
        <div>
          {#if $toast?.type == "purple"}
            <span
              class="flex items-center justify-center w-12 h-9 bg-purple-600 rounded-full"
            >
              <!-- <Icon src={Exclamation} class="text-white w-6 h-6" /> -->
            </span>
          {:else if $toast.type == "red"}
            <span
              class="flex items-center justify-center w-12 h-9 bg-red-600 rounded-full"
            >
              <!-- <Icon src={X} class="text-white w-6 h-6" /> -->
            </span>
          {:else if $toast.type == "green"}
            <span
              class="flex items-center justify-center w-12 h-9 bg-green-500 rounded-full"
            >
              <Icon src={Check} class="text-white w-6 h-6" />
            </span>
          {/if}
        <div class="self-center px-2 text-navy">
          <p class="font-medium">{$toast?.p}</p>
        </div>
      </section>
    </dialog>
  </div>
{/if}
