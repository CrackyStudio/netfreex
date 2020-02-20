import React, { useEffect } from "react";
import ls from "services/localstorage";
import { useStateValue } from "hooks/provider";
import { TextInput } from "evergreen-ui";
import "styles/screens/login.css";

const Login: React.FC = () => {
	const [{ password }, dispatch] = useStateValue() as Array<any>;

	useEffect(() => {
		const login = () => {
			const localPassword = ls.getState("password");
			const { REACT_APP_USER } = process.env;
			if (password === REACT_APP_USER || localPassword === REACT_APP_USER) {
				dispatch({ key: "isLogged", value: true });
			}
		};

		login();
	}, [password, dispatch]);

	const setPassword = (e: any) => {
		dispatch({ key: "password", value: e.target.value });
		ls.setState("password", e.target.value);
	};

	return (
		<div className="password-container">
			<TextInput type="password" autoFocus={true} value={password} onChange={(e: any) => setPassword(e)} />
		</div>
	);
};

export default Login;
