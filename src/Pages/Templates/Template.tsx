import React, { useState, useEffect } from "react";
import "../../App.css";
import TemplateAdd from "./TemplateAdd";
import TemplateUpload from "./TemplateUpload";
import * as AiIcons from "react-icons/ai";
import Sidebar from "../../Components/Sidebar/Sidebar";
import {
	GetAllTemplates,
	Template,
	TemplateDelete,
	TemplateDownload,
} from "../../Actions/TemplateActions";
import { Button, Layout, Space, Table } from "antd";
import { ColumnsType, TableProps } from "antd/es/table";

const Templates = (props: { role: string; token: string }) => {
	const [id, setId] = useState("");
	const [link, setLink] = useState("");
	const [templates, setTemplates] = useState<Template[]>([]);
	const [modalAddActive, setModalAddActive] = useState(false);
	const [modalUploadActive, setModalUploadActive] = useState(false);
	const { Content } = Layout;

	interface DataType {
		key: React.Key;
		name: string;
		link: string;
		lastUpdate: string;
	}

	const columns: ColumnsType<DataType> = [
		{
			title: "Title",
			dataIndex: "name",
			key: "title",
			sorter: {
				compare: (a, b) =>
					a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1,
			},
		},
		{
			title: "Link",
			key: "link",
			render: (_, record) => (
				<Button
					type="link"
					onClick={() =>
						templateDownload(record.key.toString(), record.name)
					}
				>
					{record.link != null ? "Link" : ""}
				</Button>
			),
		},
		{
			title: "Last Update",
			dataIndex: "lastUpdate",
			key: "lastUpdate",
		},
		{
			title: "",
			key: "action",
			render: (_, record) => (
				<Space size="middle">
					<Button
						type="text"
						onClick={() =>
							templateUpload(record.key.toString(), record.link)
						}
					>
						<AiIcons.AiOutlineUpload />
					</Button>
					<Button
						type="text"
						onClick={() => templateDelete(record.key.toString())}
					>
						<AiIcons.AiOutlineDelete />
					</Button>
				</Space>
			),
		},
	];

	useEffect(() => {
		((load) => {
			if (window.localStorage.getItem("token") === "undefined") {
				window.location.href = "/";
			} else {
				GetAllTemplates(props.token).then((result) =>
					setTemplates(result)
				);
			}
		})();
	}, [props.token]);

	const templateDelete = async (id: string) => {
		TemplateDelete(props.token, id);
	};

	const templateDownload = async (id: string, title: string) => {
		TemplateDownload(props.token, id, title);
	};

	const templateUpload = async (id: string, link: string) => {
		setLink(link);
		setId(id);
		setModalUploadActive(true);
	};

	const onChange: TableProps<DataType>["onChange"] = (
		pagination,
		filters,
		sorter,
		extra
	) => {
		console.log("params", pagination, filters, sorter, extra);
	};

	return (
		<Layout className="layout">
			<Sidebar role={props.role} />
			<Layout className="page-layout">
				<Content>
					<Button type="link" onClick={() => setModalAddActive(true)}>
						Create New
					</Button>
					<Table
						columns={columns}
						dataSource={templates}
						onChange={onChange}
					/>
					<TemplateAdd
						active={modalAddActive}
						setActive={setModalAddActive}
						token={props.token}
					/>
					<TemplateUpload
						active={modalUploadActive}
						setActive={setModalUploadActive}
						id={id}
						link={link}
						token={props.token}
					/>
				</Content>
			</Layout>
		</Layout>
	);
};

export default Templates;
