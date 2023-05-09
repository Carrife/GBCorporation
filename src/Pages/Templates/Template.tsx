import React, { useState, useEffect, useRef } from "react";
import "../../App.css";
import TemplateAdd from "./TemplateAdd";
import TemplateUpload from "./TemplateUpload";
import * as AiIcons from "react-icons/ai";
import {
	GetAllTemplates,
	TemplateDelete,
	TemplateDownload,
} from "../../Actions/TemplateActions";
import {
	Button,
	Input,
	InputRef,
	Layout,
	Popconfirm,
	Space,
	Table,
} from "antd";
import { ColumnsType, TablePaginationConfig } from "antd/es/table";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { TableParams } from "../../Interfaces/Table";
import {
	ColumnType,
	FilterConfirmProps,
	SorterResult,
} from "antd/es/table/interface";
import { Template } from "../../Interfaces/Templates";

interface DataType {
	key: React.Key;
	name: string;
	link: string;
	lastUpdate: string;
}

type DataIndex = keyof DataType;

const Templates = (props: { role: string; token: string }) => {
	const [id, setId] = useState("");
	const [link, setLink] = useState("");
	const [templates, setTemplates] = useState<Template[]>([]);
	const [modalAddActive, setModalAddActive] = useState(false);
	const [modalUploadActive, setModalUploadActive] = useState(false);
	const [tableParams, setTableParams] = useState<TableParams>({
		pagination: {
			current: 1,
			pageSize: 6,
		},
	});
	const searchInput = useRef<InputRef>(null);
	const { Content } = Layout;

	const handleSearch = (confirm: (param?: FilterConfirmProps) => void) => {
		confirm();
	};

	const handleReset = (
		clearFilters: () => void,
		confirm: (param?: FilterConfirmProps) => void
	) => {
		clearFilters();
		confirm({ closeDropdown: false });
	};

	const getColumnSearchProps = (
		dataIndex: DataIndex
	): ColumnType<DataType> => ({
		filterDropdown: ({
			setSelectedKeys,
			selectedKeys,
			confirm,
			clearFilters,
		}) => (
			<div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
				<Input
					ref={searchInput}
					placeholder={`Search title`}
					value={selectedKeys[0]}
					onChange={(e) =>
						setSelectedKeys(e.target.value ? [e.target.value] : [])
					}
					onPressEnter={() => handleSearch(confirm)}
					style={{ marginBottom: 8, display: "block" }}
				/>
				<Space>
					<Button
						type="primary"
						onClick={() => handleSearch(confirm)}
						icon={<AiIcons.AiOutlineSearch />}
						size="small"
						style={{ width: 90 }}
					>
						Search
					</Button>
					<Button
						onClick={() => {
							clearFilters && handleReset(clearFilters, confirm);
						}}
						size="small"
						style={{ width: 90 }}
					>
						Reset
					</Button>
				</Space>
			</div>
		),
		filterIcon: (filtered: boolean) => (
			<div
				className="table-search"
				style={{ width: 100, paddingLeft: 40 }}
			>
				<AiIcons.AiOutlineSearch
					style={{ color: filtered ? "#1890ff" : undefined }}
				/>
			</div>
		),
		onFilter: (value, record) =>
			record[dataIndex]
				.toString()
				.toLowerCase()
				.includes((value as string).toLowerCase()),
		onFilterDropdownOpenChange: (visible) => {
			if (visible) {
				setTimeout(() => searchInput.current?.select(), 100);
			}
		},
	});

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
			width: 100,
			...getColumnSearchProps("name"),
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
					<Popconfirm
						title="Sure to delete?"
						onConfirm={() => templateDelete(record.key.toString())}
					>
						<Button type="text">
							<AiIcons.AiOutlineDelete />
						</Button>
					</Popconfirm>
				</Space>
			),
		},
	];

	useEffect(() => {
		GetAllTemplates(props.token).then((result) => setTemplates(result));
	}, [props.token]);

	const templateDelete = async (id: string) => {
		TemplateDelete(props.token, id);
		GetAllTemplates(props.token).then((result) => setTemplates(result));
	};

	const templateDownload = async (id: string, title: string) => {
		TemplateDownload(props.token, id, title);
	};

	const templateUpload = async (id: string, link: string) => {
		setLink(link);
		setId(id);
		setModalUploadActive(true);
	};

	const handleTableChange = (
		pagination: TablePaginationConfig,
		sorter: SorterResult<DataType>
	) => {
		setTableParams({
			pagination,
			...sorter,
		});
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
						pagination={tableParams.pagination}
						onChange={handleTableChange}
					/>
					<TemplateAdd
						active={modalAddActive}
						setActive={setModalAddActive}
						token={props.token}
						setTemplates={setTemplates}
					/>
					<TemplateUpload
						active={modalUploadActive}
						setActive={setModalUploadActive}
						id={id}
						link={link}
						token={props.token}
						setTemplates={setTemplates}
					/>
				</Content>
			</Layout>
		</Layout>
	);
};

export default Templates;
