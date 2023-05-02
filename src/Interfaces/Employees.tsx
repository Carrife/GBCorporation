export interface Employee {
	key: string;
	id: number;
	nameEn: string;
	nameRu: string;
	login: string;
	phone: string;
	status: string;
	email: string;
	department: string;
	position: string;
}

export interface EmployeeData {
	id: number;
	nameEn: string;
	surnameEn: string;
	patronymicRu: string;
	nameRu: string;
	surnameRu: string;
	login: string;
	phone: string;
	workPhone: string;
	status: { id: number; name: string };
	email: string;
	department: { id: number; name: string };
	position: { id: number; name: string };
	language: { id: number; name: string };
}