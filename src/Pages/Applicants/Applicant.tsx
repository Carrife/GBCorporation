import { useState, useEffect } from "react";
import "../../App.css";
import ApplicantAdd from "./ApplicantAdd";
import ApplicantEdit from "./ApplicantEdit";
import ApplicantTestData from "./ApplicantTestData";
import * as AiIcons from "react-icons/ai";
import {
	Layout,
	Table,
	Space,
	Button,
	FloatButton,
	Form,
	Input,
	Col,
	Select,
} from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import {
	GetAllApplicants,
	GetApplicantTestData,
	GetApplicantById,
	GetApplicantStatuses,
} from "../../Actions/ApplicantActions";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { TableParams } from "../../Interfaces/Table";
import { SorterResult } from "antd/es/table/interface";
import Filter from "../../Components/Filter/Filter";
import { Short } from "../../Interfaces/Short";
import { Applicant } from "../../Interfaces/Applicants";
import { TestResults } from "../../Interfaces/Tests";

interface DataType {
	key: React.Key;
	nameRu: string;
	nameEn: string;
	login: string;
	phone: string;
	status: string;
}

const Applicants = (props: { role: string; token: string }) => {
	const [form] = Form.useForm();
	const [applicants, setApplicants] = useState<Applicant[]>([]);
	const [applicant, setApplicant] = useState<Applicant>();
	const [statuses, setStatuses] = useState<Short[]>([]);
	const [applicantId, setApplicantId] = useState("");
	const [modalAddActive, setModalAddActive] = useState(false);
	const [modalEditActive, setModalEditActive] = useState(false);
	const [modalTestDataActive, setModalTestDataActive] = useState(false);
	const [isFilterActive, setIsFilterActive] = useState(false);
	const [testData, setTestData] = useState<TestResults>();
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
			title: "Phone",
			dataIndex: "phone",
			key: "phone",
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
						onClick={() => applicantEdit(record.key.toString())}
					>
						<AiIcons.AiOutlineEdit />
					</Button>
					<Button
						type="text"
						onClick={() => applicantTestData(record.key.toString())}
					>
						<AiIcons.AiOutlineUnorderedList />
					</Button>
				</Space>
			),
		},
	];

	useEffect(() => {
		GetAllApplicants(props.token, null).then((result) =>
			setApplicants(result)
		);
		GetApplicantStatuses(props.token).then((result) => setStatuses(result));
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

	const applicantEdit = async (id: string) => {
		GetApplicantById(props.token, id)
			.then((result) => setApplicant(result))
			.then((data) => setModalEditActive(true));
	};

	const applicantTestData = async (id: string) => {
		GetApplicantTestData(props.token, id).then((result) =>
			setTestData(result)
		);
		setApplicantId(id);
		setModalTestDataActive(true);
	};

	const filterView = () => {
		setIsFilterActive(true);
	};

	const onFilterSearch = (values: any) => {
		GetAllApplicants(props.token, values).then((result) =>
			setApplicants(result)
		);
		setIsFilterActive(false);
	};

	const onFilterReset = () => {
		GetAllApplicants(props.token, null).then((result) =>
			setApplicants(result)
		);
		form.resetFields();
	};

	return (
		<Layout className="layout">
			<Sidebar role={props.role} />
			<Layout className="page-layout">
				<Content>
					<Button type="link" onClick={() => setModalAddActive(true)}>
						Create New
					</Button>
					<Table
						columns={columns}
						dataSource={applicants}
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
					<ApplicantAdd
						active={modalAddActive}
						setActive={setModalAddActive}
						token={props.token}
						setApplicants={setApplicants}
					/>
					<ApplicantTestData
						active={modalTestDataActive}
						applicantId={applicantId}
						setActive={setModalTestDataActive}
						testData={testData}
						token={props.token}
					/>
					<ApplicantEdit
						active={modalEditActive}
						setActive={setModalEditActive}
						applicant={applicant}
						token={props.token}
						setApplicants={setApplicants}
					/>
				</Content>
			</Layout>
		</Layout>
	);
};

export default Applicants;
