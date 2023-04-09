import React, { useState, useEffect } from "react";
import "../../App.css";
import EmployeeAdd from "./EmployeeAdd";
import EmployeeEdit from "./EmployeeEdit";
import EmployeeDetails from "./EmployeeData";
import * as AiIcons from "react-icons/ai";
import Sidebar from "../../Components/Sidebar/Sidebar";
import type { ColumnsType, TableProps } from "antd/es/table";
import {
	Employee,
	EmployeeData,
	EmployeeFired,
	GetAllEmployee,
	GetEmployeeById,
} from "../../Actions/EmployeeActions";
import { Button, Layout, Space, Table } from "antd";

const Employees = (props: { role: string; token: string }) => {
	const [employees, setEmployees] = useState<Employee[]>([]);
	const [employee, setEmployee] = useState<EmployeeData>();
	const [modalAddActive, setModalAddActive] = useState(false);
	const [modalEditActive, setModalEditActive] = useState(false);
	const [modalDataActive, setModalDataActive] = useState(false);
	const { Content } = Layout;

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
					{props.role === "Admin" ? (
						<Button
							type="text"
							onClick={() => employeeEdit(record.key.toString())}
						>
							<AiIcons.AiOutlineEdit />
						</Button>
					) : (
						""
					)}
					<Button
						type="text"
						onClick={() => employeeData(record.key.toString())}
					>
						<AiIcons.AiOutlineUnorderedList />
					</Button>
					{props.role === "Admin" ? (
						<Button
							type="text"
							onClick={() => employeeFired(record.key.toString())}
						>
							<AiIcons.AiOutlineDelete />
						</Button>
					) : (
						""
					)}
				</Space>
			),
		},
	];

	useEffect(() => {
		((load) => {
			if (window.localStorage.getItem("login") === "true") {
				window.localStorage.setItem("login", "false");
				window.location.reload();
			}

			if (window.localStorage.getItem("login") === "false") {
				if (window.localStorage.getItem("token") === "undefined") {
					window.location.href = "/";
				} else {
					GetAllEmployee(props.token).then((result) =>
						setEmployees(result)
					);
				}
			}
		})();
	}, [props.token]);

	const onChange: TableProps<DataType>["onChange"] = (
		pagination,
		filters,
		sorter,
		extra
	) => {
		console.log("params", pagination, filters, sorter, extra);
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
		setModalDataActive(true);
	};

	return (
		<Layout className="layout">
			<Sidebar role={props.role} />
			<Layout className="page-layout">
				<Content>
					{props.role === "Admin" ? (
						<Button
							type="link"
							onClick={() => setModalAddActive(true)}
						>
							Create New
						</Button>
					) : (
						""
					)}
					<Table
						columns={columns}
						dataSource={employees}
						onChange={onChange}
					/>
					<EmployeeAdd
						active={modalAddActive}
						setActive={setModalAddActive}
						token={props.token}
					/>
					<EmployeeDetails
						active={modalDataActive}
						setActive={setModalDataActive}
						employee={employee}
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
