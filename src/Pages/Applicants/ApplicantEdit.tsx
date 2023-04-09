import ModalWindow from "../../Components/Modal/Modal";
import ModalTitles from "../../Enums/ModalTitles";
import { Button, Col, Form, Input, Row } from "antd";
import { UpdateApplicant } from "../../Actions/ApplicantActions";
import { useEffect } from "react";

const ApplicantEdit = (props: {
	active: boolean;
	setActive: (active: boolean) => void;
	applicant: any;
	token: string | null;
}) => {
	const [form] = Form.useForm();

	useEffect(() => {
		reset();
	}, [form, props.applicant]);

	const reset = () => {
		form.setFieldsValue({
			surnameRu: props.applicant?.surnameRu,
			nameRu: props.applicant?.nameRu,
			patronymicRu: props.applicant?.patronymicRu,
			nameEn: props.applicant?.nameEn,
			surnameEn: props.applicant?.surnameEn,
			phone: props.applicant?.phone,
		});
	}

	const onFinish = (values: any) => {
		UpdateApplicant(
			props.token,
			values,
			props.setActive,
			props.applicant.id
		);
	};

	return (
		<ModalWindow
			title={ModalTitles.EDIT_APPLICANT}
			isActive={props.active}
			setActive={props.setActive}
		>
			<Form
				form={form}
				style={{ padding: 10 }}
				onFinish={onFinish}
				labelCol={{ flex: "114px" }}
				labelAlign="left"
				labelWrap
			>
				<Row gutter={25}>
					<Col span={8} key={1}>
						<Form.Item
							name={`surnameRu`}
							label={`Surname Ru`}
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
							name={`nameRu`}
							label={`Name Ru`}
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
							name={`patronymicRu`}
							label={`Patronymic Ru`}
							rules={[
								{
									required: true,
									message: "Empty field",
								},
							]}
						>
							<Input />
						</Form.Item>
					</Col>
					<Col span={8} key={2}>
						<Form.Item
							name={`nameEn`}
							label={`Name En`}
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
							name={`surnameEn`}
							label={`Surname En`}
							rules={[
								{
									required: true,
									message: "Empty field",
								},
							]}
						>
							<Input />
						</Form.Item>
					</Col>
					<Col span={8} key={3}>
						<Form.Item
							name={`phone`}
							label={`Phone`}
							rules={[
								{
									required: true,
									message: "Empty field",
								},
							]}
						>
							<Input />
						</Form.Item>
					</Col>
				</Row>
				<Row>
					<Col span={24} style={{ textAlign: "right" }}>
						<Button type="primary" htmlType="submit">
							Save
						</Button>
						<Button
							style={{ margin: "0 8px" }}
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

export default ApplicantEdit;
