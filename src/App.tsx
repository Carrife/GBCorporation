import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Login from "./Pages/Login";
import Employee from "./Pages/Employees/Employees";
import Templates from "./Pages/Templates/Template";
import Tests from "./Pages/Tests/Tests";
import Setting from "./Pages/Settings/Setting";
import Applicant from "./Pages/Applicants/Applicant";
import Hirings from "./Pages/Hiring/Hiring";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Logout from "./Pages/Logout";
import Administration from "./Pages/Administration/Administartion";

function App() {
	const [name, setName] = useState("");
	const [role, setRole] = useState("");
	const [token, setToken] = useState("");
	const [userId, setUserId] = useState("");
	const [login, setLogin] = useState("");

	useEffect(() => {
		(async () => {
			const response = await fetch(
				"http://localhost:8000/api/Auth/user",
				{
					headers: { "Content-Type": "application/json" },
					credentials: "include",
				}
			);

			const content = await response.json();
			if (content?.status === 401) {
				if (window.location.pathname !== "/") {
					window.location.href = "/";
				}
			} else {
				setName(content.name);
				setRole(content.role);
				setUserId(content.id);
				setLogin(content.login);
				window.localStorage.setItem("token", content.token);
				setToken(content.token);
				if (window.location.pathname === "/") {
					window.location.href = "/employees";
				}
			}
		})();
	}, []);

	return (
		<div className="App">
			<BrowserRouter>
				<Navbar name={name} role={role} />
				<main>
					<Routes>
						<Route path="/" element={<Login />} />
						{token && (
							<>
								<Route
									path="/employees"
									element={
										<Employee
											role={role}
											token={token}
											userId={userId}
										/>
									}
								/>
								<Route
									path="/applicants"
									element={
										<Applicant role={role} token={token} />
									}
								/>
								<Route
									path="/hiring"
									element={
										<Hirings
											role={role}
											userId={userId}
											token={token}
										/>
									}
								/>
								<Route
									path="/templates"
									element={
										<Templates role={role} token={token} />
									}
								/>
								<Route
									path="/tests"
									element={
										<Tests
											userId={userId}
											role={role}
											token={token}
											login={login}
										/>
									}
								/>
								<Route
									path="/admin"
									element={
										<Administration
											userId={userId}
											role={role}
											token={token}
										/>
									}
								/>
								<Route
									path="/settings"
									element={
										<Setting
											userId={userId}
											role={role}
											token={token}
										/>
									}
								/>
								<Route
									path="/logout"
									element={
										<Logout
											setName={setName}
											setRole={setRole}
											setToken={setToken}
											setUserId={setUserId}
										/>
									}
								/>
							</>
						)}
					</Routes>
				</main>
			</BrowserRouter>
		</div>
	);
}

export default App;
