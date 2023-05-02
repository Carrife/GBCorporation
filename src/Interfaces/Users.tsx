export interface User {
	key: string;
	id: number;
	nameRu: string;
	nameEn: string;
	login: string;
	role: { name: string; id: number };
	email: string;
}