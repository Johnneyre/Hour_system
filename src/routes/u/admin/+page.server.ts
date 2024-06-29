
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
		const data = await request.formData()
		const deleteType = String(data.get('deleteType'))

		console.log(data)

		if (deleteType == 'tarea') {
			const nameTask = String(data.get('Nombre de la tarea'))
			const descripcion = String(data.get('descripcion'))
			const newTask = {
				name: nameTask,
				description: descripcion
			}
			const responseTask = await fastAxios.post('/tasks', newTask);
		} else {
			const username = String(data.get('username'))
			const password = String(data.get('password'))
			const fullName = String(data.get('fullName'))
			const C_I = Number(data.get('C_I'))
			const bithdate = String(data.get('bithdate'))
			const id_rol = Number(data.get('id_rol'))

			const bithdateFormat = new Date(bithdate);

			const newUser = {
				username: username,
				password: password,
				fullName: fullName,
				C_I: C_I,
				bithdate: bithdateFormat.toISOString(),
				position: "absolute",
				status: true,
				id_rol: id_rol
			}

			try {


				console.log(newUser);
				const responseTask = await fastAxios.post('/users', newUser);
			} catch (error) {
                console.log(error);
			}
		}

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
