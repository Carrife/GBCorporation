import { useEffect } from "react";

import { Tabs, TabsProps } from "antd";
import Positions from "./Catalog/Positions/Positions";
import Departments from "./Catalog/Departments/Departments";
import ForeignLanguages from "./Catalog/ForeignLanguages/ForeignLanguages";
import ProgrammingLanguages from "./Catalog/ProgrammingLanguages/ProgrammingLanguages";

const Catalog = (props: { userId: string; role: string; token: string }) => {
	useEffect(() => {
		if (window.localStorage.getItem("token") === "undefined") {
			window.location.href = "/";
		}
	}, [props.token]);

	const tabItems: TabsProps["items"] = [
		{
			key: "1",
			label: `Positions`,
			children: (
				<Positions
					userId={props.userId}
					role={props.role}
					token={props.token}
				/>
			),
		},
		{
			key: "2",
			label: `Departments`,
			children: (
				<Departments
					userId={props.userId}
					role={props.role}
					token={props.token}
				/>
			),
		},
		{
			key: "3",
			label: `Foreign Languages`,
			children: (
				<ForeignLanguages
					userId={props.userId}
					role={props.role}
					token={props.token}
				/>
			),
		},
		{
			key: "4",
			label: `Programming Languages`,
			children: (
				<ProgrammingLanguages
					userId={props.userId}
					role={props.role}
					token={props.token}
				/>
			),
		},
	];

	return (
		<Tabs
			defaultActiveKey="1"
			items={tabItems}
			tabPosition="left"
			style={{ marginTop: 10 }}
		/>
	);
};

export default Catalog;
