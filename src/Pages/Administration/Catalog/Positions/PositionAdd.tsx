import { Button, Col, Form, Input, Row } from "antd";
import ModalWindow from "../../../../Components/Modal/Modal";
import ModalTitles from "../../../../Enums/ModalTitles";
import { CreatePosition } from "../../../../Actions/AdministrationActions";
import { Short } from "../../../../Interfaces/Short";

const PositionAdd = (props: {
	active: boolean;
	setActive: (active: boolean) => void;
	token: string | null;
	setPositions: React.Dispatch<React.SetStateAction<Short[]>>;
}) => {
	const [form] = Form.useForm();

	const onFinish = (values: any) => {
		CreatePosition(
			props.token,
			values.title,
			props.setActive,
			props.setPositions
		);
	};

	const onModalCancel = () => {
		form.resetFields();
		props.setActive(false);
	};

	return (
		<ModalWindow
			title={ModalTitles.CREAT_POSITION}
			isActive={props.active}
			onCancel={onModalCancel}
		>
			<Form
				form={form}
				style={{ padding: 10 }}
				onFinish={onFinish}
				labelCol={{ flex: "70px" }}
				labelAlign="left"
				labelWrap
			>
				<Form.Item
					name={`title`}
					label={`Title`}
					rules={[
						{
							required: true,
							message: "Empty field",
						},
					]}
				>
					<Input />
				</Form.Item>
				<Row>
					<Col span={24} style={{ textAlign: "right" }}>
						<Button type="primary" htmlType="submit">
							Create
						</Button>
					</Col>
				</Row>
			</Form>
		</ModalWindow>
	);
};

export default PositionAdd;
