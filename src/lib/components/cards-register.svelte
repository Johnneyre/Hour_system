<script lang="ts">
  import PencilIcon from '$lib/assets/icon-pencil.svg'
  import XIcon from '$lib/assets/icon-x.svg'
  import ModalDeleteRegister from './modalDeleteRegister.svelte'

  export let report: any
  export let dayBlocked: boolean

  let showDm = false
  export let showEm
  // $:// // console.log(fecha.horas, "inside card")
</script>

<!-- SE EXPORTAN A REGISTER-ACTIVITIES.SVELTE -->
{#if !dayBlocked}
  <ModalDeleteRegister bind:show={showDm} {report} />
{/if}
<!-- <EditarHora
      bind:show={showEm}
      {fecha}
      proyectos={data.proyectos}
      tareas={data.tareas}
      optionText={"detalleProyecto"}
  /> -->

<section
  class="flex flex-col justify-between items-center py-2 md:mx-0 w-auto container_register"
>
  <div
    class="card border border-border-cards rounded-2xl h-auto my-1 w-full mx-auto p-3 bg-card-gray container_card_register"
  >
    <h1 class="font-bold text-lg text-black-linktic">
      {report.hours} horas
    </h1>
    <span class="flex flex-row items-center justify-start">
      <!-- <p class="px-2 font-medium text-base text-black-linktic">{report.numeroProyecto}</p> -->
      <!-- <border class="border-l-2 border-gray-borders py-2 mx-2"></border> -->
      <p class="text-black-linktic text-base">
        {report.project?.cost_center} - {report.project?.name}
      </p>
      <div
        class="flex flex-col lg:flex-row justify-center pl-3 lg:px-0 items-center ml-auto"
      >
        <div
          on:click={() => (showEm = report.id)}
          on:keydown={() => (showEm = report.id)}
          class="w-4 md:w-6 cursor-pointer"
        >
          <img class="lg:-mx-5" src={PencilIcon} alt="icon-pencil" />
        </div>
        <div
          on:click={() => (showDm = !showDm)}
          on:keydown={() => (showDm = !showDm)}
          class="w-4 md:w-6 cursor-pointer"
        >
          <img class="lg:mx-0 pt-3 lg:pt-0" src={XIcon} alt="icon-x" />
        </div>
      </div>
    </span>

    <!-- <p class="text-black-linktic text-base">Diseño web - Daily</p> -->
  </div>
</section>

<!-- CARDS REGISTRO DE HORAS    -->

<!-- activo
  :
  "1"
  apellidos
  :
  "Wilderson Andres Gonzalez Barrios"
  area
  :
  "Marketing"
  birthdate
  :
  "string"
  cargo
  :
  "FABRICA"
  ciudad
  :
  "Bogota"
  contrato
  :
  "\"string\""
  date
  :
  "2023-03-28T00:55:59.000Z"
  dateID
  :
  "2732023"
  dateString
  :
  "2023-03-27T19:55:58-05:00"
  detalleProyecto
  :
  "204-GESTIÓN DE MARKETING"
  detalleid
  :
  "no"
  dia
  :
  "28"
  diaSemana
  :
  "Martes"
  email
  :
  "andres.gonzalez@linktic.com"
  empresa
  :
  "linktic"
  estado
  :
  "Activo"
  fechaIngreso
  :
  "string"
  fullname
  :
  "Wilderson Andres Gonzalez Barrios"
  gerenteArea
  :
  "c"
  gerenteProyecto
  :
  "MIGUEL GOMEZ"
  gerenteProyectoid
  :
  "miguel.gomez@linktic.com"
  gerente_de
  :
  "string"
  horas
  :
  4
  horas_planificadas
  :
  null
  id
  :
  "27320231637379204"
  mainArea
  :
  "string"
  mes
  :
  "Marzo"
  nombres
  :
  "Wilderson Andres Gonzalez Barrios"
  numeroProyecto
  :
  "204"
  otro1
  :
  "string"
  pais
  :
  "Colombia"
  personaid
  :
  "1637379"
  phone
  :
  "31111111"
  proyecto
  :
  "204-GESTIÓN DE MARKETING"
  tareas
  :
  "1"
  tipoDoc
  :
  "c"
  year
  :
  "2023" -->

<style>
  @media screen and (max-width: 768px) {
    .container_register {
      margin-left: 15px;
      margin-right: 15px;
    }

    .container_register .container_card_register {
      background-color: #ffffff;
      border: 1px solid #dadcee;
    }
  }
</style>
