import { ErrorTitles } from "../Enums/Errors";
import { notification } from "antd";
import { ErrorHandler } from "./ErrorHandler/ErrorHandler";
import { TestData, UserTest, UserTestResults } from "../Interfaces/Tests";
import { Short } from "../Interfaces/Short";

export function GetAllTests(token: string | null): Promise<Short[]> {
	return fetch("http://localhost:8000/api/TestCompetencies/GetAll", {
		method: "GET",
		headers: { Accept: "*/*", Authorization: "Bearer " + token },
		credentials: "include",
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

export function GetUserTests(
	token: string | null,
	userId: string,
	role: string,
	filterForm: any | null
): Promise<UserTest[]> {
	var params = {
		login: filterForm?.login ?? "",
		test: filterForm?.test ?? "",
	};

	if (filterForm?.statusIds) {
		Object.assign(params, { statusIds: filterForm?.statusIds });
	}

	return fetch(
		"http://localhost:8000/api/TestCompetencies/GetUserTests?" +
			new URLSearchParams(params).toString(),
		{
			method: "GET",
			headers: {
				Accept: "*/*",
				Authorization: "Bearer " + token,
				"Content-Type": "application/json",
				userId,
				role,
			},
			credentials: "include",
		}
	)
		.then((response) => response.json())
		.then((data) => {
			(data as UserTest[]).forEach((el) =>
				Object.assign(el, { key: el.id.toString() })
			);
			return data as UserTest[];
		})
		.catch((e) => {
			notification.warning({
				message: ErrorTitles.WARNING,
				description: "Something went wrong",
			});
			return new Promise<UserTest[]>((reject) => {});
		});
}

export function GetUserResults(
	token: string,
	id: string,
	filterForm: any | null
): Promise<UserTestResults[]> {
	var params = {
		login: filterForm?.login ?? "",
		test: filterForm?.test ?? "",
	};

	if (filterForm?.statusIds) {
		Object.assign(params, { statusIds: filterForm?.statusIds });
	}

	return fetch(
		"http://localhost:8000/api/TestCompetencies/GetUserResults?" +
			new URLSearchParams(params).toString(),
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
			(data as UserTestResults[]).forEach((el) =>
				Object.assign(el, { key: el.id.toString() })
			);
			return data as UserTestResults[];
		})
		.catch((e) => {
			notification.warning({
				message: ErrorTitles.WARNING,
				description: "Something went wrong",
			});
			return new Promise<UserTestResults[]>((reject) => {});
		});
}

export function GetTestCompetenciesStatuses(
	token: string | null
): Promise<Short[]> {
	return fetch(
		"http://localhost:8000/api/SuperDictionary/GetTestCompetenciesStatuses",
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

export async function CreateTestCompetencies(
	token: string | null,
	formValues: any,
	setActive: (active: boolean) => void
): Promise<void> {
	try {
		const response = await fetch(
			"http://localhost:8000/api/TestCompetencies/Create",
			{
				method: "POST",
				headers: {
					Accept: "*/*",
					Authorization: "Bearer " + token,
					"Content-Type": "application/json",
				},
				credentials: "include",
				body: JSON.stringify({
					EmployeeId: formValues.employeeId,
					Title: formValues.test,
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
		}
	} catch (e) {
		notification.warning({
			message: ErrorTitles.WARNING,
			description: "Something went wrong",
		});
	}
}

export async function StartTest(
	token: string | null,
	id: string
): Promise<TestData[]> {
	return await fetch("http://localhost:8000/api/TestCompetencies/Start", {
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
			let i = 0;
			(data as TestData[]).forEach((el) => {
				Object.assign(el, { key: (i++).toString() });
				let k = 0;
				el.answers?.forEach((ans) =>
					Object.assign(ans, { key: (k++).toString() })
				);
			});

			return data as TestData[];
		})
		.catch((e) => {
			notification.warning({
				message: ErrorTitles.WARNING,
				description: "Something went wrong",
			});
			return new Promise<TestData[]>((reject) => {});
		});
}

export async function TestComplete(
	token: string | null,
	result: number,
	id: string
): Promise<void> {
	try {
		const response = await fetch(
			"http://localhost:8000/api/TestCompetencies/Complete",
			{
				method: "POST",
				headers: {
					Accept: "*/*",
					Authorization: "Bearer " + token,
					"Content-Type": "application/json",
				},
				credentials: "include",
				body: JSON.stringify({
					id,
					result,
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
		}
	} catch (e) {
		notification.warning({
			message: ErrorTitles.WARNING,
			description: "Something went wrong",
		});
	}
}
