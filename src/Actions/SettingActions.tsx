import { Errors, ErrorTitles } from "../Enums/Errors";
import { notification } from "antd";

export async function UpdatePassword(
	token: string | null,
	userId: string,
	formValues: any
): Promise<void> {
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
