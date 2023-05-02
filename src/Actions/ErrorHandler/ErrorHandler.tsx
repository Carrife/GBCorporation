import { notification } from "antd";
import { ErrorResponse, ErrorTitles, Errors } from "../../Enums/Errors";

export function ErrorHandler(response: Response) {
	if (response.status === 409) {
		response.json().then((data) => {
			notification.error({
				message: ErrorTitles.ERROR,
				description: ErrorResponse[data["errorStatus"]],
			});
		});
	} else if (response.status !== undefined) {
		notification.error({
			message: ErrorTitles.ERROR,
			description: Errors[response.status],
		});
	}
    else {
        notification.error({
            message: ErrorTitles.ERROR,
            description: 'Something went wrong',
        });
    }
}
