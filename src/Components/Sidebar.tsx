import { Link } from "react-router-dom";
import { SidebarData, SidebarDataWithoutTemplates, SidebarDataWithoutTests,  FooterData} from "./SidebarData";
import'./Sidebar.css';

const Sidebar = (props: {role: string}) => {
    return (
        <>
            <div>
                <nav className={'nav-menu'}>
                    <ul className="nav-menu-items">
                        {props.role === "RootUser"   ? 
                            SidebarData.map((item, index) => {
                                return (
                                    <li key={index} className={item.cName}>
                                        <Link to={item.path}>
                                            {item.icon}
                                            <span>{item.title}</span>
                                        </Link>
                                    </li>
                                )
                            })
                        : props.role === "LineManager" || props.role === "Admin" ?
                            SidebarDataWithoutTests.map((item, index) => {
                                return (
                                    <li key={index} className={item.cName}>
                                        <Link to={item.path}>
                                            {item.icon}
                                            <span>{item.title}</span>
                                        </Link>
                                    </li>
                                )
                            })
                        : SidebarDataWithoutTemplates.map((item, index) => {
                            return (
                                <li key={index} className={item.cName}>
                                    <Link to={item.path}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            )
                        })}
                        <div className="sidebar-footer">
                           {FooterData.map((item, index) => {
                                return (
                                    <li key={index} className={item.cName}>
                                        <Link to={item.path}>
                                            {item.icon}
                                            <span>{item.title}</span>
                                        </Link>
                                    </li>
                                )
                            } )} 
                        </div>
                    </ul>
                </nav>
            </div>
        </>  
    );
}

export default Sidebar;