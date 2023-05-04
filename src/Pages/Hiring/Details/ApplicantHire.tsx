import { useEffect, useState } from "react";
import { Button, Col, Divider, Form, Input, Row, Select } from "antd";
import {
	GetApplicantHiringData,
	GetDepartments,
	GetPositions,
	Hire,
} from "../../../Actions/HiringActions";
import ModalWindow from "../../../Components/Modal/Modal";
import ModalTitles from "../../../Enums/ModalTitles";
import { GetProgrammingLanguages } from "../../../Actions/ApplicantActions";
import { Short } from "../../../Interfaces/Short";
import { HiringAccept } from "../../../Interfaces/Hirings";

const ApplicantHire = (props: {
	active: boolean;
	hiringId: string;
	setActive: (active: boolean) => void;
	role: string;
	token: string | null;
}) => {
	const [form] = Form.useForm();
	const [applicant, setApplicant] = useState<HiringAccept>();
	const [positions, setPositions] = useState<Short[]>([]);
	const [departments, setDepartments] = useState<Short[]>([]);
	const [languages, setLanguages] = useState<Short[]>([]);
	const [isDisabled, setIsDisabled] = useState(false);
	
	useEffect(() => {
		if (props.hiringId) {
			GetApplicantHiringData(props.token, props.hiringId).then((result) =>
				setApplicant(result)
			);
		}
		GetPositions(props.token).then((result) => setPositions(result));
		GetDepartments(props.token).then((result) => setDepartments(result));
		GetProgrammingLanguages(props.token).then((result) =>
			setLanguages(result)
		);
		onChangePosition(applicant?.positionId);
	}, [props.token, props.hiringId, applicant?.positionId]);

	const onFinish = (values: any) => {
		Hire(props.token, props.hiringId, props.setActive, values);
	};

	const onChangePosition = (value: any) => {
		if (
			positions
				.find((item) => item.id === value)
				?.name.toLowerCase()
				.includes("developer")
		)
			setIsDisabled(false);
		else {
			form.resetFields(["programmingLanguage"]);
			setIsDisabled(true);
		}
	};

	const onModalCancel = () => {
		form.resetFields();
		props.setActive(false);
	};

	return (
		<ModalWindow
			title={ModalTitles.HIRING}
			isActive={props.active}
			onCancel={onModalCancel}
		>
			<Form
				form={form}
				style={{ padding: 10 }}
				onFinish={onFinish}
				labelCol={{ flex: "120px" }}
				labelAlign="left"
				labelWrap
			>
				<Row gutter={25}>
					<Col span={12}>
						<Form.Item
							name={`surnameRu`}
							label={`Surname Ru`}
							initialValue={applicant?.surnameRu}
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
							initialValue={applicant?.nameRu}
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
							initialValue={applicant?.patronymicRu}
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
					<Col span={12}>
						<Form.Item
							name={`nameEn`}
							label={`Name En`}
							initialValue={applicant?.nameEn}
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
							initialValue={applicant?.surnameEn}
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
							name={`phone`}
							label={`Phone`}
							labelAlign="left"
							initialValue={applicant?.phone}
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
				<Divider plain>Specific data</Divider>
				<Row gutter={25}>
					<Col span={12}>
						<Form.Item
							name={`department`}
							label={`Department`}
							rules={[
								{
									required: true,
									message: "Empty field",
								},
							]}
						>
							<Select showSearch optionFilterProp="children">
								{departments.map((item) => (
									<Select.Option
										key={item.id}
										value={item.id}
									>
										{item.name}
									</Select.Option>
								))}
							</Select>
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item
							name={`position`}
							label={`Position`}
							initialValue={applicant?.positionId}
							rules={[
								{
									required: true,
									message: "Empty field",
								},
							]}
						>
							<Select
								showSearch
								optionFilterProp="children"
								onChange={onChangePosition}
							>
								{positions.map((item) => (
									<Select.Option
										key={item.id}
										value={item.id}
									>
										{item.name}
									</Select.Option>
								))}
							</Select>
						</Form.Item>
					</Col>
				</Row>
				<Col span={18}>
					<Form.Item
						name={`programmingLanguage`}
						label={`Programming Language`}
						labelAlign="right"
						labelCol={{
							span: 15,
						}}
					>
						<Select
							showSearch
							optionFilterProp="children"
							disabled={isDisabled}
						>
							{languages.map((item) => (
								<Select.Option key={item.id} value={item.id}>
									{item.name}
								</Select.Option>
							))}
						</Select>
					</Form.Item>
				</Col>
				<Row>
					<Col span={24} style={{ textAlign: "right" }}>
						<Button type="primary" htmlType="submit">
							Create
						</Button>
						<Button
							style={{ margin: "0 8px" }}
							onClick={() => {
								form.resetFields();
								onChangePosition(
									form.getFieldValue("position")
								);
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

export default ApplicantHire;
