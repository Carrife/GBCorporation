import React, { useState, useEffect } from "react";
import "../../App.css";
import HirinAdd from "./HiringAdd";
import HiringDetails from "./HiringDetails";
import * as AiIcons from "react-icons/ai";
import {
	Button,
	Col,
	FloatButton,
	Form,
	Input,
	Layout,
	Select,
	Space,
} from "antd";
import Table, { ColumnsType, TablePaginationConfig } from "antd/es/table";
import {
	GetAllHirings,
	GetHiringStatuses,
	GetPositions,
} from "../../Actions/HiringActions";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { TableParams } from "../../Interfaces/Table";
import { SorterResult } from "antd/es/table/interface";
import Filter from "../../Components/Filter/Filter";
import { Short } from "../../Interfaces/Short";
import { Hiring } from "../../Interfaces/Hirings";

interface DataType {
	key: React.Key;
	applicant: string;
	date: string;
	position: string;
	status: string;
}

const Hirings = (props: { role: string; userId: string; token: string }) => {
	const [form] = Form.useForm();
	const [hirings, setHirings] = useState<Hiring[]>([]);
	const [statuses, setStatuses] = useState<Short[]>([]);
	const [positions, setPositions] = useState<Short[]>([]);
	const [modalAddActive, setModalAddActive] = useState(false);
	const [modalDetailsActive, setModalDetailsActive] = useState(false);
	const [isFilterActive, setIsFilterActive] = useState(false);
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
		GetAllHirings(props.token, props.role, props.userId, null).then(
			(result) => setHirings(result)
		);
		GetPositions(props.token).then((result) => setPositions(result));
		GetHiringStatuses(props.token).then((result) => setStatuses(result));
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

	const filterView = () => {
		setIsFilterActive(true);
	};

	const onFilterSearch = (values: any) => {
		GetAllHirings(props.token, props.role, props.userId, values).then(
			(result) => setHirings(result)
		);
		setIsFilterActive(false);
	};

	const onFilterReset = () => {
		GetAllHirings(props.token, props.role, props.userId, null).then(
			(result) => setHirings(result)
		);
		form.resetFields();
	};

	return (
		<Layout className="layout">
			<Sidebar role={props.role} />
			<Layout className="page-layout">
				<Content>
					{(props.role === "Admin" || props.role === "HR") && (
						<Button
							type="link"
							onClick={() => setModalAddActive(true)}
						>
							Create New
						</Button>
					)}
					<Table
						columns={columns}
						dataSource={hirings}
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

export default Hirings;
