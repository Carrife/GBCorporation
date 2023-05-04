import { useEffect, useState } from "react";
import { Button, Col, Form, Row, Select } from "antd";
import ModalWindow from "../../../Components/Modal/Modal";
import ModalTitles from "../../../Enums/ModalTitles";
import { CreateTestCompetencies, GetAllTests } from "../../../Actions/TestActions";
import { Short } from "../../../Interfaces/Short";
import { GetAllEmployeeShort } from "../../../Actions/EmployeeActions";

const TestCompetenciesAdd = (props: {
	active: boolean;
	setActive: (active: boolean) => void;
	token: string | null;
}) => {
	const [testTitles, setTestTitles] = useState<Short[]>([]);
	const [employees, setEmployees] = useState<Short[]>([]);
	const [form] = Form.useForm();

	useEffect(() => {
		GetAllTests(props.token).then((result) => setTestTitles(result));
		GetAllEmployeeShort(props.token).then((result) => setEmployees(result));
	}, [props.token]);

	const onFinish = (values: any) => {
		CreateTestCompetencies(props.token, values, props.setActive);
	};

	return (
		<ModalWindow
			title={ModalTitles.CREATE_EMPLOYEE}
			isActive={props.active}
			setActive={props.setActive}
		>
			<Form
				form={form}
				style={{ padding: 10, minWidth: 350}}
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
