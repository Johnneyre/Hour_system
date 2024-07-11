import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import fastAxios from '$lib/server/axios';
import { meses } from '$lib/utils/meses';
import { type body } from '$lib/interface';

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
		user: locals.user,
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
	create: async ({ request, locals: { user } }) => {
		const formData = await request.formData();
		const body = Object.fromEntries(formData) as unknown as body;

		body.tasks = (formData.getAll('tasks') as unknown as string[]).map((rt) => JSON.parse(rt));

		try {
			const bodyForm = {
				hours: body.hours,
				date: body.date,
				description: body.description,
				id_user: user?.id_user,
				id_tasks: body.tasks[0].id_tasks
			};
			await fastAxios.post('/hours', bodyForm);
		} catch (error) {
			console.log(error);
			return fail(400, { error: true, message: 'Ha ocurrido un error' });
		}

		return {
			success: true,
			type: 'create',
			message: 'Hora guardada exitosamente'
		};
	},

	update: async ({ request, locals, locals: { user } }) => {
		const formData = await request.formData();
		const body = Object.fromEntries(formData) as unknown as body;

		body.tasks = (formData.getAll('tasks') as unknown as string[]).map((rt) => JSON.parse(rt));

		const validacionDiaBloqueado = JSON.parse(body.dayBloked as any);

		if (validacionDiaBloqueado) {
			console.log('Error! : No se puede editar una fecha bloqueada! 🛑');
			return fail(400, {
				error: true,
				message: 'Error! : No se puede editar una fecha bloqueada! 🛑'
			});
		}

		try {
			const bodyForm = {
				hours: body.hours,
				date: body.date,
				description: body.description,
				id_user: user?.id_user,
				id_tasks: body.tasks[0].id_tasks
			};

			await fastAxios.put(`/hours/${body.id}`, bodyForm);
		} catch (error) {
			console.log(error);
			return fail(400, { error: true, message: 'Ha ocurrido un error' });
		}

		return {
			success: true,
			type: 'updated',
			message: 'Hora guardada exitosamente'
		};
	},
	delete: async ({ request }) => {
		const body = await request.formData();
		const id_hour = Number(body.get('id'));

		try {
			await fastAxios.delete(`/hours/${id_hour}`);
		} catch (error) {
			console.log(error);
			return fail(400, { error: true, message: 'Ha ocurrido un error' });
		}

		return { success: true, type: 'delete', message: 'Eliminado exitosamente' };
	}
};
