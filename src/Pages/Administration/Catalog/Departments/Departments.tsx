import { useEffect, useState } from "react";
import { Button, Space, TablePaginationConfig } from "antd";
import {
	DeleteDepartment,
	GetDepartments,
} from "../../../../Actions/AdministrationActions";
import Table, { ColumnsType } from "antd/es/table";
import { SorterResult } from "antd/es/table/interface";
import * as AiIcons from "react-icons/ai";
import DepartmentEdit from "./DepartmentEdit";
import DepartmentAdd from "./DepartmentAdd";
import { TableParams } from "../../../../Interfaces/Table";
import { Short } from "../../../../Interfaces/Data";

interface DataType {
	key: React.Key;
	name: string;
}

const Departments = (props: {
	userId: string;
	role: string;
	token: string;
}) => {
	const [departments, setDepartments] = useState<Short[]>([]);
	const [department, setDepartment] = useState({});
	const [modalEditActive, setModalEditActive] = useState(false);
	const [modalAddActive, setModalAddActive] = useState(false);
	const [tableParams, setTableParams] = useState<TableParams>({
		pagination: {
			current: 1,
			pageSize: 5,
		},
	});

	useEffect(() => {
		GetDepartments(props.token).then((result) => setDepartments(result));
	}, [props.token]);

	const positionEdit = async (id: string, title: string) => {
		setDepartment({
			id: id,
			title: title,
		});
		setModalEditActive(true);
	};

	const positionDelete = async (id: string) => {
		DeleteDepartment(props.token, id);
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

	const columns: ColumnsType<DataType> = [
		{
			title: "Title",
			dataIndex: "name",
			key: "title",
			width: 700,
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
							positionEdit(
								record.key.toString(),
								record.name.toString()
							)
						}
					>
						<AiIcons.AiOutlineEdit />
					</Button>
					<Button
						type="text"
						onClick={() => positionDelete(record.key.toString())}
					>
						<AiIcons.AiOutlineDelete />
					</Button>
				</Space>
			),
		},
	];

	return (
		<>
			<Button type="link" onClick={() => setModalAddActive(true)}>
				Create New
			</Button>
			<Table
				columns={columns}
				dataSource={departments}
				pagination={tableParams.pagination}
				onChange={handleTableChange}
			/>
			<DepartmentEdit
				active={modalEditActive}
				setActive={setModalEditActive}
				department={department}
				token={props.token}
			/>
			<DepartmentAdd
				active={modalAddActive}
				setActive={setModalAddActive}
				token={props.token}
			/>
		</>
	);
};

export default Departments;
