import { type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { redirect } from '@sveltejs/kit';
import fastAxios from '$lib/server/axios.js';

const getUser: Handle = async ({ event, resolve }) => {
	  console.log(event)
	return resolve(event);
};

const middleware: Handle = async ({ event, resolve }) => {
	// const unlogguedRoute = ['/login', '/', '/#'].some((x) => x == event.url.pathname);
	  console.log(event)

	// if (!unlogguedRoute && !event.locals.user) {
	// 	throw redirect(303, '/login');
	// }

	// if (unlogguedRoute && event.locals.user) {
	// 	throw redirect(303, '/u');
	// }
	return await resolve(event);
};

export const handle = sequence(getUser, middleware);
