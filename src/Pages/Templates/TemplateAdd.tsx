import ModalWindow from "../../Components/Modal/Modal";
import { CreateTemplate } from "../../Actions/TemplateActions";
import { Button, Col, Form, Input } from "antd";
import ModalTitles from "../../Enums/ModalTitles";
import { Template } from "../../Interfaces/Templates";

const TemplateAdd = (props: {
	active: boolean;
	setActive: (active: boolean) => void;
	token: string | null;
	setTemplates: React.Dispatch<React.SetStateAction<Template[]>>;
}) => {
	const [form] = Form.useForm();

	const onFinish = (values: any) => {
		CreateTemplate(props.token, values.name, props.setActive, props.setTemplates);
	};

	const onModalCancel = () => {
		form.resetFields();
		props.setActive(false);
	};

	return (
		<ModalWindow
			title={ModalTitles.CREATE_TEMPLATE}
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
					name={`name`}
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
				<Col span={24} style={{ textAlign: "right" }}>
					<Button type="primary" htmlType="submit">
						Create
					</Button>
				</Col>
			</Form>
		</ModalWindow>
	);
};

export default TemplateAdd;
