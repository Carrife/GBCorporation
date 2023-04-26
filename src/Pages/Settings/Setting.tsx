import { UpdatePassword } from "../../Actions/SettingActions";
import { Button, Form, Input, Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import Sidebar from "../../Components/Sidebar/Sidebar";
import "../../App.css";
import "./Setting.css";

const Setting = (props: { userId: string; role: string; token: string }) => {
	const [form] = Form.useForm();

	const onFinish = (values: any) => {
		console.log(values);
		UpdatePassword(props.token, props.userId, values);
	};

	return (
		<>
			<Layout className="layout">
				<Sidebar role={props.role} />
				<Layout className="setting-layout">
					<Content>
						<Form
							form={form}
							onFinish={onFinish}
							className="form-setting"
							layout={"vertical"}
						>
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
							<Form.Item
								name={`newPassword`}
								label={`New Password`}
								rules={[
									{
										required: true,
										message: "Empty field",
									},
								]}
							>
								<Input.Password />
							</Form.Item>
							<Form.Item
								name={`newPasswordConfirm`}
								label={`Confirm New Password `}
								rules={[
									{
										required: true,
										message: "Empty field",
									},
									({ getFieldValue }) => ({
										validator(_, value) {
											if (
												value &&
												getFieldValue("newPassword") !==
													value
											) {
												return Promise.reject(
													new Error(
														"Passwords are different"
													)
												);
											} else {
												return Promise.resolve();
											}
										},
									}),
								]}
							>
								<Input.Password />
							</Form.Item>
							<Button htmlType="submit" className="button">
								Save
							</Button>
						</Form>
					</Content>
				</Layout>
			</Layout>
		</>
	);
};

export default Setting;
