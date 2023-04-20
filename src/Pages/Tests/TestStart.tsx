import { useEffect, useState } from "react";
import ModalWindow from "../../Components/Modal/Modal";
import { TestData, TestComplete } from "../../Actions/TestActions";
import { Button, Form, Checkbox, Space, Row, Col } from "antd";
import "./Test.css";

const TestStart = (props: {
	active: boolean;
	setActive: (active: boolean) => void;
	testData: TestData[];
	testName: string;
	userId: string;
	token: string | null;
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

		TestComplete(props.token, props.testName, props.userId, res);

		setResult(res);

		setIsConfirmed(true);
	};

	return (
		<ModalWindow
			title={props.testName}
			isActive={props.active}
			setActive={props.setActive}
		>
			<>
				{!isConfirmed ? (
					<div className={minutes > 2 ? "modal_time" : "modal_time_runout" }>
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
						<Form.Item name={item.key} label={item.question}>
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
							{!isConfirmed ? (
								<Button
									type="primary"
									htmlType="submit"
									className="modal_button"
								>
									Confirm
								</Button>
							) : (
								""
							)}
						</Col>
					</Row>
				</Form>
			</>
		</ModalWindow>
	);
};

export default TestStart;
