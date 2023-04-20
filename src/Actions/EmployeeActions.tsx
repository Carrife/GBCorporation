import { Errors, ErrorTitles } from "../Enums/Errors";
import { notification } from "antd";

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

export interface EmployeeTestData {
	key: string;
	title: string;
	testResult: string;
	date: string;
}

export function GetAllEmployee(token: string): Promise<Employee[]> {
	return fetch("http://localhost:8000/api/Employee/GetAll", {
		method: "GET",
		headers: { Accept: "*/*", Authorization: "Bearer " + token },
	})
		.then((response) => response.json())
		.then((data) => {
			(data as Employee[]).forEach((el) =>
				Object.assign(el, { key: el.id.toString() })
			);
			return data as Employee[];
		});
}

export async function GetEmployeeById(
	token: string | null,
	id: string
): Promise<EmployeeData> {
	return await fetch("http://localhost:8000/api/Employee/GetById", {
		method: "GET",
		headers: {
			Accept: "*/*",
			Authorization: "Bearer " + token,
			"Content-Type": "application/json",
			id,
		},
		credentials: "include",
	})
		.then((response) => response.json())
		.then((data) => {
			return data as EmployeeData;
		});
}

export async function CreateEmployee(
	token: string | null,
	formValues: any,
	setActive: (active: boolean) => void
): Promise<void> {
	const response = await fetch("http://localhost:8000/api/Employee/Create", {
		method: "POST",
		headers: {
			Accept: "*/*",
			Authorization: "Bearer " + token,
			"Content-Type": "application/json",
		},
		credentials: "include",
		body: JSON.stringify({
			NameRu: formValues.nameRu,
			SurnameRu: formValues.surnameRu,
			PatronymicRu: formValues.patronymicRu,
			NameEn: formValues.nameEn,
			SurnameEn: formValues.surnameEn,
			Login: formValues.login,
			Phone: formValues.phone,
			LanguageId: formValues.language,
			DepartmentId: formValues.department,
			PositionId: formValues.position,
		}),
	});

	if (!response.ok) {
		if (response.status !== undefined) {
			notification.error({
				message: ErrorTitles.ERROR,
				description: Errors[response.status],
			});
		} else {
			response.json().then((data) => {
				notification.error({
					message: ErrorTitles.ERROR,
					description: Errors[data["errorStatus"]],
				});
			});
		}
	} else {
		notification.success({
			message: ErrorTitles.SUCCESS,
			description: "",
		});

		setActive(false);
		window.location.reload();
	}
}

export async function UpdateEmployee(
	token: string | null,
	formValues: any,
	setActive: (active: boolean) => void,
	employeeId: number
): Promise<void> {
	const response = await fetch("http://localhost:8000/api/Employee/Update", {
		method: "PUT",
		headers: {
			Accept: "*/*",
			Authorization: "Bearer " + token,
			"Content-Type": "application/json",
		},
		credentials: "include",
		body: JSON.stringify({
			id: employeeId,
			NameRu: formValues.nameRu,
			SurnameRu: formValues.surnameRu,
			PatronymicRu: formValues.patronymicRu,
			NameEn: formValues.nameEn,
			SurnameEn: formValues.surnameEn,
			Phone: formValues.phone,
			WorkPhone: formValues.workPhone,
			LanguageId: formValues.language,
			DepartmentId: formValues.department,
			PositionId: formValues.position,
		}),
	});

	if (!response.ok) {
		if (response.status !== undefined) {
			notification.error({
				message: ErrorTitles.ERROR,
				description: Errors[response.status],
			});
		} else {
			response.json().then((data) => {
				notification.error({
					message: ErrorTitles.ERROR,
					description: Errors[data["errorStatus"]],
				});
			});
		}
	} else {
		notification.success({
			message: ErrorTitles.SUCCESS,
			description: "",
		});

		setActive(false);
		window.location.reload();
	}
}

export async function EmployeeFired(token: string, id: string): Promise<void> {
	const response = await fetch("http://localhost:8000/api/Employee/Fired", {
		method: "PUT",
		headers: {
			Accept: "*/*",
			Authorization: "Bearer " + token,
			"Content-Type": "application/json",
			id,
		},
		credentials: "include",
	});

	if (!response.ok) {
		if (response.status !== undefined) {
			notification.error({
				message: ErrorTitles.ERROR,
				description: Errors[response.status],
			});
		} else {
			response.json().then((data) => {
				notification.error({
					message: ErrorTitles.ERROR,
					description: Errors[data["errorStatus"]],
				});
			});
		}
	} else {
		notification.success({
			message: ErrorTitles.SUCCESS,
			description: "",
		});

		window.location.reload();
	}
}

export async function GetTestData(
	token: string | null,
	id: string
): Promise<EmployeeTestData[]> {
	return await fetch("http://localhost:8000/api/TestCompetencies/GetByUserId", {
		method: "GET",
		headers: {
			Accept: "*/*",
			Authorization: "Bearer " + token,
			"Content-Type": "application/json",
			id,
		},
		credentials: "include",
	})
		.then((response) => response.json())
		.then((data) => {
			return data as EmployeeTestData[];
		});
}
