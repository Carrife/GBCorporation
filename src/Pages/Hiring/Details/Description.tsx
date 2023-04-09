import ModalWindow from "../../../Components/Modal/Modal";
import { Button, Col, Form, Row } from "antd";
import { UpdateDescription } from "../../../Actions/HiringActions";
import ModalTitles from "../../../Enums/ModalTitles";
import TextArea from "antd/es/input/TextArea";

const Description = (props: {
	active: boolean;
	hiringInterviewerId: string;
	setActive: (active: boolean) => void;
	description: string;
	token: string | null;
}) => {
	const [form] = Form.useForm();

	form.setFieldsValue({
		description: props.description,
	});

	const onFinish = (values: any) => {
		UpdateDescription(
			props.token,
			props.hiringInterviewerId,
			values,
			props.setActive
		);
	};

	return (
		<ModalWindow
			title={ModalTitles.HIRING_DESCRIPTION}
			isActive={props.active}
			setActive={props.setActive}
		>
			<Form form={form} style={{ padding: 10 }} onFinish={onFinish}>
				<Form.Item
					name={`description`}
					label={`Description`}
					rules={[
						{
							required: true,
							message: "Empty field",
						},
					]}
				>
					<TextArea
						autoSize={{ minRows: 4, maxRows: 4 }}
						style={{ width: 300 }}
						maxLength={300}
					/>
				</Form.Item>
				<Row>
					<Col span={24} style={{ textAlign: "right" }}>
						<Button type="primary" htmlType="submit">
							Save
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

export default Description;