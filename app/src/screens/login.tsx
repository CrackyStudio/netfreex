import React, { useEffect } from "react";
import Register from "screens/register";
import fetch from "services/fetch";
import CodeInput from "components/CodeInput";
import { useStateValue } from "hooks/provider";
import { TextInput, toaster, Button } from "evergreen-ui";
import "styles/screens/login.css";

const Login: React.FC = () => {
	const [{ user, passcode, register, secret }, dispatch] = useStateValue() as Array<any>;

	useEffect(() => {
        if (secret !== undefined) {
			verify2FA()
		}
	}, [secret]);
	
	const setUser = (e: any) => {
		dispatch({ key: "user", value: e.target.value });
	};

	const setRegister = () => {
		dispatch({ key: "register", value: true});
	}

	const verify2FA = () => {
        fetch.validate2FA({ token: passcode, secret }).then((response: any) => {
            if (response === "2FA authorization succeded") {
                dispatch({ key: "isLogged", value: true });
            } else {
                toaster.danger("L'authentification a échoué", {
					description: "Le code saisi est incorrect ou n'est plus valide (30s)",
					duration: 5
				});
            }
		});
	}
	
	const login = async () => {
		dispatch({ key: "secret", value: undefined });
		if (passcode !== undefined && passcode.length === 6) {
			await fetch.getUser(user).then((response: any) => {
				dispatch({ key: "secret", value: response.secret });
			})
		} else {
			toaster.danger("Une erreur est survenue", {
				description: "Le format du code saisi est incorrect",
				duration: 5
			});
		}
	};

	return (
		<div>
			{register === false && (
				<div className="login-container">
					<p>Pseudo :</p>
					<TextInput className="login-input" autoFocus={true} value={user} onChange={(e: any) => setUser(e)} />
					<p>Code d'authentification :</p>
					<CodeInput />
					<Button
						className="login-button"
						appearance="primary"
						intent="danger"
						onClick={() => login()}
					>
						Connexion
					</Button>
					<hr className="separator"/>
					<Button
						className="register-button"
						appearance="primary"
						intent="danger"
						onClick={() => setRegister()}
					>
						S'inscrire
					</Button>
				</div>
			)}
			{register === true && (
				<Register />
			)}
		</div>
	);
};

export default Login;
