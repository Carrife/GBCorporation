import { Errors, ErrorTitles } from "../Enums/Errors";
import { notification } from "antd";
import TestTypeEnum from "../Enums/TestTypeEnum";

export interface HiringInterface {
	key: string;
	id: number;
	applicant: string;
	position: string;
	date: string;
	status: string;
}

export interface HiringData {
	applicant: { id: number; name: string };
	date: string;
	position: string;
	status: string;
	interviewers: [
		{
			interviewer: { id: number; name: string };
			description: string;
			position: { id: number; name: string };
			id: number;
		}
	];
	foreignLanguageTest: { id: number; name: string };
	logicTest: { id: number; name: string };
	programmingTest: { id: number; name: string };
	id: number;
}

export interface TestData {
	foreignTest: [
		{
			id: number;
			name: string;
		}
	];
	logicTest: [
		{
			id: number;
			name: string;
		}
	];
	programmingTest: [
		{
			id: number;
			name: string;
		}
	];
}

export interface Short {
	id: number;
	name: string;
}

export interface Interviewers {
	teamLeaders: [
		{
			id: number;
			name: string;
		}
	];
	lineManagers: [
		{
			id: number;
			name: string;
		}
	];
	hRs: [
		{
			id: number;
			name: string;
		}
	];
	ceo: [
		{
			id: number;
			name: string;
		}
	];
	chiefAccountant: [
		{
			id: number;
			name: string;
		}
	];
	bAs: [
		{
			id: number;
			name: string;
		}
	];
	admins: [
		{
			id: number;
			name: string;
		}
	];
}

interface hiringCreate {
	applicant: number;
	interviewDate: string;
	position: number;
	interviewers: [{ position: number; interviewer: number }];
	tests: [{ type: string; result: number }];
}

interface DescriptionUpdate {
	description: string;
}

export interface HiringAccept {
	id: number;
	nameRu: string;
	nameEn: string;
	surnameRu: string;
	surnameEn: string;
	patronymicRu: string;
	phone: string;
	departmentId: number;
	languageId: number;
	positionId: number;
}

export function GetAllHirings(
	token: string,
	role: string,
	userId: string
): Promise<HiringInterface[]> {
	return fetch("http://localhost:8000/api/Hiring/GetAll", {
		method: "GET",
		headers: {
			Accept: "*/*",
			Authorization: "Bearer " + token,
			"Content-Type": "application/json",
			userId,
			role,
		},
		credentials: "include",
	})
		.then((response) => response.json())
		.then((data) => {
			(data as HiringInterface[]).forEach((el) =>
				Object.assign(el, { key: el.id.toString() })
			);
			return data as HiringInterface[];
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
		});
}

export async function Hire(
	token: string | null,
	id: string,
	setActive: (active: boolean) => void,
	formValues: any
): Promise<void> {
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

export async function Reject(
	token: string | null,
	id: string,
	setActive: (active: boolean) => void
): Promise<void> {
	const response = await fetch("http://localhost:8000/api/Hiring/Reject", {
		method: "PUT",
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

		setActive(false);
		window.location.reload();
	}
}

//Interview
export function GetActiveApplicants(token: string | null): Promise<Short[]> {
	return fetch("http://localhost:8000/api/Applicant/GetActiveShort", {
		method: "GET",
		headers: { Accept: "*/*", Authorization: "Bearer " + token },
	})
		.then((response) => response.json())
		.then((data) => {
			return data as Short[];
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
		});
}

export function GetTestData(
	token: string | null,
	id: string
): Promise<TestData> {
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
			return data as TestData;
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
			return data as Short[];
		});
}

export function GetPositions(token: string | null): Promise<Short[]> {
	return fetch("http://localhost:8000/api/SuperDictionary/GetPositions", {
		method: "GET",
		headers: { Accept: "*/*", Authorization: "Bearer " + token },
	})
		.then((response) => response.json())
		.then((data) => {
			return data as Short[];
		});
}

export function GetDepartments(token: string | null): Promise<Short[]> {
	return fetch("http://localhost:8000/api/SuperDictionary/GetDepartments", {
		method: "GET",
		headers: { Accept: "*/*", Authorization: "Bearer " + token },
	})
		.then((response) => response.json())
		.then((data) => {
			return data as Short[];
		});
}

export async function CreateHiring(
	token: string | null,
	formValues: hiringCreate,
	setActive: (active: boolean) => void
): Promise<void> {
	const response = await fetch("http://localhost:8000/api/Hiring/Create", {
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
			interviewers: formValues.interviewers?.map((x) => x.interviewer),
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

export async function UpdateDescription(
	token: string | null,
	hiringId: string,
	formValues: DescriptionUpdate,
	setActive: (active: boolean) => void
): Promise<void> {
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
		});
}
