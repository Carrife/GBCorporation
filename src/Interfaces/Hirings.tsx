import { Short } from "./Short";

export interface Hiring {
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

export interface Interviewers {
	teamLeaders: Short[];
	lineManagers: Short[];
	hRs: Short[];
	ceo: Short[];
	chiefAccountant: Short[];
	bAs: Short[];
	admins: Short[];
}

export interface hiringCreate {
	applicant: number;
	interviewDate: string;
	position: number;
	interviewers: [{ position: number; interviewer: number }];
	tests: [{ type: string; result: number }];
}

export interface DescriptionUpdate {
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
