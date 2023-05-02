import { ErrorTitles } from "../Enums/Errors";
import { notification } from "antd";
import { ErrorHandler } from "./ErrorHandler/ErrorHandler";

export async function LogIn(formValues: any): Promise<void> {
	try {
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

export async function LogOut(): Promise<void> {
	try {
		const response = await fetch("http://localhost:8000/api/Auth/Logout", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
		});

		if (!response.ok) {
			ErrorHandler(response);
		}
	} catch (e) {
		notification.warning({
			message: ErrorTitles.WARNING,
			description: "Something went wrong",
		});
	}
}
