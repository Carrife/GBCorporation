import { Short } from "./Short";

export interface Test {
	key: string;
	id: number;
	name: string;
	link: string;
	lastUpdate: string;
}

export interface TestData {
	key: string;
	question: string;
	answers: [{ key: string; answer: string; isCorrect: boolean }];
}

export interface TestResults {
	foreignLanguageTests: [
		{
			foreignLanguage: string;
			foreignLanguageId: number;
			result: number;
			date: string;
			applicantId: number;
			id: number;
		}
	];
	logicTests: [
		{
			result: number;
			date: string;
			applicantId: number;
			id: number;
		}
	];
	programmingTests: [
		{
			programmingLanguage: string;
			programmingLanguageId: number;
			result: number;
			date: string;
			applicantId: number;
			id: number;
		}
	];
}

export interface EmployeeTestData {
	key: string;
	title: string;
	testResult: string;
	date: string;
}

export interface HiringTestData {
	foreignTest: Short[];
	logicTest: Short[];
	programmingTest: Short[];
}
