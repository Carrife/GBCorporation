import React, { useState, useEffect, useRef } from "react";
import "../../App.css";
import TestStart from "./TestStart";
import {
	GetAllTests,
	StartTest,
} from "../../Actions/TestActions";
import { Button, Input, InputRef, Layout, Space, Table } from "antd";
import { ColumnsType, TablePaginationConfig } from "antd/es/table";
import * as AiIcons from "react-icons/ai";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { TableParams } from "../../Interfaces/Table";
import {
	ColumnType,
	FilterConfirmProps,
	SorterResult,
} from "antd/es/table/interface";
import { Test, TestData } from "../../Interfaces/Tests";

interface DataType {
	key: React.Key;
	name: string;
}

type DataIndex = keyof DataType;

const Tests = (props: { userId: string; role: string; token: string }) => {
	const [templates, setTemplates] = useState<Test[]>([]);
	const [modalStartActive, setModalStartActive] = useState(false);
	const [testName, setTestName] = useState("");
	const [testData, setTestData] = useState<TestData[]>([]);
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
			width: 900,
			sorter: {
				compare: (a, b) =>
					a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1,
			},
		},
		{
			title: "",
			key: "action",
			...getColumnSearchProps("name"),
			render: (_, record) => (
				<Space size="middle">
					<Button
						style={{marginLeft: 30}} type="text"
						onClick={() =>
							startTest(record.key.toString(), record.name)
						}
					>
						<AiIcons.AiOutlineAudit />
					</Button>
				</Space>
			),
		},
	];

	useEffect(() => {
		GetAllTests(props.token).then((result) => setTemplates(result));
	}, [props.token]);

	const startTest = async (id: string, name: string) => {
		StartTest(props.token, id).then((result) => setTestData(result));
		setTestName(name);
		setModalStartActive(true);
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
					<Table
						columns={columns}
						dataSource={templates}
						pagination={tableParams.pagination}
						onChange={handleTableChange}
					/>
					<TestStart
						active={modalStartActive}
						setActive={setModalStartActive}
						testData={testData}
						testName={testName}
						userId={props.userId}
						token={props.token}
					/>
				</Content>
			</Layout>
		</Layout>
	);
};

export default Tests;
