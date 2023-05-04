import React, { useState, useEffect, useRef } from "react";
import "../../App.css";
import { GetAllTests } from "../../Actions/TestActions";
import { Button, Input, InputRef, Space, Table } from "antd";
import { ColumnsType, TablePaginationConfig } from "antd/es/table";
import * as AiIcons from "react-icons/ai";
import { TableParams } from "../../Interfaces/Table";
import {
	ColumnType,
	FilterConfirmProps,
	SorterResult,
} from "antd/es/table/interface";
import { Short } from "../../Interfaces/Short";

interface DataType {
	key: React.Key;
	name: string;
}

type DataIndex = keyof DataType;

const TestList = (props: { userId: string; role: string; token: string }) => {
	const [tests, setTests] = useState<Short[]>([]);
	const [tableParams, setTableParams] = useState<TableParams>({
		pagination: {
			current: 1,
			pageSize: 6,
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

	const columns: ColumnsType<DataType> = [
		{
			title: "Title",
			dataIndex: "name",
			key: "title",
			width: 900,
			sorter: {
				compare: (a, b) =>
					a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1,
			},
		},
		{
			title: "",
			key: "action",
			...getColumnSearchProps("name"),
		},
	];

	useEffect(() => {
		GetAllTests(props.token).then((result) => setTests(result));
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

	return (
		<Table
			columns={columns}
			dataSource={tests}
			pagination={tableParams.pagination}
			onChange={handleTableChange}
		/>
	);
};

export default TestList;
