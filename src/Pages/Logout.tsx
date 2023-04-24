import { Navigate } from "react-router-dom";
import { LogOut } from "../Actions/AuthActions";

const Logout = (props: {
	setName: (name: string) => void;
	setRole: (role: string) => void;
	setToken: (role: string) => void;
    setUserId: (role: string) => void;
}) => {
    LogOut();
	
	props.setName("");
	props.setRole("");
	props.setToken("");
	props.setUserId("");

	return <Navigate to="/" />;
};

export default Logout;
