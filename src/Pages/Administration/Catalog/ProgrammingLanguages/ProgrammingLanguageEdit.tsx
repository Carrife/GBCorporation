import { Button, Col, Form, Input, Row } from "antd";
import { useEffect } from "react";
import ModalWindow from "../../../../Components/Modal/Modal";
import ModalTitles from "../../../../Enums/ModalTitles";
import { UpdateProgrammingLanguage } from "../../../../Actions/AdministrationActions";

const ProgrammingLanguageEdit = (props: {
	active: boolean;
	setActive: (active: boolean) => void;
	language: any;
	token: string | null;
}) => {
	const [form] = Form.useForm();

	useEffect(() => {
		reset();
	}, [props.language]);

	const reset = () => {
		form.setFieldsValue({
			title: props.language?.title,
		});
	};

	const onFinish = (values: any) => {
		UpdateProgrammingLanguage(
			props.token,
			values.title,
			props.setActive,
			props.language.id
		);
	};

	return (
		<ModalWindow
			title={ModalTitles.EDIT_PROGRAMMING_LANGUAGE}
			isActive={props.active}
			setActive={props.setActive}
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

export default ProgrammingLanguageEdit;
