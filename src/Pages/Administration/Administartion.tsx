import "../../App.css";
import { Layout, Tabs, TabsProps } from "antd";
import Catalog from "./Catalog";
import Users from "./Users";
import Sidebar from "../../Components/Sidebar/Sidebar";

const Administration = (props: {
	userId: string;
	role: string;
	token: string;
}) => {
	const { Content } = Layout;

	const tabItems: TabsProps["items"] = [
		{
			key: "1",
			label: `Catalog`,
			children: (
				<Catalog
					userId={props.userId}
					role={props.role}
					token={props.token}
				/>
			),
		},
		{
			key: "2",
			label: `Users`,
			children: (
				<Users
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
					<Tabs defaultActiveKey="1" items={tabItems} />
				</Content>
			</Layout>
		</Layout>
	);
};

export default Administration;
