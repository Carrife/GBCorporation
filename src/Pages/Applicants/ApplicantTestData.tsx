import { useState } from "react";
import ModalWindow from "../../Components/Modal/Modal";
import * as AiIcons from "react-icons/ai";
import LogicTest from "./TestDatas/LogicTest";
import ForeignLanguageTest from "./TestDatas/ForeignLanguageTest";
import ProgrammingTest from "./TestDatas/ProgrammingTest";
import { Button, Card, Space, Typography } from "antd";
import ModalTitles from "../../Enums/ModalTitles";
import { TestResults } from "../../Interfaces/Tests";

const { Text } = Typography;

const ApplicantTestData = (props: {
	active: boolean;
	applicantId: string;
	setActive: (active: boolean) => void;
	testData: TestResults | undefined;
	token: string | null;
}) => {
	const [modalAddLogicActive, setModalAddLogicActive] = useState(false);
	const [modalAddProgrammingActive, setModalAddProgrammingActive] =
		useState(false);
	const [modalAddForeignLangActive, setModalAddForeignLangActive] =
		useState(false);

	const addLogicTest = async () => {
		setModalAddLogicActive(true);
		props.setActive(false);
	};

	const addProgrammingTest = async () => {
		setModalAddProgrammingActive(true);
		props.setActive(false);
	};

	const addForeignLangTest = async () => {
		setModalAddForeignLangActive(true);
		props.setActive(false);
	};

	const onModalCancel = () => {
		props.setActive(false);
	};

	return (
		<>
			<ModalWindow
				title={ModalTitles.APPLICANT_TESTS}
				isActive={props.active}
				onCancel={onModalCancel}
			>
				<Space direction="horizontal" size={70}>
					<Card
						title="Logic"
						size="small"
						extra={
							<Button type="text" onClick={() => addLogicTest()}>
								<AiIcons.AiOutlinePlusCircle />
							</Button>
						}
					>
						<Space size={20}>
							<Space direction="vertical">
								<Text>Result</Text>
								{props.testData?.logicTests.map((item) => (
									<Text key={item.id}>{item.result}%</Text>
								))}
							</Space>
							<Space direction="vertical">
								<Text>Date</Text>
								{props.testData?.logicTests.map((item) => (
									<Text key={item.id}>{item.date}</Text>
								))}
							</Space>
						</Space>
					</Card>
					<Card
						title="Programming"
						size="small"
						extra={
							<Button
								type="text"
								onClick={() => addProgrammingTest()}
							>
								<AiIcons.AiOutlinePlusCircle />
							</Button>
						}
					>
						<Space size={20}>
							<Space direction="vertical">
								<Text>Language</Text>
								{props.testData?.programmingTests.map(
									(item) => (
										<Text key={item.id}>
											{item.programmingLanguage}
										</Text>
									)
								)}
							</Space>
							<Space direction="vertical">
								<Text>Result</Text>
								{props.testData?.programmingTests.map(
									(item) => (
										<Text key={item.id}>
											{item.result}%
										</Text>
									)
								)}
							</Space>
							<Space direction="vertical">
								<Text>Date</Text>
								{props.testData?.programmingTests.map(
									(item) => (
										<Text key={item.id}>{item.date}</Text>
									)
								)}
							</Space>
						</Space>
					</Card>
					<Card
						title="Foreign language"
						size="small"
						extra={
							<Button
								type="text"
								onClick={() => addForeignLangTest()}
							>
								<AiIcons.AiOutlinePlusCircle />
							</Button>
						}
					>
						<Space size={20}>
							<Space direction="vertical">
								<Text>Language</Text>
								{props.testData?.foreignLanguageTests.map(
									(item) => (
										<Text key={item.id}>
											{item.foreignLanguage}
										</Text>
									)
								)}
							</Space>
							<Space direction="vertical">
								<Text>Result</Text>
								{props.testData?.foreignLanguageTests.map(
									(item) => (
										<Text key={item.id}>
											{item.result}%
										</Text>
									)
								)}
							</Space>
							<Space direction="vertical">
								<Text>Date</Text>
								{props.testData?.foreignLanguageTests.map(
									(item) => (
										<Text key={item.id}>{item.date}</Text>
									)
								)}
							</Space>
						</Space>
					</Card>
				</Space>
			</ModalWindow>
			<LogicTest
				active={modalAddLogicActive}
				applicantId={props.applicantId}
				setActive={setModalAddLogicActive}
				token={props.token}
			/>
			<ForeignLanguageTest
				active={modalAddForeignLangActive}
				applicantId={props.applicantId}
				setActive={setModalAddForeignLangActive}
				token={props.token}
			/>
			<ProgrammingTest
				active={modalAddProgrammingActive}
				applicantId={props.applicantId}
				setActive={setModalAddProgrammingActive}
				token={props.token}
			/>
		</>
	);
};

export default ApplicantTestData;
