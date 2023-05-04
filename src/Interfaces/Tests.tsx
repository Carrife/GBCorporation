import { Short } from "./Short";

export interface UserTest {
	key: string;
	id: number;
	employee: string | null;
	test: string;
	status: string;
}

export interface UserTestResults {
	key: string;
	id: number;
	employee: string | null;
	test: string;
	result: string;
	date: string;
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

export interface HiringTestData {
	foreignTest: Short[];
	logicTest: Short[];
	programmingTest: Short[];
}
