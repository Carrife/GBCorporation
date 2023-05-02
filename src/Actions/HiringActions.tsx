import { ErrorTitles } from "../Enums/Errors";
import { notification } from "antd";
import TestTypeEnum from "../Enums/TestTypeEnum";
import { Short } from "../Interfaces/Short";
import { ErrorHandler } from "./ErrorHandler/ErrorHandler";
import {
	DescriptionUpdate,
	HiringAccept,
	HiringData,
	Hiring,
	Interviewers,
	hiringCreate,
} from "../Interfaces/Hirings";
import { HiringTestData } from "../Interfaces/Tests";

export function GetAllHirings(
	token: string,
	role: string,
	userId: string,
	filterForm: any | null
): Promise<Hiring[]> {
	var params = {
		nameEn: filterForm?.nameEn ?? "",
		surnameEn: filterForm?.surnameEn ?? "",
		login: filterForm?.login ?? "",
	};

	if (filterForm?.positionIds) {
		Object.assign(params, { positionIds: filterForm?.positionIds });
	}

	if (filterForm?.statusIds) {
		Object.assign(params, { statusIds: filterForm?.statusIds });
	}

	return fetch(
		"http://localhost:8000/api/Hiring/GetAll?" +
			new URLSearchParams(params).toString(),
		{
			method: "GET",
			headers: {
				Accept: "*/*",
				Authorization: "Bearer " + token,
				"Content-Type": "application/json",
				userId,
				role,
			},
			credentials: "include",
		}
	)
		.then((response) => response.json())
		.then((data) => {
			(data as Hiring[]).forEach((el) =>
				Object.assign(el, { key: el.id.toString() })
			);
			return data as Hiring[];
		})
		.catch((e) => {
			notification.warning({
				message: ErrorTitles.WARNING,
				description: "Something went wrong",
			});
			return new Promise<Hiring[]>((reject) => {});
		});
}

export function GetHiringById(
	token: string | null,
	id: string
): Promise<HiringData> {
	return fetch("http://localhost:8000/api/Hiring/GetById", {
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
			return data as HiringData;
		})
		.catch((e) => {
			notification.warning({
				message: ErrorTitles.WARNING,
				description: "Something went wrong",
			});
			return new Promise<HiringData>((reject) => {});
		});
}

export async function Hire(
	token: string | null,
	id: string,
	setActive: (active: boolean) => void,
	formValues: any
): Promise<void> {
	try {
		const response = await fetch("http://localhost:8000/api/Hiring/Hire", {
			method: "PUT",
			headers: {
				Accept: "*/*",
				Authorization: "Bearer " + token,
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify({
				id: id,
				nameRu: formValues.nameRu,
				surnameRu: formValues.surnameRu,
				patronymicRu: formValues.patronymicRu,
				nameEn: formValues.nameEn,
				surnameEn: formValues.surnameEn,
				phone: formValues.phone,
				departmentId: formValues.department,
				languageId: formValues.programmingLanguage,
				positionId: formValues.position,
			}),
		});

		if (!response.ok) {
			ErrorHandler(response);
		} else {
			notification.success({
				message: ErrorTitles.SUCCESS,
				description: "",
			});

			setActive(false);
			window.location.reload();
		}
	} catch (e) {
		notification.warning({
			message: ErrorTitles.WARNING,
			description: "Something went wrong",
		});
	}
}

export async function Reject(
	token: string | null,
	id: string,
	setActive: (active: boolean) => void
): Promise<void> {
	try {
		const response = await fetch(
			"http://localhost:8000/api/Hiring/Reject",
			{
				method: "PUT",
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

			setActive(false);
			window.location.reload();
		}
	} catch (e) {
		notification.warning({
			message: ErrorTitles.WARNING,
			description: "Something went wrong",
		});
	}
}

export function GetActiveApplicants(token: string | null): Promise<Short[]> {
	return fetch("http://localhost:8000/api/Applicant/GetActiveShort", {
		method: "GET",
		headers: { Accept: "*/*", Authorization: "Bearer " + token },
	})
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

export function GetInterviewers(token: string | null): Promise<Interviewers> {
	return fetch("http://localhost:8000/api/Hiring/GetInterviewers", {
		method: "GET",
		headers: { Accept: "*/*", Authorization: "Bearer " + token },
	})
		.then((response) => response.json())
		.then((data) => {
			return data as Interviewers;
		})
		.catch((e) => {
			notification.warning({
				message: ErrorTitles.WARNING,
				description: "Something went wrong",
			});
			return new Promise<Interviewers>((reject) => {});
		});
}

export function GetTestData(
	token: string | null,
	id: string
): Promise<HiringTestData> {
	return fetch("http://localhost:8000/api/Hiring/GetTestData", {
		method: "GET",
		headers: {
			Accept: "*/*",
			Authorization: "Bearer " + token,
			"Content-Type": "application/json",
			id,
		},
	})
		.then((response) => response.json())
		.then((data) => {
			return data as HiringTestData;
		})
		.catch((e) => {
			notification.warning({
				message: ErrorTitles.WARNING,
				description: "Something went wrong",
			});
			return new Promise<HiringTestData>((reject) => {});
		});
}

export function GetInterviewerPositions(
	token: string | null
): Promise<Short[]> {
	return fetch("http://localhost:8000/api/Hiring/GetInterviewerPositions", {
		method: "GET",
		headers: { Accept: "*/*", Authorization: "Bearer " + token },
	})
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

export function GetPositions(token: string | null): Promise<Short[]> {
	return fetch("http://localhost:8000/api/SuperDictionary/GetPositions", {
		method: "GET",
		headers: { Accept: "*/*", Authorization: "Bearer " + token },
	})
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

export function GetDepartments(token: string | null): Promise<Short[]> {
	return fetch("http://localhost:8000/api/SuperDictionary/GetDepartments", {
		method: "GET",
		headers: { Accept: "*/*", Authorization: "Bearer " + token },
	})
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

export function GetHiringStatuses(token: string | null): Promise<Short[]> {
	return fetch(
		"http://localhost:8000/api/SuperDictionary/GetHiringStatuses",
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

export async function CreateHiring(
	token: string | null,
	formValues: hiringCreate,
	setActive: (active: boolean) => void
): Promise<void> {
	try {
		const response = await fetch(
			"http://localhost:8000/api/Hiring/Create",
			{
				method: "POST",
				headers: {
					Accept: "*/*",
					Authorization: "Bearer " + token,
					"Content-Type": "application/json",
				},
				credentials: "include",
				body: JSON.stringify({
					applicantId: formValues.applicant,
					date: formValues.interviewDate,
					positionId: formValues.position,
					interviewers: formValues.interviewers?.map(
						(x) => x.interviewer
					),
					logicTestId: formValues.tests?.find(
						(item) => item.type === TestTypeEnum.LOGIC
					)?.result,
					programmingTestId: formValues.tests?.find(
						(item) => item.type === TestTypeEnum.PROGRAMMING
					)?.result,
					foreignLanguageTestId: formValues.tests?.find(
						(item) => item.type === TestTypeEnum.FOREIGN
					)?.result,
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
			window.location.reload();
		}
	} catch (e) {
		notification.warning({
			message: ErrorTitles.WARNING,
			description: "Something went wrong",
		});
	}
}

export async function UpdateDescription(
	token: string | null,
	hiringId: string,
	formValues: DescriptionUpdate,
	setActive: (active: boolean) => void
): Promise<void> {
	try {
		const response = await fetch(
			"http://localhost:8000/api/Hiring/UpdateDescription",
			{
				method: "PUT",
				headers: {
					Accept: "*/*",
					Authorization: "Bearer " + token,
					"Content-Type": "application/json",
					id: hiringId,
					description: formValues.description,
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

			setActive(false);

			window.location.reload();
		}
	} catch (e) {
		notification.warning({
			message: ErrorTitles.WARNING,
			description: "Something went wrong",
		});
	}
}

export async function GetApplicantHiringData(
	token: string | null,
	id: string
): Promise<HiringAccept> {
	return fetch("http://localhost:8000/api/Hiring/GetApplicantHiringData", {
		method: "GET",
		headers: {
			Accept: "*/*",
			Authorization: "Bearer " + token,
			"Content-Type": "application/json",
			id,
		},
	})
		.then((response) => response.json())
		.then((data) => {
			return data as HiringAccept;
		})
		.catch((e) => {
			notification.warning({
				message: ErrorTitles.WARNING,
				description: "Something went wrong",
			});
			return new Promise<HiringAccept>((reject) => {});
		});
}
