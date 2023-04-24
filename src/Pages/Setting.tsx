import { SyntheticEvent, useState } from "react";
import Sidebar from "../Components/Sidebar/Sidebar";

const Setting = (props: { name: string; role: string; token: string }) => {
	const [password, setPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [newPasswordConfirm, setNewPasswordConfirm] = useState("");

	const submit = async (e: SyntheticEvent) => {
		e.preventDefault();

		const response = await fetch(
			"http://localhost:8000/api/Auth/UpdatePassword",
			{
				method: "POST",
				headers: {
					Accept: "*/*",
					Authorization: "Bearer " + props.token,
					"Content-Type": "application/json",
				},
				credentials: "include",
				body: JSON.stringify({
					userName: props.name,
					password,
					newPassword,
					newPasswordConfirm,
				}),
			}
		);

		if (response.ok) {
			window.location.reload();
		}
	};

	return (
		<>
			<Sidebar role={props.role} />
			<div className="form-signin">
				<form onSubmit={submit}>
					<input
						type="password"
						className="form-control"
						placeholder="Password"
						required
						onChange={(e) => setPassword(e.target.value)}
					/>
					<input
						type="password"
						className="form-control"
						placeholder="NewPassword"
						required
						onChange={(e) => setNewPassword(e.target.value)}
					/>
					<input
						type="password"
						className="form-control"
						placeholder="NewPasswordConfirm"
						required
						onChange={(e) => setNewPasswordConfirm(e.target.value)}
					/>
					<button
						className="w-100 btn btn-lg btn-primary"
						type="submit"
					>
						Save
					</button>
				</form>
			</div>
		</>
	);
};

export default Setting;
