import { ErrorTitles } from "../Enums/Errors";
import { notification } from "antd";
import { Short } from "../Interfaces/Short";
import { ErrorHandler } from "./ErrorHandler/ErrorHandler";
import { Applicant } from "../Interfaces/Applicants";
import { TestResults } from "../Interfaces/Tests";

export function GetAllApplicants(
	token: string | null,
	filterForm: any | null
): Promise<Applicant[]> {
	var params = {
		nameRu: filterForm?.nameRu ?? "",
		surnameRu: filterForm?.surnameRu ?? "",
		patronymicRu: filterForm?.patronymicRu ?? "",
		nameEn: filterForm?.nameEn ?? "",
		surnameEn: filterForm?.surnameEn ?? "",
		login: filterForm?.login ?? "",
	};

	if (filterForm?.statusIds) {
		Object.assign(params, { statusIds: filterForm?.statusIds });
	}

	return fetch(
		"http://localhost:8000/api/Applicant/GetAll?" +
			new URLSearchParams(params).toString(),
		{
			method: "GET",
			headers: { Accept: "*/*", Authorization: "Bearer " + token },
		}
	)
		.then((response) => response.json())
		.then((data) => {
			(data as Applicant[]).forEach((el) =>
				Object.assign(el, { key: el.id.toString() })
			);
			return data as Applicant[];
		})
		.catch((e) => {
			notification.warning({
				message: ErrorTitles.WARNING,
				description: "Something went wrong",
			});
			return new Promise<Applicant[]>((reject) => {});
		});
}

export function GetApplicantStatuses(token: string | null): Promise<Short[]> {
	return fetch(
		"http://localhost:8000/api/SuperDictionary/GetApplicantStatuses",
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

export async function CreateApplicant(
	token: string | null,
	formValues: any,
	setActive: (active: boolean) => void,
	setApplicants: React.Dispatch<React.SetStateAction<Applicant[]>>
): Promise<void> {
	try {
		const response = await fetch(
			"http://localhost:8000/api/Applicant/Create",
			{
				method: "POST",
				headers: {
					Accept: "*/*",
					Authorization: "Bearer " + token,
					"Content-Type": "application/json",
				},
				credentials: "include",
				body: JSON.stringify({
					NameRu: formValues.nameRu,
					SurnameRu: formValues.surnameRu,
					PatronymicRu: formValues.patronymicRu,
					NameEn: formValues.nameEn,
					SurnameEn: formValues.surnameEn,
					Login: formValues.login,
					Phone: formValues.phone,
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

			GetAllApplicants(token, null).then((result) =>
				setApplicants(result)
			);
			setActive(false);
		}
	} catch (e) {
		notification.warning({
			message: ErrorTitles.WARNING,
			description: "Something went wrong",
		});
	}
}

export async function GetApplicantById(
	token: string | null,
	id: string
): Promise<Applicant> {
	return await fetch("http://localhost:8000/api/Applicant/GetById", {
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
			return data as Applicant;
		})
		.catch((e) => {
			notification.warning({
				message: ErrorTitles.WARNING,
				description: "Something went wrong",
			});
			return new Promise<Applicant>((reject) => {});
		});
}

export async function UpdateApplicant(
	token: string | null,
	formValues: any,
	setActive: (active: boolean) => void,
	applicantId: number,
	setApplicants: React.Dispatch<React.SetStateAction<Applicant[]>>
): Promise<void> {
	try {
		const response = await fetch(
			"http://localhost:8000/api/Applicant/Update",
			{
				method: "PUT",
				headers: {
					Accept: "*/*",
					Authorization: "Bearer " + token,
					"Content-Type": "application/json",
				},
				credentials: "include",
				body: JSON.stringify({
					id: applicantId,
					NameRu: formValues.nameRu,
					SurnameRu: formValues.surnameRu,
					PatronymicRu: formValues.patronymicRu,
					NameEn: formValues.nameEn,
					SurnameEn: formValues.surnameEn,
					Phone: formValues.phone,
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

			GetAllApplicants(token, null).then((result) =>
				setApplicants(result)
			);
			setActive(false);
		}
	} catch (e) {
		notification.warning({
			message: ErrorTitles.WARNING,
			description: "Something went wrong",
		});
	}
}

export async function GetApplicantTestData(
	token: string,
	id: string
): Promise<TestResults> {
	return await fetch("http://localhost:8000/api/Applicant/GetTestDatas", {
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
			return data as TestResults;
		})
		.catch((e) => {
			notification.warning({
				message: ErrorTitles.WARNING,
				description: "Something went wrong",
			});
			return new Promise<TestResults>((reject) => {});
		});
}

export async function GetForeignLanguages(
	token: string | null
): Promise<Short[]> {
	return await fetch(
		"http://localhost:8000/api/SuperDictionary/GetForeignLanguages",
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

export async function GetProgrammingLanguages(
	token: string | null
): Promise<Short[]> {
	return await fetch(
		"http://localhost:8000/api/SuperDictionary/GetProgrammingLanguages",
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

export async function CreateForeignLanguageTest(
	token: string | null,
	formValues: any,
	setActive: (active: boolean) => void,
	applicantId: string
): Promise<void> {
	try {
		const response = await fetch(
			"http://localhost:8000/api/Applicant/CreateForeignLanguageTestData",
			{
				method: "POST",
				headers: {
					Accept: "*/*",
					Authorization: "Bearer " + token,
					"Content-Type": "application/json",
				},
				credentials: "include",
				body: JSON.stringify({
					foreignLanguage: "",
					foreignLanguageId: formValues.language,
					result: formValues.result,
					date: formValues.date,
					applicantId,
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

export async function CreateLogicTest(
	token: string | null,
	formValues: any,
	setActive: (active: boolean) => void,
	applicantId: string
): Promise<void> {
	try {
		const response = await fetch(
			"http://localhost:8000/api/Applicant/CreateLogicTestData",
			{
				method: "POST",
				headers: {
					Accept: "*/*",
					Authorization: "Bearer " + token,
					"Content-Type": "application/json",
				},
				credentials: "include",
				body: JSON.stringify({
					result: formValues.result,
					date: formValues.date,
					applicantId,
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

export async function CreateProgrammingLanguageTest(
	token: string | null,
	formValues: any,
	setActive: (active: boolean) => void,
	applicantId: string
): Promise<void> {
	try {
		const response = await fetch(
			"http://localhost:8000/api/Applicant/CreateProgrammingTestData",
			{
				method: "POST",
				headers: {
					Accept: "*/*",
					Authorization: "Bearer " + token,
					"Content-Type": "application/json",
				},
				credentials: "include",
				body: JSON.stringify({
					programmingLanguage: "",
					programmingLanguageId: formValues.language,
					result: formValues.result,
					date: formValues.date,
					applicantId,
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
