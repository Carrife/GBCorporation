import { Button, Col, DatePicker, Form, InputNumber, Row } from "antd";
import { CreateLogicTest } from "../../../Actions/ApplicantActions";
import ModalWindow from "../../../Components/Modal/Modal";
import ModalTitles from "../../../Enums/ModalTitles";

const LogicTest = (props: {
	active: boolean;
	applicantId: string;
	setActive: (active: boolean) => void;
	token: string | null;
}) => {
	const [form] = Form.useForm();

	const onFinish = (values: any) => {
		CreateLogicTest(
			props.token,
			values,
			props.setActive,
			props.applicantId
		);
	};

	const onModalCancel = () => {
		form.resetFields();
		props.setActive(false);
	};

	return (
		<ModalWindow
			title={ModalTitles.CREATE_LOGIC_TEST}
			isActive={props.active}
			onCancel={onModalCancel}
		>
			<Form
				form={form}
				style={{ padding: 10 }}
				onFinish={onFinish}
				labelCol={{ flex: "60px" }}
				labelAlign="left"
				labelWrap
			>
				<Row gutter={25}>
					<Col span={25} key={1}>
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
							<InputNumber placeholder="0" min={1} max={100} style={{ width: 200 }}/>
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
							<DatePicker style={{ width: 200 }}/>
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

export default LogicTest;
