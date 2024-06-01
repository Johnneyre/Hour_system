import { redirect } from '@sveltejs/kit';

export const load = async (event) => {
	const token = event.cookies.get('authToken');
	console.log(token);
	if (!token) {
		redirect(302, '/login');
	}
};
