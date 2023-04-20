import { Errors, ErrorTitles } from "../Enums/Errors";
import { notification } from "antd";

export interface Test {
	key: string;
	id: number;
	name: string;
	link: string;
	lastUpdate: string;
}

export interface TestData {
	key: string;
	question: string;
	answers: [{ key: string; answer: string; isCorrect: boolean }];
}

export function GetAllTests(token: string): Promise<Test[]> {
	return fetch("http://localhost:8000/api/TestCompetencies/GetAll", {
		method: "GET",
		headers: { Accept: "*/*", Authorization: "Bearer " + token },
		credentials: "include",
	})
		.then((response) => response.json())
		.then((data) => {
			(data as Test[]).forEach((el) =>
				Object.assign(el, { key: el.id.toString() })
			);
			return data as Test[];
		});
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
		});
}

export async function TestComplete(
	token: string | null,
	title: string,
	userId: string,
	result: number
): Promise<void> {
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
				title,
				userId,
				result,
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
	}
}
