import { useEffect, useState } from "react";
import { Button, Col, Form, Row, Select } from "antd";
import ModalWindow from "../../../Components/Modal/Modal";
import ModalTitles from "../../../Enums/ModalTitles";
import {
	CreateTestCompetencies,
	GetAllTests,
} from "../../../Actions/TestActions";
import { Short } from "../../../Interfaces/Short";
import { GetAllEmployeeShort } from "../../../Actions/EmployeeActions";
import { UserTest } from "../../../Interfaces/Tests";

const TestCompetenciesAdd = (props: {
	active: boolean;
	setActive: (active: boolean) => void;
	token: string | null;
	userId: string;
	role: string;
	setTests: React.Dispatch<React.SetStateAction<UserTest[]>>;
}) => {
	const [testTitles, setTestTitles] = useState<Short[]>([]);
	const [employees, setEmployees] = useState<Short[]>([]);
	const [form] = Form.useForm();

	useEffect(() => {
		GetAllTests(props.token).then((result) => setTestTitles(result));
		GetAllEmployeeShort(props.token).then((result) => setEmployees(result));
	}, [props.token]);

	const onFinish = (values: any) => {
		CreateTestCompetencies(
			props.token,
			values,
			props.setActive,
			props.userId,
			props.role,
			props.setTests
		);
	};

	const onModalCancel = () => {
		form.resetFields();
		props.setActive(false);
	};

	return (
		<ModalWindow
			title={ModalTitles.CREATE_COMPETENCIES_TEST}
			isActive={props.active}
			onCancel={onModalCancel}
		>
			<Form
				form={form}
				style={{ padding: 10, minWidth: 350 }}
				onFinish={onFinish}
				labelCol={{ flex: "100px" }}
				labelAlign="left"
				labelWrap
			>
				<Form.Item
					name={`employeeId`}
					label={`Employee`}
					rules={[
						{
							required: true,
							message: "Empty field",
						},
					]}
				>
					<Select showSearch optionFilterProp="children">
						{employees.map((item) => (
							<Select.Option value={item.id} key={item.key}>
								{item.name}
							</Select.Option>
						))}
					</Select>
				</Form.Item>
				<Form.Item
					name={`test`}
					label={`Test`}
					rules={[
						{
							required: true,
							message: "Empty field",
						},
					]}
				>
					<Select showSearch optionFilterProp="children">
						{testTitles.map((item) => (
							<Select.Option value={item.name} key={item.key}>
								{item.name}
							</Select.Option>
						))}
					</Select>
				</Form.Item>

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

export default TestCompetenciesAdd;
