import React, { useState, useEffect } from "react";
import TestStart from "./TestStart";
import {
	GetAllTests,
	GetTestCompetenciesStatuses,
	GetUserTests,
	StartTest,
} from "../../../Actions/TestActions";
import {
	Button,
	Col,
	FloatButton,
	Form,
	Input,
	Select,
	Space,
	Table,
} from "antd";
import { ColumnsType, TablePaginationConfig } from "antd/es/table";
import * as AiIcons from "react-icons/ai";
import { TableParams } from "../../../Interfaces/Table";
import { SorterResult } from "antd/es/table/interface";
import { TestData, UserTest } from "../../../Interfaces/Tests";
import Role from "../../../Enums/RoleEnum";
import TestCompetenciesAdd from "./TestCompetenciesAdd";
import Filter from "../../../Components/Filter/Filter";
import { Short } from "../../../Interfaces/Short";

interface DataType {
	key: React.Key;
	id: number;
	employee: string | null;
	test: string;
	status: string;
}

const TestProgress = (props: {
	userId: string;
	role: string;
	token: string;
}) => {
	const [tests, setTests] = useState<UserTest[]>([]);
	const [testTitles, setTestTitles] = useState<Short[]>([]);
	const [testData, setTestData] = useState<TestData[]>([]);
	const [statuses, setStatuses] = useState<Short[]>([]);
	const [modalStartActive, setModalStartActive] = useState(false);
	const [modalAddActive, setModalAddActive] = useState(false);
	const [isFilterActive, setIsFilterActive] = useState(false);
	const [testName, setTestName] = useState("");
	const [testId, setTestId] = useState("");
	const [form] = Form.useForm();
	const [tableParams, setTableParams] = useState<TableParams>({
		pagination: {
			current: 1,
			pageSize: 6,
		},
	});

	const managerColumns: ColumnsType<DataType> = [
		{
			title: "Employee",
			dataIndex: "employee",
			key: "employee",
			width: 900,
			sorter: {
				compare: (a, b) => {
					if (a.employee && b.employee) {
						return a.employee.toLowerCase() <
							b.employee.toLowerCase()
							? 1
							: -1;
					} else {
						return 1;
					}
				},
			},
		},
		{
			title: "Test",
			dataIndex: "test",
			key: "test",
			width: 900,
			sorter: {
				compare: (a, b) =>
					a.test.toLowerCase() < b.test.toLowerCase() ? 1 : -1,
			},
		},
		{
			title: "Status",
			dataIndex: "status",
			key: "status",
			width: 900,
			sorter: {
				compare: (a, b) =>
					a.status.toLowerCase() < b.status.toLowerCase() ? 1 : -1,
			},
		},
	];

	const commonColumns: ColumnsType<DataType> = [
		{
			title: "Test",
			dataIndex: "test",
			key: "test",
			width: 900,
			sorter: {
				compare: (a, b) =>
					a.test.toLowerCase() < b.test.toLowerCase() ? 1 : -1,
			},
		},
		{
			title: "Status",
			dataIndex: "status",
			key: "status",
			width: 900,
			sorter: {
				compare: (a, b) =>
					a.status.toLowerCase() < b.status.toLowerCase() ? 1 : -1,
			},
		},
		{
			title: "",
			key: "action",
			render: (_, record) => (
				<Space size="middle">
					{record.status === "Open" && (
						<Button
							style={{ marginLeft: 30 }}
							type="text"
							onClick={() =>
								startTest(record.key.toString(), record.test)
							}
						>
							<AiIcons.AiOutlineAudit />
						</Button>
					)}
				</Space>
			),
		},
	];

	useEffect(() => {
		GetUserTests(props.token, props.userId, props.role, null).then(
			(result) => setTests(result)
		);
		GetAllTests(props.token).then((result) => setTestTitles(result));
		GetTestCompetenciesStatuses(props.token).then((result) =>
			setStatuses(result)
		);
	}, [props.token, props.role, props.userId]);

	const startTest = async (id: string, name: string) => {
		StartTest(props.token, id).then((result) => setTestData(result));
		setTestName(name);
		setTestId(id);
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

	const filterView = () => {
		setIsFilterActive(true);
	};

	const onFilterSearch = (values: any) => {
		GetUserTests(props.token, props.userId, props.role, values).then(
			(result) => setTests(result)
		);
		setIsFilterActive(false);
	};

	const onFilterReset = () => {
		GetUserTests(props.token, props.userId, props.role, null).then(
			(result) => setTests(result)
		);
		form.resetFields();
	};

	return (
		<>
			{(props.role === Role.ADMIN || props.role === Role.LM) && (
				<Button type="link" onClick={() => setModalAddActive(true)}>
					Create New
				</Button>
			)}
			<Table
				columns={
					props.role === Role.ADMIN || props.role === Role.LM
						? managerColumns
						: commonColumns
				}
				dataSource={tests}
				pagination={tableParams.pagination}
				onChange={handleTableChange}
			/>
			<FloatButton
				icon={<AiIcons.AiOutlineSearch />}
				type="primary"
				style={{ top: 90, right: 30 }}
				onClick={filterView}
			/>
			<Filter isActive={isFilterActive} setActive={setIsFilterActive}>
				<Form form={form} onFinish={onFilterSearch} layout={"vertical"}>
					{(props.role === Role.ADMIN || props.role === Role.LM) && (
						<Form.Item name={`login`} label={`Login`}>
							<Input />
						</Form.Item>
					)}
					<Form.Item name={`test`} label={`Test`}>
						<Select>
							{testTitles.map((item) => (
								<Select.Option value={item.name} key={item.key}>
									{item.name}
								</Select.Option>
							))}
						</Select>
					</Form.Item>
					<Form.Item name={`statusIds`} label={`Status`}>
						<Select>
							{statuses.map((item) => (
								<Select.Option value={item.id} key={item.key}>
									{item.name}
								</Select.Option>
							))}
						</Select>
					</Form.Item>
					<Col span={24} style={{ textAlign: "right" }}>
						<Button type="primary" htmlType="submit">
							Search
						</Button>
						<Button
							style={{ margin: "0 8px" }}
							onClick={() => {
								onFilterReset();
							}}
						>
							Clear
						</Button>
					</Col>
				</Form>
			</Filter>
			<TestCompetenciesAdd
				active={modalAddActive}
				setActive={setModalAddActive}
				token={props.token}
				userId={props.userId}
				role={props.role}
				setTests={setTests}
			/>
			<TestStart
				active={modalStartActive}
				setActive={setModalStartActive}
				testData={testData}
				testName={testName}
				userId={props.userId}
				role={props.role}
				token={props.token}
				competenceId={testId}
				setTests={setTests}
			/>
		</>
	);
};

export default TestProgress;
