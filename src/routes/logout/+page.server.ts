import { redirect } from '@sveltejs/kit';

export const load = async ({ cookies }) => {
	cookies.delete('authToken', { path: '/' });
	redirect(302, '/login');
};
