import React, { useState, useEffect } from "react";
import "../../App.css";
import HirinAdd from "./HiringAdd";
import HiringDetails from "./HiringDetails";
import * as AiIcons from "react-icons/ai";
import { Button, Layout, Space } from "antd";
import Table, { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { GetAllHirings, HiringInterface } from "../../Actions/HiringActions";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { TableParams } from "../../Interfaces/Table";
import { SorterResult } from "antd/es/table/interface";

interface DataType {
	key: React.Key;
	applicant: string;
	date: string;
	position: string;
	status: string;
}

const Hiring = (props: { role: string; userId: string; token: string }) => {
	const [hirings, setHirings] = useState<HiringInterface[]>([]);
	const [modalAddActive, setModalAddActive] = useState(false);
	const [modalDetailsActive, setModalDetailsActive] = useState(false);
	const [hiringId, setHiringId] = useState("");
	const [tableParams, setTableParams] = useState<TableParams>({
		pagination: {
			current: 1,
			pageSize: 6,
		},
	});
	const { Content } = Layout;

	const columns: ColumnsType<DataType> = [
		{
			title: "Applicant",
			dataIndex: "applicant",
			key: "applicant",
			sorter: {
				compare: (a, b) =>
					a.applicant.toLowerCase() < b.applicant.toLowerCase()
						? 1
						: -1,
			},
		},
		{
			title: "Position",
			dataIndex: "position",
			key: "position",
			sorter: {
				compare: (a, b) =>
					a.position.toLowerCase() < b.position.toLowerCase()
						? 1
						: -1,
			},
		},
		{
			title: "Date",
			dataIndex: "date",
			key: "date",
			sorter: {
				compare: (a, b) =>
					Date.parse(b.date) - Date.parse(a.date) ? 1 : -1,
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
					<Button
						type="text"
						onClick={() => hiringDetails(record.key.toString())}
					>
						<AiIcons.AiOutlineUnorderedList />
					</Button>
				</Space>
			),
		},
	];

	useEffect(() => {
		GetAllHirings(props.token, props.role, props.userId).then((result) =>
			setHirings(result)
		);
	}, [props.token, props.userId, props.role]);

	const handleTableChange = (
		pagination: TablePaginationConfig,
		sorter: SorterResult<DataType>
	) => {
		setTableParams({
			pagination,
			...sorter,
		});
	};

	const hiringDetails = async (id: string) => {
		setHiringId(id);
		setModalDetailsActive(true);
	};

	return (
		<Layout className="layout">
			<Sidebar role={props.role} />
			<Layout className="page-layout">
				<Content>
					{props.role === "Admin" || props.role === "HR" ? (
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
						dataSource={hirings}
						pagination={tableParams.pagination}
						onChange={handleTableChange}
					/>
					<HirinAdd
						active={modalAddActive}
						setActive={setModalAddActive}
						token={props.token}
					/>
					<HiringDetails
						active={modalDetailsActive}
						hiringId={hiringId}
						setActive={setModalDetailsActive}
						role={props.role}
						token={props.token}
					/>
				</Content>
			</Layout>
		</Layout>
	);
};

export default Hiring;
