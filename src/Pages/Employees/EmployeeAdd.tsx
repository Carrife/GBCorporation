import { useEffect, useState } from "react";
import ModalWindow from "../../Components/Modal/Modal";
import { GetProgrammingLanguages } from "../../Actions/ApplicantActions";
import { GetDepartments, GetPositions } from "../../Actions/HiringActions";
import { Button, Col, Divider, Form, Input, Row, Select } from "antd";
import { CreateEmployee } from "../../Actions/EmployeeActions";
import ModalTitles from "../../Enums/ModalTitles";
import { Short } from "../../Interfaces/Short";
import { Employee } from "../../Interfaces/Employees";

const EmployeeAdd = (props: {
	active: boolean;
	setActive: (active: boolean) => void;
	token: string | null;
	setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>;
}) => {
	const [languages, setLanguages] = useState<Short[]>([]);
	const [departments, setDepartments] = useState<Short[]>([]);
	const [positions, setPositions] = useState<Short[]>([]);
	const [isDisabled, setIsDisabled] = useState(true);
	const [form] = Form.useForm();

	useEffect(() => {
		GetProgrammingLanguages(props.token).then((result) =>
			setLanguages(result)
		);
		GetDepartments(props.token).then((result) => setDepartments(result));
		GetPositions(props.token).then((result) => setPositions(result));
	}, [props.token]);

	const onFinish = (values: any) => {
		CreateEmployee(props.token, values, props.setActive, props.setEmployees);
	};

	const onChangePosition = (value: any) => {
		if (
			positions
				.find((item) => item.id === value)
				?.name.toLowerCase()
				.includes("developer")
		)
			setIsDisabled(false);
		else {
			form.resetFields(["language"]);
			setIsDisabled(true);
		}
	};

	const onModalCancel = () => {
		form.resetFields();
		props.setActive(false);
	};

	return (
		<ModalWindow
			title={ModalTitles.CREATE_EMPLOYEE}
			isActive={props.active}
			onCancel={onModalCancel}
		>
			<Form
				form={form}
				style={{ padding: 10 }}
				onFinish={onFinish}
				labelCol={{ flex: "114px" }}
				labelAlign="left"
				labelWrap
			>
				<Row gutter={25}>
					<Col span={12} key={1}>
						<Form.Item
							name={`surnameRu`}
							label={`Surname Ru`}
							rules={[
								{
									required: true,
									message: "Empty field",
								},
							]}
						>
							<Input />
						</Form.Item>
						<Form.Item
							name={`nameRu`}
							label={`Name Ru`}
							rules={[
								{
									required: true,
									message: "Empty field",
								},
							]}
						>
							<Input />
						</Form.Item>
						<Form.Item
							name={`patronymicRu`}
							label={`Patronymic Ru`}
							rules={[
								{
									required: true,
									message: "Empty field",
								},
							]}
						>
							<Input />
						</Form.Item>
					</Col>
					<Col span={12} key={2}>
						<Form.Item
							name={`nameEn`}
							label={`Name En`}
							rules={[
								{
									required: true,
									message: "Empty field",
								},
							]}
						>
							<Input />
						</Form.Item>
						<Form.Item
							name={`surnameEn`}
							label={`Surname En`}
							rules={[
								{
									required: true,
									message: "Empty field",
								},
							]}
						>
							<Input />
						</Form.Item>
						<Form.Item
							name={`phone`}
							label={`Phone`}
							rules={[
								{
									required: true,
									message: "Empty field",
								},
							]}
						>
							<Input />
						</Form.Item>
					</Col>
				</Row>
				<Divider plain>Inner data</Divider>
				<Row gutter={25}>
					<Col span={12} key={1}>
						<Form.Item
							name={`login`}
							label={`Login`}
							rules={[
								{
									required: true,
									message: "Empty field",
								},
							]}
						>
							<Input />
						</Form.Item>

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
								optionFilterProp="children"
								onChange={onChangePosition}
							>
								{positions.map((item) => (
									<Select.Option
										value={item.id}
										key={item.key}
									>
										{item.name}
									</Select.Option>
								))}
							</Select>
						</Form.Item>
					</Col>
					<Col span={12} key={2}>
						<Form.Item
							name={`department`}
							label={`Department`}
							rules={[
								{
									required: true,
									message: "Empty field",
								},
							]}
						>
							<Select showSearch optionFilterProp="children">
								{departments.map((item) => (
									<Select.Option
										value={item.id}
										key={item.key}
									>
										{item.name}
									</Select.Option>
								))}
							</Select>
						</Form.Item>
						<Form.Item name={`language`} label={`Language`}>
							<Select
								showSearch
								optionFilterProp="children"
								disabled={isDisabled}
							>
								{languages.map((item) => (
									<Select.Option
										value={item.id}
										key={item.key}
									>
										{item.name}
									</Select.Option>
								))}
							</Select>
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

export default EmployeeAdd;
