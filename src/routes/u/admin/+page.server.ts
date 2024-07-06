
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
		const userId = String(data.get('usuario'))

		try {
			const responseHour = await fastAxios.get(`/hours/by-user/${userId}`)
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

		const nameTask = String(data.get('taskName'))
		const descripcion = String(data.get('taskDescription'))
		const newTask = {
			name: nameTask,
			description: descripcion
		}
		const responseTask = await fastAxios.post('/tasks', newTask);
		return { responseCreate: responseTask.status, messageCreate: 'La tarea se a creado exitosamente'}

	},

	createUser: async ({ request, locals, locals: { user } }) => {
		const data = await request.formData()

		function formatFecha(fecha: any) {
			if (fecha) {
				const fechaObjeto = new Date(fecha);

				return fechaObjeto.toISOString();
			} else {
				return '';
			}
		}

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
			const responseUser = await fastAxios.post("/users", newUser);
			return { responseCreate: responseUser.status, messageCreate: 'El usuario se a creado exitosamente'}
		} catch (error) {
			console.log(error);
		}

	},

	updateTask: async ({ request, locals, locals: { user } }) => {
		const data = await request.formData()

		try {
			const taskId = Number(data.get('taskId'))
			const taskName = data.get('taskName')
			const taskDescription = data.get('taskDescription')

			const updateTask = {
				"name": taskName,
				"description": taskDescription
			}

			const responseEdit = await fastAxios.put(`/tasks/${taskId}`, updateTask);
			return { responseEdit: responseEdit.status, messageEdit: 'La tarea se a editado exitosamente'}
		} catch (error) {
			console.log(error)
		}

	},
	updateUser: async ({ request, locals, locals: { user } }) => {
		const data = await request.formData()

		try {
			const UserId = Number(data.get('UserId'))
			const username = data.get('username')
			const password = data.get('password')
			const fullName = data.get('fullName')
			const C_I = data.get('C_I')
			const bithdate = data.get('bithdate')
			const id_rol = data.get('rol')

			const updateUser = {
				"username": username,
				"password": password,
				"fullName": fullName,
				"C_I": C_I,
				"bithdate": bithdate,
				"status": true,
				"position": "absoluto",
				"id_rol": id_rol
			}

			const responseEdit = await fastAxios.put(`/users/${UserId}`, updateUser);
			return { responseEdit: responseEdit.status, messageEdit: 'El usuario se a actualizado exitosamente'}
		} catch (error) {
			console.log(error)
		}
	},
	delete: async ({ request, locals }) => {
		const data = await request.formData()

		const deleteType = String(data.get('deleteType'))
		const deleteId = String(data.get('deleteId'))

		if (deleteType == 'tarea') {
			const responseDeleteT = await (fastAxios.delete(`/tasks/${deleteId}`))
			return { returnDelete: responseDeleteT.status, messageDelete: 'La tarea se a eliminado exitosamente'}
		} else {
			const responseDeleteU = await (fastAxios.delete(`/users/${deleteId}`))
			return { returnDelete: responseDeleteU.status, messageDelete: 'El usuario se a eliminado exitosamente'}
		}
	}
};
