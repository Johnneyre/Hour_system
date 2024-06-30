import fastAxios from '$lib/server/axios.js';

export const load = async (event) => {
	const [responseHours] = await Promise.all([
		fastAxios.get(`/hours/by-user/${event.locals.user?.id_user}`)
	]);

	const mapResponse = responseHours.data.reduce(
		(acc: any[], current: { task: { id_tasks: any }; hours: any }) => {
			const existingTask = acc.find((task) => task.id_tasks === current.task.id_tasks);
			if (existingTask) {
				existingTask.hours += current.hours;
			} else {
				acc.push({
					hours: current.hours,
					...current.task
				});
			}
			return acc;
		},
		[]
	);

	return { dedications: mapResponse, user: event.locals.user, tasks: responseHours.data };
};
