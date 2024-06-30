
import type { Actions } from './$types';
import 'dayjs/locale/es';
import fastAxios from '$lib/server/axios';

export const load = async () => {
	const responseUsers = await (fastAxios.get('/users?skip=0&limit=100'));
	const responseTask = await (fastAxios.get('/tasks?skip=0&limit=100'));

	return {
		Users: responseUsers.data,
		Task: responseTask.data
	};
};

export const actions: Actions = {
	getReport: async ({ request }) => {
		const data = await request.formData()
		console.log(data)

		const userId = String(data.get('usuario'))

		try {
			const responseHour = await fastAxios.get(`/hours/by-user/${userId}`)
			console.log(responseHour.data)
			if (responseHour.data == '') {
				return {
					hours: [],
				}
			} else {
				return {
					hours: responseHour.data,
				}
			}
		} catch (error) {
			console.log(error)
		}


	},
	createTask: async ({ request, locals, locals: { user } }) => {
		const data = await request.formData()

		console.log(data)

		const nameTask = String(data.get('Nombre de la tarea'))
		const descripcion = String(data.get('descripcion'))
		const newTask = {
			name: nameTask,
			description: descripcion
		}
		console.log(newTask)
		const responseTask = await fastAxios.post('/tasks', newTask);

	},

	createUser: async ({ request, locals, locals: { user } }) => {
		const data = await request.formData()

		function formatFecha(fecha: any) {
			console.log(fecha)
			if (fecha) {
				const [day, month, year] = fecha.split('-');
				const fechaOrdenada = `${year}/${month.padStart(2, '0')}/${day.padStart(2, '0')}`;

				const fechaObjeto = new Date(fechaOrdenada);
				console.log(fechaObjeto.toISOString());

				return fechaObjeto.toISOString();
			} else {
				return ''
			}
		}

		console.log(data)

		const username = data.get('username')
		const password = data.get('password')
		const fullName = data.get('fullName')
		const C_I = data.get('C_I')
		const bithdate = data.get('bithdate')
		const id_rol = data.get('rol')

		const newUser = {
			"username": username,
			"password": password,
			"fullName": fullName,
			"C_I": Number(C_I),
			"bithdate": formatFecha(bithdate),
			"position": "absolute",
			"status": true,
			"id_rol": Number(id_rol)
		}

		try {
			console.log(newUser);
			const responseUser = await fastAxios.post("/users", newUser);
		} catch (error) {
			console.log(error);
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
