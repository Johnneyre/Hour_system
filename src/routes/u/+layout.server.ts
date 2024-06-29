import { redirect } from '@sveltejs/kit';

export const load = async (event) => {
	const token = event.cookies.get('authToken');
	if (!token) {
		redirect(302, '/login');
	}

	return event.locals.user
};
