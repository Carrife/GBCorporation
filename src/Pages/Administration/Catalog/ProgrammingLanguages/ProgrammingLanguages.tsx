import { Button, Space } from "antd";
import Table, { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { useEffect, useState } from "react";
import * as AiIcons from "react-icons/ai";
import { SorterResult } from "antd/es/table/interface";
import {
	DeleteProgrammingLanguage,
	GetProgrammingLanguages,
} from "../../../../Actions/AdministrationActions";
import ProgrammingLanguageEdit from "./ProgrammingLanguageEdit";
import ProgrammingLanguageAdd from "./ProgrammingLanguageAdd";
import { TableParams } from "../../../../Interfaces/Table";
import { Short } from "../../../../Interfaces/Data";

interface DataType {
	key: React.Key;
	name: string;
}

const ProgrammingLanguages = (props: {
	userId: string;
	role: string;
	token: string;
}) => {
	const [languages, setLanguages] = useState<Short[]>([]);
	const [language, setLanguage] = useState({});
	const [modalEditActive, setModalEditActive] = useState(false);
	const [modalAddActive, setModalAddActive] = useState(false);
	const [tableParams, setTableParams] = useState<TableParams>({
		pagination: {
			current: 1,
			pageSize: 5,
		},
	});

	useEffect(() => {
		GetProgrammingLanguages(props.token).then((result) =>
			setLanguages(result)
		);
	}, [props.token]);

	const positionEdit = async (id: string, title: string) => {
		setLanguage({
			id: id,
			title: title,
		});
		setModalEditActive(true);
	};

	const positionDelete = async (id: string) => {
		DeleteProgrammingLanguage(props.token, id);
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
				dataSource={languages}
				pagination={tableParams.pagination}
				onChange={handleTableChange}
			/>
			<ProgrammingLanguageEdit
				active={modalEditActive}
				setActive={setModalEditActive}
				language={language}
				token={props.token}
			/>
			<ProgrammingLanguageAdd
				active={modalAddActive}
				setActive={setModalAddActive}
				token={props.token}
			/>
		</>
	);
};

export default ProgrammingLanguages;
