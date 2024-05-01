import { fail, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'
// import type { CreateReport, Project, ReportUpdate } from '$lib/interface'
import dayjs from 'dayjs'
import 'dayjs/locale/es'
// import { meses } from '$lib/utils/meses'

export const load: PageServerLoad = async ({ locals, url }) => {
  // const hasPermission = locals.userPermissions.some(
  //   item => item.permissions.name === 'Registrar Horas'
  // )

  // if (!hasPermission) {
  //   throw redirect(302, '/u')
  // }

  const queryDate = dayjs(url.searchParams.get('date'))

  let date =
    queryDate.isValid() && queryDate.isAfter(dayjs('2022-07-01'))
      ? queryDate
      : dayjs()

  const mes = date.format('M')
  const year = date.format('YYYY')

  // console.log(locals.user.id)

  let daysBlockedAvailable = false

  // const { data, error } = await locals.supabase
  //   .from('users_days_blocked')
  //   .select('*')
  //   .eq('personal_id', locals.user.id)

  // if (error) {
  //   console.log('🚀 ~ constload:PageServerLoad= ~ error:', error)
  // }

  // if (data && data.length > 0) {
  //   daysBlockedAvailable = data[0].state
  // }

  // const reports = (
  //   await locals.client.GET(
  //     `/reports?personal_id=${locals.user.id}&year=${year}&month=${mes}`
  //   )
  // ).data as unknown as ReportUpdate[]

  //   `&year=2023&month=2${locals.user.id}`)).data as unknown as Report[]``

  // const resprojects = async () =>
  //   (await locals.client.GET('/projects')).data as Project[]

  // let projects: Project[] = (await resprojects()).filter(x => !x.is_disabled)
  
  const tasks = [
    {
      id: 1,
      name: "Laburo"
    }
  ]

  const reports = [
    {
      id: 1,
      name: "Reports",
      date: 1729411200
    }
  ]

  const projects = [
    {
      id: 1,
      name: "Reports",
    }
  ]

  return {
    reports: reports,
    projects,
    // mes: meses[mes],
    tasks: tasks,
    date: date.format('MM/DD/YYYY'),
    festivos: [
      '2023-11-13',
      '2023-12-08',
      '2023-12-25',
      '2024-01-01',
      '2024-01-08',
      '2024-03-25',
      '2024-03-28',
      '2024-03-29',
      '2024-03-31',
      '2024-05-01',
      '2024-05-13',
      '2024-06-03',
      '2024-06-10',
      '2024-07-01',
      '2024-07-20',
      '2024-08-07',
      '2024-08-19',
      '2024-10-14',
      '2024-11-04',
      '2024-11-11',
      '2024-12-08',
      '2024-12-25'
    ],
    daysBlockedAvailable
  }
}
export const actions: Actions = {
  create: async ({ request, locals, locals: { user } }) => {
    // console.log("CREAR")
    // const formData = await request.formData()
    // const body = Object.fromEntries(formData) as unknown as CreateReport
    // body.tasks = (formData.getAll('tasks') as unknown as string[]).map(rt =>
    //   JSON.parse(rt)
    // )
    // console.log("here", body)

    // console.log(body)

    // if (
    //   JSON.parse(body.totalhoursPerUser) &&
    //   JSON.parse(body.hoursPerMonth) + JSON.parse(body.totalhours) >
    //     JSON.parse(body.totalhoursPerUser)
    // ) {
    //   return fail(400, { error: true, message: 'Ha ocurrido un error' })
    // }

    // const payload: CreateReport = {
    //   ...body,
    //   project_id: Number(body.project_id),
    //   personal_id: locals.user.id,
    //   hours: Number(body.hours)
    // }
    // delete payload.info

    // console.log(payload)

    // const CreateReport:CreateReport={
    // 	hours: 8,
    // 	date: '2023-05-18T00:00:00.000-05:00',
    // 	tasks: [0],

    //   }

    // const { data, ok, status } = await locals.client.POST(
    //   '/reports',
    //   payload,
    //   null,
    //   true
    // )

    // if (!ok) {
    //   if (status == 409) {
    //     return fail(409, {
    //       error: true,
    //       message:
    //         'Registro duplicado, no puedes reportar el mismo proyecto dos veces en un día'
    //     })
    //   }
    //   // console.log("not ok")
    //   return fail(400, { error: true, message: 'Ha ocurrido un error' })
    // }

    return {
      success: true,
      type: 'create',
      message: 'Hora guardada exitosamente'
    }
  },
  update: async ({ request, locals, locals: { user } }) => {
    // console.log("CREAR")
    // const formData = await request.formData()
    // const body = Object.fromEntries(formData) as unknown as ReportUpdate
    // body.tasks = (formData.getAll('tasks') as unknown as string[]).map(rt =>
    //   JSON.parse(rt)
    // )

    // const validacionDiaBloqueado = JSON.parse(body.dayBloked as any)

    // if (validacionDiaBloqueado) {
    //   console.log('Error! : No se puede editar una fecha bloqueada! 🛑')
    //   return fail(400, {
    //     error: true,
    //     message: 'Error! : No se puede editar una fecha bloqueada! 🛑'
    //   })
    // }

    // console.log("here", body)

    // if (
    //   JSON.parse(body.totalhoursPerUser) &&
    //   JSON.parse(body.hoursPerMonth) -
    //     JSON.parse(body.oldTasksHours) +
    //     JSON.parse(body.totalhours) >
    //     JSON.parse(body.totalhoursPerUser)
    // ) {
    //   return fail(400, { error: true, message: 'Ha ocurrido un error' })
    // }

    // console.log(body)

    // const payload: CreateReport = {
    //   date: body.date,
    //   notes: body?.notes,
    //   project_id: Number(body.project_id),
    //   personal_id: locals.user.id,
    //   hours: Number(body.hours),
    //   tasks: body.tasks
    // }

    // console.log(payload)

    // const CreateReport:CreateReport={
    // 	hours: 8,
    // 	date: '2023-05-18T00:00:00.000-05:00',
    // 	tasks: [0],

    //   }

    // const { data, ok } = await locals.client.PUT(
    //   '/reports/' + body.id,
    //   payload,
    //   null,
    //   true
    // )

    // if (!ok) {
    //   // console.log("not ok")
    //   return fail(400, { error: true, message: 'Ha ocurrido un error' })
    // }

    return {
      success: true,
      type: 'create',
      message: 'Hora guardada exitosamente'
    }
  },
  delete: async ({ request, locals, locals: { user }, url }) => {
    const body = Object.fromEntries(await request.formData())

    // if (body.personal_id == user.id) {
    //   const { data, ok } = await locals.client.DELETE('/reports/' + body.id)
    //   if (!ok) {
    //     // console.log("not ok")
    //     return fail(400, { error: true, message: 'Ha ocurrido un error' })
    //   }
    // }

    return { success: true, type: 'delete', message: 'Eliminado exitosamente' }
  }
}
