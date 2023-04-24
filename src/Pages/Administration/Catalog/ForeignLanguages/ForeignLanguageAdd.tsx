import { Button, Col, Form, Input, Row } from "antd";
import ModalWindow from "../../../../Components/Modal/Modal";
import ModalTitles from "../../../../Enums/ModalTitles";
import { CreateForeignLanguage } from "../../../../Actions/AdministrationActions";

const ForeignLanguageAdd = (props: {
	active: boolean;
	setActive: (active: boolean) => void;
	token: string | null;
}) => {
	const [form] = Form.useForm();

	const onFinish = (values: any) => {
		CreateForeignLanguage(props.token, values.title, props.setActive);
	};

	return (
		<ModalWindow
			title={ModalTitles.CREAT_FOREIGN_LANGUAGE}
			isActive={props.active}
			setActive={props.setActive}
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

export default ForeignLanguageAdd;
