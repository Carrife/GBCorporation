import { Button, Col, FloatButton, Form, Input, Layout, Select, Space } from "antd";
import Table, { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { SorterResult } from "antd/es/table/interface";
import { useEffect, useState } from "react";
import * as AiIcons from "react-icons/ai";
import { GetRoles, GetUsers, User } from "../../Actions/AdministrationActions";
import UserEdit from "./UserEdit";
import { TableParams } from "../../Interfaces/Table";
import Filter from "../../Components/Filter/Filter";
import { Short } from "../../Interfaces/Data";

interface DataType {
	key: React.Key;
	nameRu: string;
	nameEn: string;
	login: string;
	role: { name: string; id: number };
	email: string;
}

const Users = (props: { userId: string; role: string; token: string }) => {
	const [form] = Form.useForm();
	const [users, setUsers] = useState<User[]>([]);
	const [roles, setRoles] = useState<Short[]>([]);
	const [user, setUser] = useState({});
	const [modalEditActive, setModalEditActive] = useState(false);
	const [isFilterActive, setIsFilterActive] = useState(false);
	const { Content } = Layout;
	const [tableParams, setTableParams] = useState<TableParams>({
		pagination: {
			current: 1,
			pageSize: 6,
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
		GetUsers(props.token, null).then((result) => setUsers(result));
		GetRoles(props.token).then((result) => setRoles(result));
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

	const filterView = () => {
		setIsFilterActive(true);
	};

	const onFilterSearch = (values: any) => {
		GetUsers(props.token, values).then((result) => setUsers(result));
		setIsFilterActive(false);
	};

	const onFilterReset = () => {
		GetUsers(props.token, null).then((result) => setUsers(result));
		form.resetFields();
	};
	return (
		<Content>
			<Table
				columns={columns}
				pagination={tableParams.pagination}
				dataSource={users}
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
					<Form.Item name={`nameRu`} label={`Name (Ru)`}>
						<Input />
					</Form.Item>
					<Form.Item name={`surnameRu`} label={`Surname (Ru)`}>
						<Input />
					</Form.Item>
					<Form.Item name={`patronymicRu`} label={`Patronymic (Ru)`}>
						<Input />
					</Form.Item>
					<Form.Item name={`nameEn`} label={`Name (En)`}>
						<Input />
					</Form.Item>
					<Form.Item name={`surnameEn`} label={`Surname (En)`}>
						<Input />
					</Form.Item>
					<Form.Item name={`login`} label={`Login`}>
						<Input />
					</Form.Item>
					<Form.Item name={`roleIds`} label={`Role`}>
						<Select>
							{roles.map((item) => (
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
