import type { AxiosInstance } from 'axios';

interface User {
	id: string;
	email: string;
}

interface Session {
	user: User;
}

declare global {
	declare namespace App {
		interface Locals {
			session: Session | null;
			client: AxiosInstance;
			user: User | null;
			sbuser: User;
			version: string;
			getSession(): Promise<Session | null>;
			userProfile: string;
			userPermissions: Array<any>;
		}
		interface PageData {
			session: Session | null;
		}
	}
}
