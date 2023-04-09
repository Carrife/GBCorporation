import { Button, Col, DatePicker, Form, InputNumber, Row, Select } from "antd";
import { useEffect, useState } from "react";
import {
	CreateProgrammingLanguageTest,
	GetProgrammingLanguages,
	Short,
} from "../../../Actions/ApplicantActions";
import ModalWindow from "../../../Components/Modal/Modal";
import ModalTitles from "../../../Enums/ModalTitles";

const ProgrammingTest = (props: {
	active: boolean;
	applicantId: string;
	setActive: (active: boolean) => void;
	token: string | null;
}) => {
	const [languages, setLanguages] = useState<Short[]>([]);
	const [form] = Form.useForm();

	const onFinish = (values: any) => {
		CreateProgrammingLanguageTest(
			props.token,
			values,
			props.setActive,
			props.applicantId
		);
	};

	useEffect(() => {
		GetProgrammingLanguages(props.token).then((result) =>
			setLanguages(result)
		);
	}, [props.active, props.token]);

	return (
		<ModalWindow
			title={ModalTitles.CREATE_PROGRAMMING_TEST}
			isActive={props.active}
			setActive={props.setActive}
		>
			<Form
				form={form}
				style={{ padding: 10 }}
				onFinish={onFinish}
				labelCol={{ flex: "80px" }}
				labelAlign="left"
				labelWrap
			>
				<Row gutter={25}>
					<Col span={25} key={1}>
						<Form.Item
							name={`language`}
							label={`Language`}
							rules={[
								{
									required: true,
									message: "Empty field",
								},
							]}
						>
							<Select>
								{languages.map((item) => (
									<Select.Option value={item.id}>
										{item.name}
									</Select.Option>
								))}
							</Select>
						</Form.Item>
						<Form.Item
							name={`result`}
							label={`Result`}
							rules={[
								{
									required: true,
									message: "Empty field",
								},
							]}
						>
							<InputNumber placeholder="0" min={1} max={100} />
						</Form.Item>
						<Form.Item
							name={`date`}
							label={`Date`}
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

export default ProgrammingTest;
