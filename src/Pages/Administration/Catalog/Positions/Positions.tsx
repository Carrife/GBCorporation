import { Button, Space } from "antd";
import Table, { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { useEffect, useState } from "react";
import * as AiIcons from "react-icons/ai";
import PositionEdit from "./PositionEdit";
import PositionAdd from "./PositionAdd";
import {
	DeletePosition,
	GetPositions,
} from "../../../../Actions/AdministrationActions";
import { SorterResult } from "antd/es/table/interface";
import { TableParams } from "../../../../Interfaces/Table";
import { Short } from "../../../../Interfaces/Data";

interface DataType {
	key: React.Key;
	name: string;
}

const Positions = (props: { userId: string; role: string; token: string }) => {
	const [positions, setPositions] = useState<Short[]>([]);
	const [position, setPosition] = useState({});
	const [modalEditActive, setModalEditActive] = useState(false);
	const [modalAddActive, setModalAddActive] = useState(false);
	const [tableParams, setTableParams] = useState<TableParams>({
		pagination: {
			current: 1,
			pageSize: 5,
		},
	});

	useEffect(() => {
		GetPositions(props.token).then((result) => setPositions(result));
	}, [props.token]);

	const positionEdit = async (id: string, title: string) => {
		setPosition({
			id: id,
			title: title,
		});
		setModalEditActive(true);
	};

	const positionDelete = async (id: string) => {
		DeletePosition(props.token, id);
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
				dataSource={positions}
				pagination={tableParams.pagination}
				onChange={handleTableChange}
			/>
			<PositionEdit
				active={modalEditActive}
				setActive={setModalEditActive}
				position={position}
				token={props.token}
			/>
			<PositionAdd
				active={modalAddActive}
				setActive={setModalAddActive}
				token={props.token}
			/>
		</>
	);
};

export default Positions;
