import { useEffect, useState } from "react";
import ModalWindow from "../../../Components/Modal/Modal";
import { GetUserTests, TestComplete } from "../../../Actions/TestActions";
import { Button, Form, Checkbox, Space, Row, Col } from "antd";
import "../Test.css";
import { TestData, UserTest } from "../../../Interfaces/Tests";

const TestStart = (props: {
	active: boolean;
	setActive: (active: boolean) => void;
	testData: TestData[];
	testName: string;
	userId: string;
	role: string;
	token: string;
	competenceId: string;
	setTests: React.Dispatch<React.SetStateAction<UserTest[]>>;
}) => {
	const testData = props.testData;
	const [isConfirmed, setIsConfirmed] = useState(false);
	const [result, setResult] = useState(0);
	const [minutes, setMinutes] = useState(30);
	const [seconds, setSeconds] = useState(0);
	const [timerActive, setTimerActive] = useState(true);
	const [form] = Form.useForm();

	useEffect(() => {
		if (minutes === 0 && seconds === 0 && timerActive) {
			onFinish(form.getFieldsValue());
		} else if (seconds > 0 && timerActive) {
			setTimeout(setSeconds, 1000, seconds - 1);
		} else if (seconds === 0 && timerActive) {
			setMinutes(minutes - 1);
			setSeconds(59);
		}
	}, [seconds, minutes, timerActive]);

	useEffect(() => {
		if (!props.active) {
			setTimerActive(false);
		} else {
			setTimerActive(true);
		}
	}, [props.active]);

	const onFinish = (values: any) => {
		setTimerActive(false);

		let numCorrectByUser = 0;
		let numCorrectAnswers = 0;

		testData?.forEach((item) => {
			item.answers?.forEach((answerItem) => {
				if (
					answerItem.isCorrect &&
					values[item.key]?.includes(answerItem.key)
				) {
					numCorrectByUser++;
				}

				if (answerItem.isCorrect === true) numCorrectAnswers++;
			});
		});

		let res = Math.round((numCorrectByUser * 100) / numCorrectAnswers);

		TestComplete(props.token, res, props.competenceId);

		setResult(res);

		setIsConfirmed(true);

		GetUserTests(props.token, props.userId, props.role, null).then((result) =>
			props.setTests(result)
		);
	};

	const onModalCancel = () => {
		form.resetFields();
		props.setActive(false);
	};

	return (
		<ModalWindow
			title={props.testName}
			isActive={props.active}
			onCancel={onModalCancel}
		>
			<>
				{!isConfirmed ? (
					<div
						className={
							minutes > 2 ? "modal_time" : "modal_time_runout"
						}
					>
						Time:{" "}
						{seconds >= 10
							? minutes + ":" + seconds
							: minutes + ":0" + seconds}
					</div>
				) : (
					<div className="modal_result">Result: {result}%</div>
				)}
				<Form form={form} onFinish={onFinish} layout={"vertical"}>
					{testData?.map((item) => (
						<Form.Item
							name={item.key}
							label={item.question}
							key={item.key}
						>
							<Checkbox.Group>
								<Space direction="vertical">
									{item.answers.map((answerItem) => (
										<Checkbox
											disabled={isConfirmed}
											value={answerItem.key}
											key={answerItem.key}
										>
											{answerItem.answer}
										</Checkbox>
									))}
								</Space>
							</Checkbox.Group>
						</Form.Item>
					))}
					<Row>
						<Col span={24} style={{ textAlign: "center" }}>
							{!isConfirmed && (
								<Button
									type="primary"
									htmlType="submit"
									className="modal_button"
								>
									Confirm
								</Button>
							)}
						</Col>
					</Row>
				</Form>
			</>
		</ModalWindow>
	);
};

export default TestStart;
