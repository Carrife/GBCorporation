import React, { useState, useEffect } from "react";
import "../../App.css";
import Sidebar from "../../Components/Sidebar/Sidebar";
import TestStart from "./TestStart";
import { GetAllTests, Test, StartTest,TestData } from "../../Actions/TestActions";
import { Button, Layout, Space, Table } from "antd";
import { ColumnsType, TableProps } from "antd/es/table";
import * as AiIcons from "react-icons/ai";

const Tests = (props: { userId: string; role: string; token: string }) => {
	const [templates, setTemplates] = useState<Test[]>([]);
	const [modalStartActive, setModalStartActive] = useState(false);
	const [testName, setTestName] = useState("");
	const [testData, setTestData] = useState<TestData[]>([]);
	const { Content } = Layout;

	interface DataType {
		key: React.Key;
		name: string;
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
		if (window.localStorage.getItem("token") === "undefined") {
			window.location.href = "/";
		} else {
			GetAllTests(props.token).then((result) => setTemplates(result));
		}
	}, [props.token]);

	const startTest = async (id: string, name: string) => {
		StartTest(props.token, id).then((result) => setTestData(result));
		setTestName(name);
		setModalStartActive(true);
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
					<Table
						columns={columns}
						dataSource={templates}
						onChange={onChange}
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
