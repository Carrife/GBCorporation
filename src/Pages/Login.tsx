import { Button, Form, Input } from "antd";
import { LogIn } from "../Actions/AuthActions";

const Login = () => {
	const [form] = Form.useForm();

	const onFinish = (values: any) => {
		LogIn(values);
	};

	return (
		<Form
			form={form}
			onFinish={onFinish}
			labelCol={{ flex: "80px" }}
			labelAlign="left"
			className="form-signin"
		>
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
			<Form.Item
				name={`password`}
				label={`Password`}
				rules={[
					{
						required: true,
						message: "Empty field",
					},
				]}
			>
				<Input.Password />
			</Form.Item>
			<Button htmlType="submit" className="button">
				Log in
			</Button>
		</Form>
	);
};

export default Login;
