import { useState, useEffect } from "react";
import "../../App.css";
import ApplicantAdd from "./ApplicantAdd";
import ApplicantEdit from "./ApplicantEdit";
import ApplicantTestData from "./ApplicantTestData";
import * as AiIcons from "react-icons/ai";
import { Layout, Table, Space, Button } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import {
	GetAllApplicants,
	GetApplicantTestData,
	Applicant,
	GetApplicantById,
	TestData,
} from "../../Actions/ApplicantActions";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { TableParams } from "../../Interfaces/Table";
import { SorterResult } from "antd/es/table/interface";

interface DataType {
	key: React.Key;
	nameRu: string;
	nameEn: string;
	login: string;
	phone: string;
	status: string;
}

const Applicants = (props: { role: string; token: string }) => {
	const [applicants, setApplicants] = useState<Applicant[]>([]);
	const [applicant, setApplicant] = useState<Applicant>();
	const [applicantId, setApplicantId] = useState("");
	const [modalAddActive, setModalAddActive] = useState(false);
	const [modalEditActive, setModalEditActive] = useState(false);
	const [modalTestDataActive, setModalTestDataActive] = useState(false);
	const [testData, setTestData] = useState<TestData>();
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
		GetAllApplicants(props.token).then((result) => setApplicants(result));
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
					<ApplicantAdd
						active={modalAddActive}
						setActive={setModalAddActive}
						token={props.token}
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
					/>
				</Content>
			</Layout>
		</Layout>
	);
};

export default Applicants;
