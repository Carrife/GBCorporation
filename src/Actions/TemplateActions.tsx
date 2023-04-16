import { Errors, ErrorTitles } from "../Enums/Errors";
import { notification } from "antd";
import fileDownload from "js-file-download";

export interface Template {
	key: string;
	id: number;
	name: string;
	link: string;
	lastUpdate: string;
}

export function GetAllTemplates(token: string): Promise<Template[]> {
	return fetch("http://localhost:8000/api/Template/GetAll", {
		method: "GET",
		headers: { Accept: "*/*", Authorization: "Bearer " + token },
		credentials: "include",
	})
		.then((response) => response.json())
		.then((data) => {
			(data as Template[]).forEach((el) =>
				Object.assign(el, { key: el.id.toString() })
			);
			return data as Template[];
		});
}

export async function TemplateDelete(
	token: string | null,
	id: string
): Promise<void> {
	const response = await fetch("http://localhost:8000/api/Template/Delete", {
		method: "POST",
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

export async function TemplateDownload(
	token: string | null,
	id: string,
	title: string
): Promise<void> {
	const response = await fetch(
		"http://localhost:8000/api/Template/Download",
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

		response.blob().then((res) => fileDownload(res, title + ".xml"));
	}
}

export async function CreateTemplate(
	token: string | null,
	name: string,
	setActive: (active: boolean) => void
): Promise<void> {
	const response = await fetch("http://localhost:8000/api/Template/Create", {
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

export async function UploadTemplate(
	token: string | null,
	id: string,
	file: any,
	setActive: (active: boolean) => void
): Promise<void> {
	const formData = new FormData();
	formData.append("file", file);

	const response = await fetch("http://localhost:8000/api/Template/Upload", {
		method: "POST",
		headers: {
			Accept: "*/*",
			Authorization: "Bearer " + token,
			id,
		},
		body: formData,
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
