import React, { useState, useEffect } from "react";
import "../../App.css";
import EmployeeAdd from "./EmployeeAdd";
import EmployeeEdit from "./EmployeeEdit";
import EmployeeDetails from "./EmployeeData";
import * as AiIcons from "react-icons/ai";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import {
	EmployeeFired,
	GetAllEmployee,
	GetEmployeeById,
	GetTestData,
	GetEmployeeStatuses,
} from "../../Actions/EmployeeActions";
import {
	Button,
	Layout,
	Space,
	Table,
	FloatButton,
	Form,
	Input,
	Col,
	Select,
	Popconfirm,
} from "antd";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { TableParams } from "../../Interfaces/Table";
import { SorterResult } from "antd/es/table/interface";
import Filter from "../../Components/Filter/Filter";
import { Short } from "../../Interfaces/Short";
import { GetDepartments, GetPositions } from "../../Actions/HiringActions";
import { Employee, EmployeeData } from "../../Interfaces/Employees";
import { EmployeeTestData } from "../../Interfaces/Tests";

interface DataType {
	key: React.Key;
	nameRu: string;
	nameEn: string;
	login: string;
	phone: string;
	email: string;
	department: string;
	position: string;
	status: string;
}

const Employees = (props: { role: string; token: string; userId: string }) => {
	const [form] = Form.useForm();
	const [employees, setEmployees] = useState<Employee[]>([]);
	const [testData, setTestData] = useState<EmployeeTestData[]>([]);
	const [employee, setEmployee] = useState<EmployeeData>();
	const [departments, setDepartments] = useState<Short[]>([]);
	const [positions, setPositions] = useState<Short[]>([]);
	const [statuses, setStatuses] = useState<Short[]>([]);
	const [modalAddActive, setModalAddActive] = useState(false);
	const [modalEditActive, setModalEditActive] = useState(false);
	const [modalDataActive, setModalDataActive] = useState(false);
	const [isFilterActive, setIsFilterActive] = useState(false);
	const [tableParams, setTableParams] = useState<TableParams>({
		pagination: {
			current: 1,
			pageSize: 6,
		},
	});
	const { Content } = Layout;

	const columns: ColumnsType<DataType> = [
		{
			title: "Name (Ru)",
			dataIndex: "nameRu",
			key: "nameRu",
			sorter: {
				compare: (a, b) =>
					a.nameRu.toLowerCase() < b.nameRu.toLowerCase() ? 1 : -1,
			},
		},
		{
			title: "Name (En)",
			dataIndex: "nameEn",
			key: "nameEn",
			sorter: {
				compare: (a, b) =>
					a.nameRu.toLowerCase() < b.nameRu.toLowerCase() ? 1 : -1,
			},
		},
		{
			title: "Login",
			dataIndex: "login",
			key: "login",
			sorter: {
				compare: (a, b) =>
					a.nameRu.toLowerCase() < b.nameRu.toLowerCase() ? 1 : -1,
			},
		},
		{
			title: "Department",
			dataIndex: "department",
			key: "department",
			sorter: {
				compare: (a, b) =>
					a.nameRu.toLowerCase() < b.nameRu.toLowerCase() ? 1 : -1,
			},
		},
		{
			title: "Position",
			dataIndex: "position",
			key: "position",
			sorter: {
				compare: (a, b) =>
					a.nameRu.toLowerCase() < b.nameRu.toLowerCase() ? 1 : -1,
			},
		},
		{
			title: "Status",
			dataIndex: "status",
			key: "status",
		},
		{
			title: "",
			key: "action",
			render: (_, record) => (
				<Space size="middle">
					{props.role === "Admin" && (
						<Button
							type="text"
							onClick={() => employeeEdit(record.key.toString())}
						>
							<AiIcons.AiOutlineEdit />
						</Button>
					)}
					<Button
						type="text"
						onClick={() => employeeData(record.key.toString())}
					>
						<AiIcons.AiOutlineUnorderedList />
					</Button>
					{props.role === "Admin" && (
						<Popconfirm
							title="Must be fired?"
							onConfirm={() =>
								employeeFired(record.key.toString())
							}
						>
							<Button type="text">
								<AiIcons.AiOutlineDelete />
							</Button>
						</Popconfirm>
					)}
				</Space>
			),
		},
	];

	useEffect(() => {
		GetAllEmployee(props.token, null).then((result) =>
			setEmployees(result)
		);
		GetDepartments(props.token).then((result) => setDepartments(result));
		GetPositions(props.token).then((result) => setPositions(result));
		GetEmployeeStatuses(props.token).then((result) => setStatuses(result));
	}, [props.token]);

	const handleTableChange = (
		pagination: TablePaginationConfig,
		sorter: SorterResult<DataType>
	) => {
		setTableParams({
			pagination,
			...sorter,
		});
	};

	const employeeFired = async (id: string) => {
		EmployeeFired(props.token, id);
	};

	const employeeEdit = async (id: string) => {
		GetEmployeeById(props.token, id).then((result) => setEmployee(result));
		setModalEditActive(true);
	};

	const employeeData = async (id: string) => {
		GetEmployeeById(props.token, id).then((result) => setEmployee(result));
		GetTestData(props.token, id).then((result) => setTestData(result));
		setModalDataActive(true);
	};

	const filterView = () => {
		setIsFilterActive(true);
	};

	const onFilterSearch = (values: any) => {
		GetAllEmployee(props.token, values).then((result) =>
			setEmployees(result)
		);
		setIsFilterActive(false);
	};

	const onFilterReset = () => {
		GetAllEmployee(props.token, null).then((result) =>
			setEmployees(result)
		);
		form.resetFields();
	};

	return (
		<Layout className="layout">
			<Sidebar role={props.role} />
			<Layout className="page-layout">
				<Content>
					{props.role === "Admin" && (
						<Button
							type="link"
							onClick={() => setModalAddActive(true)}
						>
							Create New
						</Button>
					)}
					<Table
						columns={columns}
						dataSource={employees}
						pagination={tableParams.pagination}
						onChange={handleTableChange}
					/>
					<FloatButton
						icon={<AiIcons.AiOutlineSearch />}
						type="primary"
						style={{ top: 90, right: 30 }}
						onClick={filterView}
					/>
					<Filter
						isActive={isFilterActive}
						setActive={setIsFilterActive}
					>
						<Form
							form={form}
							onFinish={onFilterSearch}
							layout={"vertical"}
						>
							<Form.Item name={`nameRu`} label={`Name (Ru)`}>
								<Input />
							</Form.Item>
							<Form.Item
								name={`surnameRu`}
								label={`Surname (Ru)`}
							>
								<Input />
							</Form.Item>
							<Form.Item
								name={`patronymicRu`}
								label={`Patronymic (Ru)`}
							>
								<Input />
							</Form.Item>
							<Form.Item name={`nameEn`} label={`Name (En)`}>
								<Input />
							</Form.Item>
							<Form.Item
								name={`surnameEn`}
								label={`Surname (En)`}
							>
								<Input />
							</Form.Item>
							<Form.Item name={`login`} label={`Login`}>
								<Input />
							</Form.Item>
							<Form.Item
								name={`departmentIds`}
								label={`Department`}
							>
								<Select>
									{departments.map((item) => (
										<Select.Option
											value={item.id}
											key={item.key}
										>
											{item.name}
										</Select.Option>
									))}
								</Select>
							</Form.Item>
							<Form.Item name={`positionIds`} label={`Position`}>
								<Select>
									{positions.map((item) => (
										<Select.Option
											value={item.id}
											key={item.key}
										>
											{item.name}
										</Select.Option>
									))}
								</Select>
							</Form.Item>
							<Form.Item name={`statusIds`} label={`Status`}>
								<Select>
									{statuses.map((item) => (
										<Select.Option
											value={item.id}
											key={item.key}
										>
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
					<EmployeeAdd
						active={modalAddActive}
						setActive={setModalAddActive}
						token={props.token}
					/>
					<EmployeeDetails
						active={modalDataActive}
						setActive={setModalDataActive}
						employee={employee}
						userId={props.userId}
						role={props.role}
						testData={testData}
					/>
					<EmployeeEdit
						active={modalEditActive}
						setActive={setModalEditActive}
						employee={employee}
						token={props.token}
					/>
				</Content>
			</Layout>
		</Layout>
	);
};

export default Employees;
