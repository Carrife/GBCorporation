import { ErrorTitles } from "../Enums/Errors";
import { notification } from "antd";
import fileDownload from "js-file-download";
import { ErrorHandler } from "./ErrorHandler/ErrorHandler";
import { Template } from "../Interfaces/Templates";

export function GetAllTemplates(token: string | null): Promise<Template[]> {
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
		})
		.catch((e) => {
			notification.warning({
				message: ErrorTitles.WARNING,
				description: "Something went wrong",
			});
			return new Promise<Template[]>((reject) => {});
		});
}

export async function TemplateDelete(
	token: string | null,
	id: string,
	setTemplates: React.Dispatch<React.SetStateAction<Template[]>>
): Promise<void> {
	try {
		const response = await fetch(
			"http://localhost:8000/api/Template/Delete",
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

			GetAllTemplates(token).then((result) => setTemplates(result));
		}
	} catch (e) {
		notification.warning({
			message: ErrorTitles.WARNING,
			description: "Something went wrong",
		});
	}
}

export async function TemplateDownload(
	token: string | null,
	id: string,
	title: string
): Promise<void> {
	try {
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
			ErrorHandler(response);
		} else {
			notification.success({
				message: ErrorTitles.SUCCESS,
				description: "",
			});

			response.blob().then((res) => fileDownload(res, title + ".xml"));
		}
	} catch (e) {
		notification.warning({
			message: ErrorTitles.WARNING,
			description: "Something went wrong",
		});
	}
}

export async function CreateTemplate(
	token: string | null,
	name: string,
	setActive: (active: boolean) => void,
	setTemplates: React.Dispatch<React.SetStateAction<Template[]>>
): Promise<void> {
	try {
		const response = await fetch(
			"http://localhost:8000/api/Template/Create",
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

			GetAllTemplates(token).then((result) => setTemplates(result));
			setActive(false);
		}
	} catch (e) {
		notification.warning({
			message: ErrorTitles.WARNING,
			description: "Something went wrong",
		});
	}
}

export async function UploadTemplate(
	token: string | null,
	id: string,
	file: any,
	setActive: (active: boolean) => void,
	setTemplates: React.Dispatch<React.SetStateAction<Template[]>>
): Promise<void> {
	const formData = new FormData();
	formData.append("file", file);
	try {
		const response = await fetch(
			"http://localhost:8000/api/Template/Upload",
			{
				method: "POST",
				headers: {
					Accept: "*/*",
					Authorization: "Bearer " + token,
					id,
				},
				body: formData,
			}
		);

		if (!response.ok) {
			ErrorHandler(response);
		} else {
			notification.success({
				message: ErrorTitles.SUCCESS,
				description: "",
			});

			GetAllTemplates(token).then((result) => setTemplates(result));
			setActive(false);
		}
	} catch (e) {
		notification.warning({
			message: ErrorTitles.WARNING,
			description: "Something went wrong",
		});
	}
}
