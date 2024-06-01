import { type Handle } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import fastAxios from '$lib/server/axios.js';

const getUser = async (token: string): Promise<null> => {
	try {
		const response = await fastAxios.get('/users/me', {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
		if (response.status === 200) {
			return response.data;
		}
	} catch (error) {
		console.log(error);
	}
	return null;
};

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get('authToken');
	const unloggedRoute = ['/login', '/', '/#'].some((x) => x == event.url.pathname);

	if (event.url.pathname === '/' && !token) {
		redirect(303, '/login');
	}

	if (unloggedRoute && token) {
		redirect(303, '/u');
	}

	if (token) {
		const userInfo = await getUser(token);
		console.log(userInfo);
		event.locals.user = userInfo;
	}

	const response = await resolve(event);
	return response;
};
