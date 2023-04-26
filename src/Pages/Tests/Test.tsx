import React, { useState, useEffect } from "react";
import "../../App.css";
import TestStart from "./TestStart";
import {
	GetAllTests,
	Test,
	StartTest,
	TestData,
} from "../../Actions/TestActions";
import { Button, Layout, Space, Table } from "antd";
import { ColumnsType, TablePaginationConfig } from "antd/es/table";
import * as AiIcons from "react-icons/ai";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { TableParams } from "../../Interfaces/Table";
import { SorterResult } from "antd/es/table/interface";

interface DataType {
	key: React.Key;
	name: string;
}

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
	const { Content } = Layout;

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
			render: (_, record) => (
				<Space size="middle">
					<Button
						type="text"
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
