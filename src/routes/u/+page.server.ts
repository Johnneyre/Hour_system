export const load = async () => {
	const banners = [
		{
			id: 11,
			created_at: '2024-02-09T17:57:44.861018+00:00',
			name: 'mainBannerWeb',
			url: '"https://slighanusuaanmqcjpuu.supabase.co/storage/v1/object/public/banners/mainBannerWeb"',
			link: '',
			available: true
		},
		{
			id: 12,
			created_at: '2024-02-09T17:57:44.861018+00:00',
			name: 'mainBannerMobile',
			url: '"https://slighanusuaanmqcjpuu.supabase.co/storage/v1/object/public/banners/mainBannerMobile"',
			link: '',
			available: true
		}
	];

	const users = {
		id: 12,
		email: 'johnneyre.zambrano@linktic.com',
		birthdate: '2023-09-22',
		department_id: 0,
		dni: '12345',
		document_type: 'string',
		first_names: 'string',
		last_names: 'string',
		phone: 'string',
		cellphone: 'string',
		company: 'Linktic',
		entry_date: 'string',
		country: 'string',
		city: 'string',
		status: 'string',
		ticket_number: 'string',
		position: 'string',
		contract_position: 'string',
		allowed_hours: 78,
		edited_at: '2024-01-29 09:24:44',
		created_at: '2023-09-22 13:35:24',
		dni_id: 'string12345',
		contract_type: 'string',
		department: { id: 0, name: 'NO ASIGNADO' },
		tasks: [
			{
				id: 509,
				name: 'Elaboración de informes, Actas u oficios.',
				task_group_id: 0
			},
			{
				id: 684,
				name: 'string',
				task_group_id: 0
			},
			{
				id: 685,
				name: 'string',
				task_group_id: 0
			}
		],
		task_group: [{ id: 0, name: 'DEFAULT' }],
		projects: [
			{
				id: 3,
				name: 'HICOME',
				manager_id: null,
				cost_center: '146',
				description: null
			}
		],
		manager_projects: [
			{
				id: 3,
				manager_id: 12,
				cost_center: '146',
				description: null,
				project_name: 'HICOME'
			}
		]
	};

	const dedications = [
		{
			project_name: 'PROYECTO POSITIVA SGDEA - 3T',
			project_cost_center: '001',
			percentage_dedication: 80,
			project_hours: 80
		},
		{
			project_name: 'PROYECTO MINEGOS',
			project_cost_center: '205',
			percentage_dedication: 80,
			project_hours: 80
		}
	];

	return { banners, dedications, users };
};
