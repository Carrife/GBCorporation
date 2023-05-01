import "../../App.css";
import "./Navbar.css";
import img from "../../Images/GB.png";
import { Typography, Layout, Space } from "antd";
const { Text } = Typography;
const { Header } = Layout;

const Navbar = (props: { name: string; role: string }) => {
	return (
		<Layout>
			<Header className="navbar">
				<Space.Compact
					direction="horizontal"
					className="nav-space-horizontal"
				>
					<img src={img} className="nav-image" alt="" />
					<Space.Compact
						direction="vertical"
						className="nav-space-vertical"
					>
						<Text style={{ color: "lightgrey" }}>
							{props.name ? props.name : ""}
							<br />
							{props.role ? props.role : ""}
						</Text>
					</Space.Compact>
				</Space.Compact>
			</Header>
		</Layout>
	);
};

export default Navbar;
