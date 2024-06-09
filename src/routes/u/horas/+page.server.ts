import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import fastAxios from '$lib/server/axios';
import { meses } from '$lib/utils/meses';

export const load = async ({ locals, url }) => {
	const queryDate = dayjs(url.searchParams.get('date'));

	let date = queryDate.isValid() && queryDate.isAfter(dayjs('2022-07-01')) ? queryDate : dayjs();

	const [responseReport, responseTasks] = await Promise.all([
		fastAxios.get(`/hours/by-user/${locals.user?.id_user}`),
		fastAxios.get('/tasks')
	]);

	const mes = date.format('M');
	let daysBlockedAvailable = false;

	return {
		reports: responseReport.data,
		mes: meses[mes],
		tasks: responseTasks.data,
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
	};
};

export const actions: Actions = {
	create: async ({ request, locals, locals: { user } }) => {
		const formData = await request.formData();
		const body = Object.fromEntries(formData) as unknown;
		console.log(body);

		console.log(JSON.parse(body.hoursPerMonth));
		body.tasks = (formData.getAll('tasks') as unknown as string[]).map((rt) => JSON.parse(rt));
		console.log(body.tasks);

		console.log(body.tasks[0].id_tasks);

		console.log(user?.id_user);

		const bodyForm = {
			hours: body.hours,
			date: body.date,
			description: body.description,
			id_user: user?.id_user,
			id_tasks: body.tasks[0].id_tasks
		};

		console.log(bodyForm);

		const response = await fastAxios.post('/hours', bodyForm);

		console.log(response);
		console.log(response.data);

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
		};
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
		};
	},
	delete: async ({ request, locals, locals: { user }, url }) => {
		const body = Object.fromEntries(await request.formData());

		// if (body.personal_id == user.id) {
		//   const { data, ok } = await locals.client.DELETE('/reports/' + body.id)
		//   if (!ok) {
		//     // console.log("not ok")
		//     return fail(400, { error: true, message: 'Ha ocurrido un error' })
		//   }
		// }

		return { success: true, type: 'delete', message: 'Eliminado exitosamente' };
	}
};
