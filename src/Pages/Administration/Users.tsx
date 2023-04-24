import { Button, Layout, Space } from "antd";
import Table, { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { SorterResult } from "antd/es/table/interface";
import { useEffect, useState } from "react";
import * as AiIcons from "react-icons/ai";
import { GetUsers, User } from "../../Actions/AdministrationActions";
import UserEdit from "./UserEdit";

interface TableParams {
	pagination?: TablePaginationConfig;
	sortField?: string;
	sortOrder?: string;
}

interface DataType {
	key: React.Key;
	nameRu: string;
	nameEn: string;
	login: string;
	role: { name: string; id: number };
	email: string;
}

const Users = (props: { userId: string; role: string; token: string }) => {
	const [users, setUsers] = useState<User[]>([]);
	const [user, setUser] = useState({});
	const [modalEditActive, setModalEditActive] = useState(false);
	const { Content } = Layout;
	const [tableParams, setTableParams] = useState<TableParams>({
		pagination: {
			current: 1,
			pageSize: 5,
		},
	});

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
			title: "Email",
			dataIndex: "email",
			key: "email",
			sorter: {
				compare: (a, b) =>
					a.nameRu.toLowerCase() < b.nameRu.toLowerCase() ? 1 : -1,
			},
		},
		{
			title: "Role",
			dataIndex: "role",
			key: "role",
			sorter: {
				compare: (a, b) =>
					a.nameRu.toLowerCase() < b.nameRu.toLowerCase() ? 1 : -1,
			},
			render: (_, { role }) => <>{role?.name}</>,
		},
		{
			title: "",
			key: "action",
			render: (_, record) => (
				<Space size="middle">
					<Button
						type="text"
						onClick={() =>
							userEdit(
								record.key.toString(),
								record.email,
								record.role?.id
							)
						}
					>
						<AiIcons.AiOutlineEdit />
					</Button>
				</Space>
			),
		},
	];

	useEffect(() => {
		GetUsers(props.token).then((result) => setUsers(result));
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

	const userEdit = async (id: string, email: string, roleId: number) => {
		setUser({
			id,
			email,
			roleId,
		});
		setModalEditActive(true);
	};

	return (
		<Content>
			<Table
				columns={columns}
				pagination={tableParams.pagination}
				dataSource={users}
				onChange={handleTableChange}
			/>
			<UserEdit
				active={modalEditActive}
				setActive={setModalEditActive}
				user={user}
				token={props.token}
			/>
		</Content>
	);
};

export default Users;
