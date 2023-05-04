import "../../App.css";
import { Layout, Tabs, TabsProps } from "antd";
import Sidebar from "../../Components/Sidebar/Sidebar";
import TestList from "./TestList";
import TestResults from "./TestResults";
import TestProgress from "./Progress/TestProgress";
import Role from "../../Enums/RoleEnum";

const Tests = (props: { userId: string; role: string; token: string }) => {
	const { Content } = Layout;

	const managerTabItems: TabsProps["items"] = [
		{
			key: "1",
			label: `List`,
			children: (
				<TestList
					userId={props.userId}
					role={props.role}
					token={props.token}
				/>
			),
		},
		{
			key: "2",
			label: `Test progress`,
			children: (
				<TestProgress
					userId={props.userId}
					role={props.role}
					token={props.token}
				/>
			),
		},
		{
			key: "3",
			label: `Results`,
			children: (
				<TestResults
					userId={props.userId}
					role={props.role}
					token={props.token}
				/>
			),
		},
	];

	const commonTabItems: TabsProps["items"] = [
		{
			key: "1",
			label: `Test progress`,
			children: (
				<TestProgress
					userId={props.userId}
					role={props.role}
					token={props.token}
				/>
			),
		},
		{
			key: "2",
			label: `Results`,
			children: (
				<TestResults
					userId={props.userId}
					role={props.role}
					token={props.token}
				/>
			),
		},
	];

	return (
		<Layout className="layout">
			<Sidebar role={props.role} />
			<Layout className="page-layout">
				<Content>
					<Tabs
						defaultActiveKey="1"
						items={
							props.role === Role.ADMIN || props.role === Role.LM
								? managerTabItems
								: commonTabItems
						}
					/>
				</Content>
			</Layout>
		</Layout>
	);
};

export default Tests;
