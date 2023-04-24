import "./Sidebar.css";
import { Link } from "react-router-dom";
import {
	SidebarData,
	SidebarDataLMTL,
	SidebarDataDevelopers,
	FooterData,
} from "./SidebarData";
import { useEffect, useState } from "react";
import { Typography, Space } from "antd";
const { Title } = Typography;

const Sidebar = (props: { role: string }) => {
	const [urlPath, setUrlPath] = useState("");

	useEffect(() => {
		setUrlPath(window.location.pathname);
	}, []);

	return (
		<nav className={"nav-menu"}>
			<Space.Compact direction="vertical" className="nav-menu-items">
				{props.role === "Admin" || props.role === "HR"
					? SidebarData.map((item, index) => {
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
					  })
					: props.role === "LineManager" ||
					  props.role === "TeamLeader"
					? SidebarDataLMTL.map((item, index) => {
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
					  })
					: SidebarDataDevelopers.map((item, index) => {
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
