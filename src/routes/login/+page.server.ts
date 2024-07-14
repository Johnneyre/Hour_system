import fastAxios from '$lib/server/axios';
import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';

export const actions = {
	login: async ({ request, cookies }) => {
		const data = await request.formData();
		const user = String(data.get('user'));
		const password = String(data.get('password'));

		const formData = new FormData();
		formData.append('username', user);
		formData.append('password', password);

		try {
			const response = await fastAxios.post('/token', formData);
			if (response.status === 200) {
				cookies.set('authToken', response.data.access_token, { path: '/' , maxAge: 3600});
			}
		} catch (error) {
			console.log(error);
			const errorMessage = (error as { message: string }).message;
			if (errorMessage.includes('401')) {
				return fail(401, {
					message: 'Usuario o contraseña incorrecto',
					success: true
				});
			} else {
				return fail(400, {
					message: 'Ha ocurrido un error',
					success: true
				});
			}
		}

		return { success: false };
	}
} satisfies Actions;
