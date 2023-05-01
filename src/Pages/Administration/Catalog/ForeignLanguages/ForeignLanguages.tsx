import { Button, Input, InputRef, Popconfirm, Space } from "antd";
import Table, { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { useEffect, useRef, useState } from "react";
import * as AiIcons from "react-icons/ai";
import {
	DeleteForeignLanguage,
	GetForeignLanguages,
} from "../../../../Actions/AdministrationActions";
import {
	ColumnType,
	FilterConfirmProps,
	SorterResult,
} from "antd/es/table/interface";
import ForeignLanguageEdit from "./ForeignLanguageEdit";
import ForeignLanguageAdd from "./ForeignLanguageAdd";
import { TableParams } from "../../../../Interfaces/Table";
import { Short } from "../../../../Interfaces/Data";

interface DataType {
	key: React.Key;
	name: string;
}

type DataIndex = keyof DataType;

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
	const searchInput = useRef<InputRef>(null);

	const handleSearch = (confirm: (param?: FilterConfirmProps) => void) => {
		confirm();
	};

	const handleReset = (
		clearFilters: () => void,
		confirm: (param?: FilterConfirmProps) => void
	) => {
		clearFilters();
		confirm({ closeDropdown: false });
	};

	const getColumnSearchProps = (
		dataIndex: DataIndex
	): ColumnType<DataType> => ({
		filterDropdown: ({
			setSelectedKeys,
			selectedKeys,
			confirm,
			clearFilters,
		}) => (
			<div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
				<Input
					ref={searchInput}
					placeholder={`Search title`}
					value={selectedKeys[0]}
					onChange={(e) =>
						setSelectedKeys(e.target.value ? [e.target.value] : [])
					}
					onPressEnter={() => handleSearch(confirm)}
					style={{ marginBottom: 8, display: "block" }}
				/>
				<Space>
					<Button
						type="primary"
						onClick={() => handleSearch(confirm)}
						icon={<AiIcons.AiOutlineSearch />}
						size="small"
						style={{ width: 90 }}
					>
						Search
					</Button>
					<Button
						onClick={() => {
							clearFilters && handleReset(clearFilters, confirm);
						}}
						size="small"
						style={{ width: 90 }}
					>
						Reset
					</Button>
				</Space>
			</div>
		),
		filterIcon: (filtered: boolean) => (
			<div
				className="table-search"
				style={{ width: 100, paddingLeft: 40 }}
			>
				<AiIcons.AiOutlineSearch
					style={{ color: filtered ? "#1890ff" : undefined }}
				/>
			</div>
		),
		onFilter: (value, record) =>
			record[dataIndex]
				.toString()
				.toLowerCase()
				.includes((value as string).toLowerCase()),
		onFilterDropdownOpenChange: (visible) => {
			if (visible) {
				setTimeout(() => searchInput.current?.select(), 100);
			}
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

	const foreignLanguageDelete = async (id: string) => {
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
			...getColumnSearchProps("name"),
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
					<Popconfirm
						title="Sure to delete?"
						onConfirm={() => foreignLanguageDelete(record.key.toString())}
					>
						<Button type="text">
							<AiIcons.AiOutlineDelete />
						</Button>
					</Popconfirm>
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
