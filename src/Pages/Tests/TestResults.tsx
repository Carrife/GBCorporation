import {
	Button,
	Col,
	FloatButton,
	Form,
	Input,
	Select,
	Table,
	TablePaginationConfig,
} from "antd";
import "../../App.css";
import { useEffect, useState } from "react";
import * as AiIcons from "react-icons/ai";
import { ColumnsType, SorterResult } from "antd/es/table/interface";
import { TableParams } from "../../Interfaces/Table";
import { Short } from "../../Interfaces/Short";
import Role from "../../Enums/RoleEnum";
import Filter from "../../Components/Filter/Filter";
import { GetAllTests, GetUserResults } from "../../Actions/TestActions";
import { UserTestResults } from "../../Interfaces/Tests";

interface DataType {
	key: React.Key;
	id: number;
	employee: string | null;
	test: string;
	result: string;
    date: string;
}

const TestResults = (props: {
	userId: string;
	role: string;
	token: string;
}) => {
	const [results, setResults] = useState<UserTestResults[]>([]);
	const [testTitles, setTestTitles] = useState<Short[]>([]);
	const [isFilterActive, setIsFilterActive] = useState(false);
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
			title: "Result",
			dataIndex: "result",
			key: "result",
			width: "15%",
			sorter: {
				compare: (a, b) =>
					a.result.toLowerCase() < b.result.toLowerCase() ? 1 : -1,
			},
		},
        {
			title: "Date",
			dataIndex: "date",
			key: "sate",
			width: 900,
			sorter: {
				compare: (a, b) =>
					a.result.toLowerCase() < b.result.toLowerCase() ? 1 : -1,
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
			title: "Result",
			dataIndex: "result",
			key: "result",
			width: "15%",
			sorter: {
				compare: (a, b) =>
					a.result.toLowerCase() < b.result.toLowerCase() ? 1 : -1,
			},
		},
        {
			title: "Date",
			dataIndex: "date",
			key: "sate",
			width: 900,
			sorter: {
				compare: (a, b) =>
					a.result.toLowerCase() < b.result.toLowerCase() ? 1 : -1,
			},
		},
	];

	useEffect(() => {
		if (props.role === Role.ADMIN || props.role === Role.LM) {
			GetUserResults(props.token, "", null).then((result) =>
				setResults(result)
			);
		} else {
			GetUserResults(props.token, props.userId, null).then((result) =>
				setResults(result)
			);
		}

		GetAllTests(props.token).then((result) => setTestTitles(result));
	}, [props.token, props.role, props.userId]);

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
		if (props.role === Role.ADMIN || props.role === Role.LM) {
			GetUserResults(props.token, "", values).then((result) =>
				setResults(result)
			);
		} else {
			GetUserResults(props.token, props.userId, values).then((result) =>
				setResults(result)
			);
		}
		setIsFilterActive(false);
	};

	const onFilterReset = () => {
		if (props.role === Role.ADMIN || props.role === Role.LM) {
			GetUserResults(props.token, "", null).then((result) =>
				setResults(result)
			);
		} else {
			GetUserResults(props.token, props.userId, null).then((result) =>
				setResults(result)
			);
		}
		form.resetFields();
	};

	return (
		<>
			<Table
				columns={
					props.role === Role.ADMIN || props.role === Role.LM
						? managerColumns
						: commonColumns
				}
				dataSource={results}
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
		</>
	);
};

export default TestResults;
