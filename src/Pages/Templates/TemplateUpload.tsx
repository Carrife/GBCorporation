import ModalWindow from "../../Components/Modal/Modal";
import { GetAllTemplates, UploadTemplate } from "../../Actions/TemplateActions";
import ModalTitles from "../../Enums/ModalTitles";
import { Button, Col, Form, Upload, UploadFile, UploadProps } from "antd";
import * as AiIcons from "react-icons/ai";
import { useEffect, useState } from "react";
import { Template } from "../../Interfaces/Templates";

const TemplateUpload = (props: {
	active: boolean;
	setActive: (active: boolean) => void;
	id: string;
	link: string;
	token: string | null;
	setTemplates: React.Dispatch<React.SetStateAction<Template[]>>;
}) => {
	const [fileList, setFileList] = useState<UploadFile[]>([]);
	const [form] = Form.useForm();

	useEffect(() => {
		reset();
	}, [props.link, props.id, form]);

	const reset = () => {
		if (props.link) {
			setFileList([
				{
					uid: "1",
					name: props.link.split("/").pop() ?? "",
					status: "done",
				},
			]);
		} else {
			setFileList([]);
		}
	};

	const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
		setFileList(newFileList);

	const onFinish = (values: any) => {
		let file = values.file?.file !== undefined ? values.file.file : null;
		UploadTemplate(props.token, props.id, file, props.setActive);
		GetAllTemplates(props.token).then((result) => props.setTemplates(result));
	};

	const onModalCancel = () => {
		reset();
		props.setActive(false);
	};

	return (
		<ModalWindow
			title={ModalTitles.UPLOAD_TEMPLATE}
			isActive={props.active}
			onCancel={onModalCancel}
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
