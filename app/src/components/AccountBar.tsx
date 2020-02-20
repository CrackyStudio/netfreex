import React from "react";
import ls from "services/localstorage";
import { useStateValue } from "hooks/provider";
import { Avatar, toaster, IconButton } from "evergreen-ui";
import "styles/components/accountBar.css";

const AccountBar = () => {
	const [_, dispatch] = useStateValue() as Array<any>;

	const logout = () => {
		dispatch({ key: "isLogged", value: false });
		ls.setState("password", "");
		dispatch({ key: "password", value: "" });
	};

	return (
		<div className="account-header">
			<IconButton className="account-icon disabled" appearance="minimal" icon="search" intent="none" />
			<IconButton className="account-icon disabled" appearance="minimal" icon="history" intent="none" />
			<IconButton className="account-icon disabled" appearance="minimal" icon="cloud-download" intent="none" />
			<IconButton className="account-icon disabled" appearance="minimal" icon="heart" intent="none" />
			<IconButton
				className="account-icon"
				appearance="minimal"
				icon="log-out"
				intent="danger"
				onClick={() => {
					logout();
				}}
			/>
			<Avatar
				className="account-logo"
				name="Cracky Studio"
				size={40}
				isSolid
				color="red"
				onClick={() => {
					toaster.warning("L'utilisation des comptes n'est pas encore implémenté", {
						description: "Certaines fonctionnalités sont actuellement indisponibles.",
						duration: 5
					});
				}}
			/>
		</div>
	);
};

export default AccountBar;
