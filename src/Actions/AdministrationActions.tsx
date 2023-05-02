import { ErrorTitles } from "../Enums/Errors";
import { notification } from "antd";
import { Short } from "../Interfaces/Short";
import { ErrorHandler } from "./ErrorHandler/ErrorHandler";
import { User } from "../Interfaces/Users";

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
		})
		.catch((e) => {
			notification.warning({
				message: ErrorTitles.WARNING,
				description: "Something went wrong",
			});
			return new Promise<Short[]>((reject) => {});
		});
}

export async function CreatePosition(
	token: string | null,
	name: string,
	setActive: (active: boolean) => void
): Promise<void> {
	try {
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

export async function UpdatePosition(
	token: string | null,
	name: string,
	setActive: (active: boolean) => void,
	id: number
): Promise<void> {
	try {
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

export async function DeletePosition(
	token: string | null,
	id: string
): Promise<void> {
	try {
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
		})
		.catch((e) => {
			notification.warning({
				message: ErrorTitles.WARNING,
				description: "Something went wrong",
			});
			return new Promise<Short[]>((reject) => {});
		});
}

export async function CreateDepartment(
	token: string | null,
	name: string,
	setActive: (active: boolean) => void
): Promise<void> {
	try {
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

export async function UpdateDepartment(
	token: string | null,
	name: string,
	setActive: (active: boolean) => void,
	id: number
): Promise<void> {
	try {
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

export async function DeleteDepartment(
	token: string | null,
	id: string
): Promise<void> {
	try {
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
		})
		.catch((e) => {
			notification.warning({
				message: ErrorTitles.WARNING,
				description: "Something went wrong",
			});
			return new Promise<Short[]>((reject) => {});
		});
}

export async function CreateForeignLanguage(
	token: string | null,
	name: string,
	setActive: (active: boolean) => void
): Promise<void> {
	try {
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

export async function UpdateForeignLanguage(
	token: string | null,
	name: string,
	setActive: (active: boolean) => void,
	id: number
): Promise<void> {
	try {
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

export async function DeleteForeignLanguage(
	token: string | null,
	id: string
): Promise<void> {
	try {
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
		})
		.catch((e) => {
			notification.warning({
				message: ErrorTitles.WARNING,
				description: "Something went wrong",
			});
			return new Promise<Short[]>((reject) => {});
		});
}

export async function CreateProgrammingLanguage(
	token: string | null,
	name: string,
	setActive: (active: boolean) => void
): Promise<void> {
	try {
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

export async function UpdateProgrammingLanguage(
	token: string | null,
	name: string,
	setActive: (active: boolean) => void,
	id: number
): Promise<void> {
	try {
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

export async function DeleteProgrammingLanguage(
	token: string | null,
	id: string
): Promise<void> {
	try {
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

export function GetUsers(
	token: string,
	filterForm: any | null
): Promise<User[]> {
	var params = {
		nameRu: filterForm?.nameRu ?? "",
		surnameRu: filterForm?.surnameRu ?? "",
		patronymicRu: filterForm?.patronymicRu ?? "",
		nameEn: filterForm?.nameEn ?? "",
		surnameEn: filterForm?.surnameEn ?? "",
		login: filterForm?.login ?? "",
	};

	if (filterForm?.roleIds) {
		Object.assign(params, { roleIds: filterForm?.roleIds });
	}

	return fetch(
		"http://localhost:8000/api/Employee/GetAllUsers?" +
			new URLSearchParams(params).toString(),
		{
			method: "GET",
			headers: { Accept: "*/*", Authorization: "Bearer " + token },
		}
	)
		.then((response) => response.json())
		.then((data) => {
			(data as User[]).forEach((el) =>
				Object.assign(el, { key: el.id.toString() })
			);
			return data as User[];
		})
		.catch((e) => {
			notification.warning({
				message: ErrorTitles.WARNING,
				description: "Something went wrong",
			});
			return new Promise<User[]>((reject) => {});
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
		})
		.catch((e) => {
			notification.warning({
				message: ErrorTitles.WARNING,
				description: "Something went wrong",
			});
			return new Promise<Short[]>((reject) => {});
		});
}

export async function UpdateUser(
	token: string | null,
	formValues: any,
	setActive: (active: boolean) => void,
	id: number
): Promise<void> {
	try {
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
