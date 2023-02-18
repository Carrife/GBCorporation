import'../App.css';
import './Nav.css'
 
const Nav = (props: {name: string, role: string}) => {
    return (
        <nav className="navbar">
            <div className="container-fluid">
                <p className="navbar-brand">GB Corporation</p>
                <div>
                    <ul className="nsvbar-nav me-auto mb-2 mb-md-8">
                        <li className="nav-item active" >
                            <p className="navbar-user">
                                {props.name ? props.name : ""}
                                <br/>
                                {props.role ? props.role : ""}
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Nav;