
import type { Actions } from './$types';
import 'dayjs/locale/es';
import fastAxios from '$lib/server/axios';

export const load = async () => {
	const responseUsers = await (fastAxios.get('/users?skip=0&limit=100'));
	const responseTask = await (fastAxios.get('/tasks?skip=0&limit=100'));

	console.log(responseTask)

	return {
		Users: responseUsers.data,
		Task: responseTask.data
	};
};

export const actions: Actions = {
	create: async ({ request, locals, locals: { user } }) => {
		
	},
	update: async ({ request, locals, locals: { user } }) => {
		
		return {
			success: true,
			type: 'create',
			message: 'Hora guardada exitosamente'
		};
	},
	delete: async ({ request, locals }) => {
		const data = await request.formData()

		const deleteType = String(data.get('deleteType'))
		const deleteId = String(data.get('deleteId'))
		// console.log(body)
		if (deleteType == 'tarea') {
			console.log('Eliminar tarea');
			console.log(deleteId)
			const responseDeleteT = await (fastAxios.delete(`/tasks/${deleteId}`))
		} else {
			console.log('Eliminar usuario');
			console.log(deleteType)
			const responseDeleteU = await (fastAxios.delete(`/users/${deleteId}`))
		}

		return { success: true, type: 'delete', message: 'Eliminado exitosamente' };
	}
};
