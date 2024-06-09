import type { AxiosInstance } from 'axios';

interface User {
	username: string;
	password: string;
	fullName: string;
	C_I: number;
	bithdate: date;
	position: string;
	status: boolean;
	id_rol: number;
	id_user: number;
	created_at: string;
	hashed_password: string;
	disabled: boolean;
}

interface Session {
	user: User;
}

declare global {
	declare namespace App {
		interface Locals {
			user: User | null;
			token: string;
		}
		interface PageData {
			user: User | null;
		}
	}
}
