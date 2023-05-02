import { ErrorTitles } from "../Enums/Errors";
import { notification } from "antd";
import { Short } from "../Interfaces/Short";
import { ErrorHandler } from "./ErrorHandler/ErrorHandler";
import { Employee, EmployeeData } from "../Interfaces/Employees";
import { EmployeeTestData } from "../Interfaces/Tests";
import fileDownload from "js-file-download";

export function GetAllEmployee(
	token: string,
	filterForm: any | null
): Promise<Employee[]> {
	var params = {
		nameRu: filterForm?.nameRu ?? "",
		surnameRu: filterForm?.surnameRu ?? "",
		patronymicRu: filterForm?.patronymicRu ?? "",
		nameEn: filterForm?.nameEn ?? "",
		surnameEn: filterForm?.surnameEn ?? "",
		login: filterForm?.login ?? "",
	};

	if (filterForm?.departmentIds) {
		Object.assign(params, { departmentIds: filterForm?.departmentIds });
	}

	if (filterForm?.positionIds) {
		Object.assign(params, { positionIds: filterForm?.positionIds });
	}

	if (filterForm?.statusIds) {
		Object.assign(params, { statusIds: filterForm?.statusIds });
	}

	return fetch(
		"http://localhost:8000/api/Employee/GetAll?" +
			new URLSearchParams(params).toString(),
		{
			method: "GET",
			headers: {
				Accept: "*/*",
				Authorization: "Bearer " + token,
				filterForm,
			},
		}
	)
		.then((response) => response.json())
		.then((data) => {
			(data as Employee[])?.forEach((el) =>
				Object.assign(el, { key: el.id.toString() })
			);
			return data as Employee[];
		})
		.catch((e) => {
			notification.warning({
				message: ErrorTitles.WARNING,
				description: "Something went wrong",
			});
			return new Promise<Employee[]>((reject) => {});
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
		})
		.catch((e) => {
			notification.warning({
				message: ErrorTitles.WARNING,
				description: "Something went wrong",
			});
			return new Promise<EmployeeData>((reject) => {});
		});
}

export function GetEmployeeStatuses(token: string | null): Promise<Short[]> {
	return fetch(
		"http://localhost:8000/api/SuperDictionary/GetEmployeeStatuses",
		{
			method: "GET",
			headers: { Accept: "*/*", Authorization: "Bearer " + token },
		}
	)
		.then((response) => response.json())
		.then((data) => {
			(data as Short[]).forEach((el) =>
				Object.assign(el, { key: el.id.toString() })
			);
			return data as Short[];
		})
		.catch((e) => {
			notification.warning({
				message: ErrorTitles.WARNING,
				description: "Something went wrong",
			});
			return new Promise<Short[]>((reject) => {});
		});
}

export async function CreateEmployee(
	token: string | null,
	formValues: any,
	setActive: (active: boolean) => void
): Promise<void> {
	try {
		const response = await fetch(
			"http://localhost:8000/api/Employee/Create",
			{
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
			}
		);

		if (!response.ok) {
			ErrorHandler(response);
		} else {
			notification.success({
				message: ErrorTitles.SUCCESS,
				description: "",
			});

			setActive(false);
			window.location.reload();
		}
	} catch (e) {
		notification.warning({
			message: ErrorTitles.WARNING,
			description: "Something went wrong",
		});
	}
}

export async function UpdateEmployee(
	token: string | null,
	formValues: any,
	setActive: (active: boolean) => void,
	employeeId: number
): Promise<void> {
	try {
		const response = await fetch(
			"http://localhost:8000/api/Employee/Update",
			{
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
			}
		);

		if (!response.ok) {
			ErrorHandler(response);
		} else {
			notification.success({
				message: ErrorTitles.SUCCESS,
				description: "",
			});

			setActive(false);
			window.location.reload();
		}
	} catch (e) {
		notification.warning({
			message: ErrorTitles.WARNING,
			description: "Something went wrong",
		});
	}
}

export async function EmployeeFired(token: string, id: string): Promise<void> {
	try {
		const response = await fetch(
			"http://localhost:8000/api/Employee/Fired",
			{
				method: "PUT",
				headers: {
					Accept: "*/*",
					Authorization: "Bearer " + token,
					"Content-Type": "application/json",
					id,
				},
				credentials: "include",
			}
		);

		if (!response.ok) {
			ErrorHandler(response);
		} else {
			notification.success({
				message: ErrorTitles.SUCCESS,
				description: "",
			});

			window.location.reload();
		}
	} catch (e) {
		notification.warning({
			message: ErrorTitles.WARNING,
			description: "Something went wrong",
		});
	}
}

export async function GetTestData(
	token: string | null,
	id: string
): Promise<EmployeeTestData[]> {
	return await fetch(
		"http://localhost:8000/api/TestCompetencies/GetByUserId",
		{
			method: "GET",
			headers: {
				Accept: "*/*",
				Authorization: "Bearer " + token,
				"Content-Type": "application/json",
				id,
			},
			credentials: "include",
		}
	)
		.then((response) => response.json())
		.then((data) => {
			var i = 0;
			(data as EmployeeTestData[])?.forEach((el) =>
				Object.assign(el, { key: (i++).toString() })
			);
			return data as EmployeeTestData[];
		})
		.catch((e) => {
			notification.warning({
				message: ErrorTitles.WARNING,
				description: "Something went wrong",
			});
			return new Promise<EmployeeTestData[]>((reject) => {});
		});
}

export async function GetEmployeeCV(
	token: string | null,
	id: string,
	login: string
): Promise<void> {
	try {
		const response = await fetch(
			"http://localhost:8000/api/Employee/GetCV",
			{
				method: "GET",
				headers: {
					Accept: "*/*",
					Authorization: "Bearer " + token,
					"Content-Type": "application/json",
					id,
				},
			}
		);

		if (!response.ok) {
			ErrorHandler(response);
		} else {
			notification.success({
				message: ErrorTitles.SUCCESS,
				description: "",
			});

			response.blob().then(
				res => fileDownload(res, `CV ${login}.docx`)
			);
		}
	} catch (e) {
		notification.warning({
			message: ErrorTitles.WARNING,
			description: "Something went wrong",
		});
	}
}
