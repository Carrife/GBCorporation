import { Button, Col, Form, Input, Row } from "antd";
import { useEffect } from "react";
import ModalWindow from "../../../../Components/Modal/Modal";
import ModalTitles from "../../../../Enums/ModalTitles";
import { UpdatePosition } from "../../../../Actions/AdministrationActions";
import { Short } from "../../../../Interfaces/Short";

const PositionEdit = (props: {
	active: boolean;
	setActive: (active: boolean) => void;
	position: any;
	token: string | null;
	setPositions: React.Dispatch<React.SetStateAction<Short[]>>;
}) => {
	const [form] = Form.useForm();

	useEffect(() => {
		reset();
	}, [props.position]);

	const reset = () => {
		form.setFieldsValue({
			title: props.position?.title,
		});
	};

	const onFinish = (values: any) => {
		UpdatePosition(
			props.token,
			values.title,
			props.setActive,
			props.position.id,
			props.setPositions
		);
	};

	const onModalCancel = () => {
		reset();
		props.setActive(false);
	};

	return (
		<ModalWindow
			title={ModalTitles.EDIT_POSITION}
			isActive={props.active}
			onCancel={onModalCancel}
		>
			<Form
				form={form}
				style={{ padding: 10 }}
				onFinish={onFinish}
				labelCol={{ flex: "70px" }}
				labelAlign="left"
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

export default PositionEdit;
