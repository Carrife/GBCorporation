import { useEffect, useState } from "react";
import ModalWindow from "../../Components/Modal/Modal";
import {
	GetActiveApplicants,
	GetInterviewers,
	GetTestData,
	CreateHiring,
	GetInterviewerPositions,
	GetPositions,
} from "../../Actions/HiringActions";
import {
	Button,
	Col,
	DatePicker,
	Divider,
	Form,
	Row,
	Select,
	Space,
} from "antd";
import ModalTitles from "../../Enums/ModalTitles";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import Role from "../../Enums/RoleEnum";
import TestTypeEnum from "../../Enums/TestTypeEnum";
import { Short } from "../../Interfaces/Short";
import { Interviewers } from "../../Interfaces/Hirings";
import { HiringTestData } from "../../Interfaces/Tests";

const HiringAdd = (props: {
	active: boolean;
	setActive: (active: boolean) => void;
	token: string | null;
}) => {
	const [applicantId, setApplicantId] = useState("");
	const [applicants, setApplicants] = useState<Short[]>([]);
	const [interviewerPositions, setInterviewerPositions] = useState<Short[]>(
		[]
	);
	const [positions, setPositions] = useState<Short[]>([]);
	const [interviewers, setInterviewers] = useState<Interviewers>();
	const [currentInterviewers, setCurrentInterviewers] = useState<
		Short[] | undefined
	>([]);
	const [currentResults, setCurrentResults] = useState<Short[] | undefined>(
		[]
	);
	const [testData, setTestData] = useState<HiringTestData>();
	const [form] = Form.useForm();

	const testTypes = [
		{
			name: TestTypeEnum.PROGRAMMING,
			id: "1",
		},
		{
			name: TestTypeEnum.FOREIGN,
			id: "2",
		},
		{
			name: TestTypeEnum.LOGIC,
			id: "3",
		},
	];

	const applicantChange = (value: string) => {
		setApplicantId(value);
		form.resetFields(["tests"]);
	};

	const positionChange = (value: string) => {
		let label = interviewerPositions.find(
			(x) => x.id.toString() === value.toString()
		)?.name;

		if (label === Role.LM) {
			setCurrentInterviewers(interviewers?.lineManagers);
		} else if (label === Role.ADMIN) {
			setCurrentInterviewers(interviewers?.admins);
		} else if (label === Role.TL) {
			setCurrentInterviewers(interviewers?.teamLeaders);
		} else if (label === Role.HR) {
			setCurrentInterviewers(interviewers?.hRs);
		} else if (label === Role.BA) {
			setCurrentInterviewers(interviewers?.bAs);
		} else if (label === Role.CEO) {
			setCurrentInterviewers(interviewers?.ceo);
		} else if (label === Role.CHIEF_ACCOUNATN) {
			setCurrentInterviewers(interviewers?.chiefAccountant);
		}
	};

	const typeChange = (value: string) => {
		if (value === TestTypeEnum.FOREIGN) {
			setCurrentResults(testData?.foreignTest);
		} else if (value === TestTypeEnum.LOGIC) {
			setCurrentResults(testData?.logicTest);
		} else if (value === TestTypeEnum.PROGRAMMING) {
			setCurrentResults(testData?.programmingTest);
		}
	};

	useEffect(() => {
		GetActiveApplicants(props.token).then((result) =>
			setApplicants(result)
		);
		GetInterviewers(props.token).then((result) => setInterviewers(result));
		GetInterviewerPositions(props.token).then((result) =>
			setInterviewerPositions(result)
		);
		GetPositions(props.token).then((result) => setPositions(result));
	}, [props.token]);

	useEffect(() => {
		if (applicants.length > 0 && applicantId) {
			GetTestData(props.token, applicantId).then((result) =>
				setTestData(result)
			);
		}
	}, [applicantId, props.token, applicants]);

	const onFinish = (values: any) => {
		CreateHiring(props.token, values, props.setActive);
	};

	return (
		<ModalWindow
			title={ModalTitles.CREATE_HIRING}
			isActive={props.active}
			setActive={props.setActive}
		>
			<Form form={form} style={{ padding: 10 }} onFinish={onFinish}>
				<Row gutter={25}>
					<Col span={12} key={1}>
						<Form.Item
							name={`applicant`}
							label={`Applicant`}
							rules={[
								{
									required: true,
									message: "Empty field",
								},
							]}
						>
							<Select
								showSearch
								style={{ width: 200 }}
								onChange={applicantChange}
								optionFilterProp="children"
							>
								{applicants.map((item) => (
									<Select.Option
										key={item.id}
										value={item.id}
									>
										{item.name}
									</Select.Option>
								))}
							</Select>
						</Form.Item>
					</Col>
					<Col span={12} key={2}>
						<Form.Item
							name={`position`}
							label={`Position`}
							rules={[
								{
									required: true,
									message: "Empty field",
								},
							]}
						>
							<Select
								showSearch
								style={{ width: 200 }}
								optionFilterProp="children"
							>
								{positions.map((item) => (
									<Select.Option
										key={item.id}
										value={item.id}
									>
										{item.name}
									</Select.Option>
								))}
							</Select>
						</Form.Item>
					</Col>
				</Row>
				<Row>
					<Col span={20}>
						<Form.Item
							labelCol={{
								span: 15,
							}}
							name={`interviewDate`}
							label={`Interview date`}
							rules={[
								{
									required: true,
									message: "Empty field",
								},
							]}
						>
							<DatePicker />
						</Form.Item>
					</Col>
				</Row>
				<Divider plain>Interviewers</Divider>
				<Form.List
					name="interviewers"
					initialValue={[{ first: "", last: "" }]}
				>
					{(fields, { add, remove }) => (
						<>
							{fields.map(({ key, name, ...restField }) => (
								<Space
									key={key}
									style={{ display: "flex", marginBottom: 8 }}
									align="baseline"
								>
									<Form.Item
										{...restField}
										name={[name, "position"]}
										rules={[
											{
												required: true,
												message: "Missing",
											},
										]}
									>
										<Select
											showSearch
											style={{ width: 200 }}
											onChange={positionChange}
											optionFilterProp="children"
											placeholder="Position"
										>
											{interviewerPositions.map(
												(item) => (
													<Select.Option
														key={item.id}
														value={item.id}
													>
														{item.name}
													</Select.Option>
												)
											)}
										</Select>
									</Form.Item>
									<Form.Item
										{...restField}
										name={[name, "interviewer"]}
										rules={[
											{
												required: true,
												message: "Missing",
											},
											({ getFieldValue }) => ({
												validator(_, value) {
													if (
														value &&
														getFieldValue(
															"interviewers"
														)?.filter(
															(item: {
																interviewer: string;
															}) =>
																item?.interviewer ===
																value
														).length !== 1
													) {
														return Promise.reject(
															new Error(
																"Duplicate values are not allowed."
															)
														);
													} else {
														return Promise.resolve();
													}
												},
											}),
										]}
									>
										<Select
											showSearch
											style={{ width: 200 }}
											optionFilterProp="children"
											placeholder="Interviewer"
										>
											{currentInterviewers?.map(
												(item) => (
													<Select.Option
														key={item.id}
														value={item.id}
													>
														{item.name}
													</Select.Option>
												)
											)}
										</Select>
									</Form.Item>
									<MinusCircleOutlined
										onClick={() => remove(name)}
									/>
								</Space>
							))}
							<Form.Item>
								<Button
									type="dashed"
									onClick={() => {
										add();
										setCurrentInterviewers([]);
									}}
									block
									icon={<PlusOutlined />}
								>
									Add
								</Button>
							</Form.Item>
						</>
					)}
				</Form.List>
				<Divider plain>Tests</Divider>
				<Form.List name="tests">
					{(fields, { add, remove }) => (
						<>
							{fields.map(({ key, name, ...restField }) => (
								<Space
									key={key}
									style={{ display: "flex", marginBottom: 8 }}
									align="baseline"
								>
									<Form.Item
										{...restField}
										name={[name, "type"]}
										rules={[
											{
												required: true,
												message: "Missing",
											},
											({ getFieldValue }) => ({
												validator(_, value) {
													if (
														value &&
														getFieldValue(
															"tests"
														)?.filter(
															(item: {
																type: string;
															}) =>
																item.type ===
																value
														).length !== 1
													) {
														return Promise.reject(
															new Error(
																"Duplicate values are not allowed."
															)
														);
													} else {
														return Promise.resolve();
													}
												},
											}),
										]}
									>
										<Select
											showSearch
											style={{ width: 200 }}
											onChange={typeChange}
											optionFilterProp="children"
											placeholder="Type"
										>
											{testTypes.map((item) => (
												<Select.Option
													key={item.id}
													value={item.name}
												>
													{item.name}
												</Select.Option>
											))}
										</Select>
									</Form.Item>
									<Form.Item
										{...restField}
										name={[name, "result"]}
										rules={[
											{
												required: true,
												message: "Missing",
											},
										]}
									>
										<Select
											showSearch
											style={{ width: 200 }}
											optionFilterProp="children"
											placeholder="Result"
										>
											{currentResults?.map((item) => (
												<Select.Option
													key={item.id}
													value={item.id}
												>
													{item.name}
												</Select.Option>
											))}
										</Select>
									</Form.Item>
									<MinusCircleOutlined
										onClick={() => remove(name)}
									/>
								</Space>
							))}
							<Form.Item>
								<Button
									type="dashed"
									onClick={() => {
										add();
										setCurrentResults([]);
									}}
									block
									icon={<PlusOutlined />}
								>
									Add
								</Button>
							</Form.Item>
						</>
					)}
				</Form.List>
				<Row>
					<Col span={24} style={{ textAlign: "right" }}>
						<Button type="primary" htmlType="submit">
							Create
						</Button>
						<Button
							style={{ margin: "0 8px" }}
							onClick={() => {
								form.resetFields();
							}}
						>
							Clear
						</Button>
					</Col>
				</Row>
			</Form>
		</ModalWindow>
	);
};

export default HiringAdd;
