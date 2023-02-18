import { Link } from "react-router-dom";
import { SidebarData, SidebarDataWithoutTemplates, SidebarDataWithoutTests,  FooterData} from "./SidebarData";
import'./Sidebar.css';
import { useEffect, useState } from "react";

const Sidebar = (props: {role: string}) => {
    const[urlPath, setUrlPath] = useState('');
    
    useEffect(() => {
        setUrlPath(window.location.pathname);
    }, []);

    return (
        <>
            <div>
                <nav className={'nav-menu'}>
                    <ul className="nav-menu-items">
                        {props.role === "Admin" || props.role === "HR" ? 
                            SidebarData.map((item, index) => {
                                return (
                                    <li key={index} className={item.cName}>
                                        <Link to={item.path}>
                                            {item.icon}
                                            <span className={urlPath === item.path ? 'active_tab' : ''}>{item.title}</span>
                                        </Link>
                                    </li>
                                )
                            })
                        : props.role === "LineManager" ?
                            SidebarDataWithoutTests.map((item, index) => {
                                return (
                                    <li key={index} className={item.cName}>
                                        <Link to={item.path}>
                                            {item.icon}
                                            <span className={urlPath === item.path ? 'active_tab' : ''}>{item.title}</span>
                                        </Link>
                                    </li>
                                )
                            })
                        : SidebarDataWithoutTemplates.map((item, index) => {
                            return (
                                <li key={index} className={item.cName}>
                                    <Link to={item.path}>
                                        {item.icon}
                                        <span className={urlPath === item.path ? 'active_tab' : ''}>{item.title}</span>
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