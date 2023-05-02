import { ErrorTitles } from "../Enums/Errors";
import { notification } from "antd";
import { ErrorHandler } from "./ErrorHandler/ErrorHandler";
import { Test, TestData } from "../Interfaces/Tests";

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
		})
		.catch((e) => {
			notification.warning({
				message: ErrorTitles.WARNING,
				description: "Something went wrong",
			});
			return new Promise<Test[]>((reject) => {});
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
	title: string,
	userId: string,
	result: number
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
					title,
					userId,
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
