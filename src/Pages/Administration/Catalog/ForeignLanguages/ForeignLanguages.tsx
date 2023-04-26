import { Button, Space } from "antd";
import Table, { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { useEffect, useState } from "react";
import * as AiIcons from "react-icons/ai";
import {
	DeleteForeignLanguage,
	GetForeignLanguages,
} from "../../../../Actions/AdministrationActions";
import { SorterResult } from "antd/es/table/interface";
import ForeignLanguageEdit from "./ForeignLanguageEdit";
import ForeignLanguageAdd from "./ForeignLanguageAdd";
import { TableParams } from "../../../../Interfaces/Table";
import { Short } from "../../../../Interfaces/Data";

interface DataType {
	key: React.Key;
	name: string;
}

const ForeignLanguages = (props: {
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
		GetForeignLanguages(props.token).then((result) => setLanguages(result));
	}, [props.token]);

	const positionEdit = async (id: string, title: string) => {
		setLanguage({
			id: id,
			title: title,
		});
		setModalEditActive(true);
	};

	const positionDelete = async (id: string) => {
		DeleteForeignLanguage(props.token, id);
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
			<ForeignLanguageEdit
				active={modalEditActive}
				setActive={setModalEditActive}
				language={language}
				token={props.token}
			/>
			<ForeignLanguageAdd
				active={modalAddActive}
				setActive={setModalAddActive}
				token={props.token}
			/>
		</>
	);
};

export default ForeignLanguages;
