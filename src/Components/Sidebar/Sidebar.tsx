import "./Sidebar.css";
import { Link } from "react-router-dom";
import {
	SidebarDataAdmin,
	SidebarDataHR,
	SidebarDataDeveloperAccountant,
	SidebarDataCEO,
	SidebarData,
	FooterData,
} from "./SidebarData";
import { useEffect, useState } from "react";
import { Typography, Space } from "antd";
import Role from "../../Enums/RoleEnum";
const { Title } = Typography;

const Sidebar = (props: { role: string }) => {
	const [urlPath, setUrlPath] = useState("");

	useEffect(() => {
		setUrlPath(window.location.pathname);
	}, []);

	const data = (
		index: number,
		item: {
			title: string;
			path: string;
			icon: JSX.Element;
			cName: string;
		}
	) => {
		return (
			<li key={index} className={item.cName}>
				<Link to={item.path}>
					<Title
						level={5}
						style={{
							marginLeft: 5,
							color: urlPath === item.path ? "grey" : "lightgrey",
						}}
					>
						{item.icon} {item.title}
					</Title>
				</Link>
			</li>
		);
	};

	return (
		<nav className={"nav-menu"}>
			<Space.Compact direction="vertical" className="nav-menu-items">
				{props.role === Role.ADMIN
					? SidebarDataAdmin.map((item, index) => data(index, item))
					: props.role === Role.HR
					? SidebarDataHR.map((item, index) => data(index, item))
					: props.role === Role.DEVELOPER ||
					  props.role === Role.ACCOUNTANT
					? SidebarDataDeveloperAccountant.map((item, index) =>
							data(index, item)
					  )
					: props.role === Role.CEO
					? SidebarDataCEO.map((item, index) => data(index, item))
					: SidebarData.map((item, index) => data(index, item))}
				<div className="sidebar-footer">
					{FooterData.map((item, index) => {
						return (
							<li key={index} className={item.cName}>
								<Link to={item.path}>
									<Title
										level={5}
										style={{
											marginLeft: 5,
											color:
												urlPath === item.path
													? "grey"
													: "lightgrey",
										}}
									>
										{item.icon} {item.title}
									</Title>
								</Link>
							</li>
						);
					})}
				</div>
			</Space.Compact>
		</nav>
	);
};

export default Sidebar;
