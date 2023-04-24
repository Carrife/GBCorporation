import ModalWindow from "../../Components/Modal/Modal";
import { UploadTemplate } from "../../Actions/TemplateActions";
import ModalTitles from "../../Enums/ModalTitles";
import { Button, Col, Form, Upload, UploadFile, UploadProps } from "antd";
import * as AiIcons from "react-icons/ai";
import { useEffect, useState } from "react";

const TemplateUpload = (props: {
	active: boolean;
	setActive: (active: boolean) => void;
	id: string;
	link: string;
	token: string | null;
}) => {
	const [fileList, setFileList] = useState<UploadFile[]>([]);
	const [form] = Form.useForm();

	useEffect(() => {
		if (props.link) {
			setFileList([
				{
					uid: "1",
					name: props.link.split('/').pop() ?? '',
					status: "done",
				},
			]);
		} else {
			setFileList([]);
		}
	}, [props.link, props.id, form]);

	const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
		setFileList(newFileList);

	const onFinish = (values: any) => {
		let file = values.file?.file !== undefined ? values.file.file : null;
		UploadTemplate(props.token, props.id, file, props.setActive);
	};

	return (
		<ModalWindow
			title={ModalTitles.UPLOAD_TEMPLATE}
			isActive={props.active}
			setActive={props.setActive}
		>
			<Form
				form={form}
				style={{ padding: 10 }}
				onFinish={onFinish}
				labelCol={{ flex: "55px" }}
				labelAlign="left"
				labelWrap
			>
				<Form.Item name={`file`} label={"File"}>
					<Upload
						fileList={fileList}
						maxCount={1}
						showUploadList={{ showRemoveIcon: false }}
						accept=".xml"
						beforeUpload={(file) => {
							if (file.type.includes("xml")) {
								return false;
							} else {
								return true;
							}
						}}
						onChange={handleChange}
					>
						<Button
							style={{ width: 100 }}
							icon={<AiIcons.AiOutlineUpload />}
						/>
					</Upload>
				</Form.Item>
				<Col span={24} style={{ textAlign: "right" }}>
					<Button type="primary" htmlType="submit">
						Submit
					</Button>
				</Col>
			</Form>
		</ModalWindow>
	);
};

export default TemplateUpload;
