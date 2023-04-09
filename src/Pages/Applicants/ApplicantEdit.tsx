import ModalWindow from "../../Components/Modal/Modal";
import ModalTitles from "../../Enums/ModalTitles";
import { Button, Col, Form, Input, Row } from "antd";
import { UpdateApplicant } from "../../Actions/ApplicantActions";

const ApplicantEdit = (props: {
	active: boolean;
	setActive: (active: boolean) => void;
	applicant: any;
	token: string | null;
}) => {
	const [form] = Form.useForm();

	const onFinish = (values: any) => {
		UpdateApplicant(
			props.token,
			values,
			props.setActive,
			props.applicant.id
		);
	};

	return props.applicant?.nameRu ? (
		<ModalWindow
			title={ModalTitles.EDIT_APPLICANT}
			isActive={props.active}
			setActive={props.setActive}
		>
			<Form
				form={form}
				style={{padding: 10}}
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
							initialValue={props.applicant?.surnameRu}
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
							initialValue={props.applicant?.nameRu}
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
							initialValue={props.applicant?.patronymicRu}
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
							initialValue={props.applicant?.nameEn}
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
							initialValue={props.applicant?.surnameEn}
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
							initialValue={props.applicant?.phone}
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
								form.resetFields();
							}}
						>
							Reset
						</Button>
					</Col>
				</Row>
			</Form>
		</ModalWindow>
	) : (
		<></>
	);
};

export default ApplicantEdit;
