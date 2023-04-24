import { Errors, ErrorTitles } from "../Enums/Errors";
import { notification } from "antd";

export interface Short {
	key: string;
	id: number;
	name: string;
}

export interface User {
	key: string;
	id: number;
	nameRu: string;
	nameEn: string;
	login: string;
	role: { name: string; id: number };
	email: string;
}

export function GetPositions(token: string | null): Promise<Short[]> {
	return fetch("http://localhost:8000/api/SuperDictionary/GetPositions", {
		method: "GET",
		headers: { Accept: "*/*", Authorization: "Bearer " + token },
	})
		.then((response) => response.json())
		.then((data) => {
			(data as Short[]).forEach((el) =>
				Object.assign(el, { key: el.id.toString() })
			);
			return data as Short[];
		});
}

export async function CreatePosition(
	token: string | null,
	name: string,
	setActive: (active: boolean) => void
): Promise<void> {
	const response = await fetch(
		"http://localhost:8000/api/SuperDictionary/CreatePosition",
		{
			method: "POST",
			headers: {
				Accept: "*/*",
				Authorization: "Bearer " + token,
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify({
				name,
			}),
		}
	);

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

export async function UpdatePosition(
	token: string | null,
	name: string,
	setActive: (active: boolean) => void,
	id: number
): Promise<void> {
	const response = await fetch(
		"http://localhost:8000/api/SuperDictionary/UpdatePosition",
		{
			method: "PUT",
			headers: {
				Accept: "*/*",
				Authorization: "Bearer " + token,
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify({
				id,
				name,
			}),
		}
	);

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

export async function DeletePosition(
	token: string | null,
	id: string
): Promise<void> {
	const response = await fetch(
		"http://localhost:8000/api/SuperDictionary/DeletePosition",
		{
			method: "POST",
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

export function GetDepartments(token: string | null): Promise<Short[]> {
	return fetch("http://localhost:8000/api/SuperDictionary/GetDepartments", {
		method: "GET",
		headers: { Accept: "*/*", Authorization: "Bearer " + token },
	})
		.then((response) => response.json())
		.then((data) => {
			(data as Short[]).forEach((el) =>
				Object.assign(el, { key: el.id.toString() })
			);
			return data as Short[];
		});
}

export async function CreateDepartment(
	token: string | null,
	name: string,
	setActive: (active: boolean) => void
): Promise<void> {
	const response = await fetch(
		"http://localhost:8000/api/SuperDictionary/CreateDepartment",
		{
			method: "POST",
			headers: {
				Accept: "*/*",
				Authorization: "Bearer " + token,
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify({
				name,
			}),
		}
	);

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

export async function UpdateDepartment(
	token: string | null,
	name: string,
	setActive: (active: boolean) => void,
	id: number
): Promise<void> {
	const response = await fetch(
		"http://localhost:8000/api/SuperDictionary/UpdateDepartment",
		{
			method: "PUT",
			headers: {
				Accept: "*/*",
				Authorization: "Bearer " + token,
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify({
				id,
				name,
			}),
		}
	);

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

export async function DeleteDepartment(
	token: string | null,
	id: string
): Promise<void> {
	const response = await fetch(
		"http://localhost:8000/api/SuperDictionary/DeleteDepartment",
		{
			method: "POST",
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

export async function GetForeignLanguages(
	token: string | null
): Promise<Short[]> {
	return await fetch(
		"http://localhost:8000/api/SuperDictionary/GetForeignLanguages",
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
		});
}

export async function CreateForeignLanguage(
	token: string | null,
	name: string,
	setActive: (active: boolean) => void
): Promise<void> {
	const response = await fetch(
		"http://localhost:8000/api/SuperDictionary/CreateForeignLanguage",
		{
			method: "POST",
			headers: {
				Accept: "*/*",
				Authorization: "Bearer " + token,
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify({
				name,
			}),
		}
	);

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

export async function UpdateForeignLanguage(
	token: string | null,
	name: string,
	setActive: (active: boolean) => void,
	id: number
): Promise<void> {
	const response = await fetch(
		"http://localhost:8000/api/SuperDictionary/UpdateForeignLanguage",
		{
			method: "PUT",
			headers: {
				Accept: "*/*",
				Authorization: "Bearer " + token,
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify({
				id,
				name,
			}),
		}
	);

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

export async function DeleteForeignLanguage(
	token: string | null,
	id: string
): Promise<void> {
	const response = await fetch(
		"http://localhost:8000/api/SuperDictionary/DeleteForeignLanguage",
		{
			method: "POST",
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

export async function GetProgrammingLanguages(
	token: string | null
): Promise<Short[]> {
	return await fetch(
		"http://localhost:8000/api/SuperDictionary/GetProgrammingLanguages",
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
		});
}

export async function CreateProgrammingLanguage(
	token: string | null,
	name: string,
	setActive: (active: boolean) => void
): Promise<void> {
	const response = await fetch(
		"http://localhost:8000/api/SuperDictionary/CreateProgrammingLanguage",
		{
			method: "POST",
			headers: {
				Accept: "*/*",
				Authorization: "Bearer " + token,
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify({
				name,
			}),
		}
	);

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

export async function UpdateProgrammingLanguage(
	token: string | null,
	name: string,
	setActive: (active: boolean) => void,
	id: number
): Promise<void> {
	const response = await fetch(
		"http://localhost:8000/api/SuperDictionary/UpdateProgrammingLanguage",
		{
			method: "PUT",
			headers: {
				Accept: "*/*",
				Authorization: "Bearer " + token,
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify({
				id,
				name,
			}),
		}
	);

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

export async function DeleteProgrammingLanguage(
	token: string | null,
	id: string
): Promise<void> {
	const response = await fetch(
		"http://localhost:8000/api/SuperDictionary/DeleteProgrammingLanguage",
		{
			method: "POST",
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

export function GetUsers(token: string): Promise<User[]> {
	return fetch("http://localhost:8000/api/Employee/GetAllUsers", {
		method: "GET",
		headers: { Accept: "*/*", Authorization: "Bearer " + token },
	})
		.then((response) => response.json())
		.then((data) => {
			(data as User[]).forEach((el) =>
				Object.assign(el, { key: el.id.toString() })
			);
			return data as User[];
		});
}

export function GetRoles(token: string | null): Promise<Short[]> {
	return fetch("http://localhost:8000/api/Role/GetRoles", {
		method: "GET",
		headers: { Accept: "*/*", Authorization: "Bearer " + token },
	})
		.then((response) => response.json())
		.then((data) => {
			(data as Short[]).forEach((el) =>
				Object.assign(el, { key: el.id.toString() })
			);
			return data as Short[];
		});
}

export async function UpdateUser(
	token: string | null,
	formValues: any,
	setActive: (active: boolean) => void,
	id: number
): Promise<void> {
	console.log(formValues);
	console.log(id);
	const response = await fetch(
		"http://localhost:8000/api/Employee/UpdateUser",
		{
			method: "PUT",
			headers: {
				Accept: "*/*",
				Authorization: "Bearer " + token,
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify({
				id,
				role: formValues.role,
				email: formValues.email,
				password:
					formValues.password !== "" ? formValues.password : null,
			}),
		}
	);

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
