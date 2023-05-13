import { Button, Col, Form, Input, Row, Select } from "antd";
import { useEffect, useState } from "react";
import ModalWindow from "../../Components/Modal/Modal";
import ModalTitles from "../../Enums/ModalTitles";
import { GetRoles, UpdateUser } from "../../Actions/AdministrationActions";
import { Short } from "../../Interfaces/Short";
import { User } from "../../Interfaces/Users";

const UserEdit = (props: {
	active: boolean;
	setActive: (active: boolean) => void;
	user: any;
	token: string | null;
	setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}) => {
	const [roles, setRoles] = useState<Short[]>([]);
	const [form] = Form.useForm();

	useEffect(() => {
		GetRoles(props.token).then((result) => setRoles(result));
	}, [props.token]);

	useEffect(() => {
		reset();
	}, [props.user]);

	const reset = () => {
		form.setFieldsValue({
			role: props.user?.roleId,
			email: props.user?.email,
			password: "",
		});
	};

	const onFinish = (values: any) => {
		UpdateUser(
			props.token,
			values,
			props.setActive,
			props.user?.id,
			props.setUsers
		);
	};

	const onModalCancel = () => {
		reset();
		props.setActive(false);
	};

	return (
		<ModalWindow
			title={ModalTitles.EDIT_USER}
			isActive={props.active}
			onCancel={onModalCancel}
		>
			<Form
				form={form}
				style={{ padding: 10 }}
				onFinish={onFinish}
				labelCol={{ flex: "90px" }}
				labelAlign="left"
			>
				<Form.Item
					name={`role`}
					label={`Role`}
					rules={[
						{
							required: true,
							message: "Empty field",
						},
					]}
				>
					<Select showSearch optionFilterProp="children">
						{roles.map((item) => (
							<Select.Option value={item.id} key={item.key}>
								{item.name}
							</Select.Option>
						))}
					</Select>
				</Form.Item>
				<Form.Item
					name={`email`}
					label={`Email`}
					rules={[
						{
							required: true,
							message: "Empty field",
						},
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item name={`password`} label={`Password`}>
					<Input />
				</Form.Item>
				<Row>
					<Col span={24} style={{ textAlign: "right" }}>
						<Button type="primary" htmlType="submit">
							Save
						</Button>
						<Button
							style={{ margin: "0 0 0 8px" }}
							onClick={() => {
								reset();
							}}
						>
							Reset
						</Button>
					</Col>
				</Row>
			</Form>
		</ModalWindow>
	);
};

export default UserEdit;
