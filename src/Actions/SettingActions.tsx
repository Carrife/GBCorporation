import { ErrorTitles } from "../Enums/Errors";
import { notification } from "antd";
import { ErrorHandler } from "./ErrorHandler/ErrorHandler";

export async function UpdatePassword(
	token: string | null,
	userId: string,
	formValues: any
): Promise<void> {
	try {
		const response = await fetch(
			"http://localhost:8000/api/Auth/UpdatePassword",
			{
				method: "POST",
				headers: {
					Accept: "*/*",
					Authorization: "Bearer " + token,
					"Content-Type": "application/json",
				},
				credentials: "include",
				body: JSON.stringify({
					userId,
					password: formValues.password,
					newPassword: formValues.newPassword,
					newPasswordConfirm: formValues.newPasswordConfirm,
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
