import { Errors, ErrorTitles } from "../Enums/Errors";
import { notification } from "antd";

export async function LogIn(formValues: any): Promise<void> {
	const response = await fetch("http://localhost:8000/api/Auth/Login", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		credentials: "include",
		body: JSON.stringify({
			email: formValues.email,
			password: formValues.password,
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

        window.location.reload();
	}
}

export async function LogOut(): Promise<void> {
	const response = await fetch("http://localhost:8000/api/Auth/Logout", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
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
	}
}