import React from "react";
import ls from "services/localstorage";
import { useStateValue } from "hooks/provider";
import { Avatar, toaster, IconButton, SearchInput } from "evergreen-ui";
import "styles/components/accountBar.css";

const AccountBar = () => {
	const [{ category, searchText }, dispatch] = useStateValue() as Array<any>;

	const logout = () => {
		ls.setState("password", "");
		dispatch({ key: "password", value: "" });
		dispatch({ key: "isLogged", value: false });
		dispatch({ key: "showPlayer", value: false });
		dispatch({ key: "category", value: "" });
		dispatch({ key: "film", value: "" });
		dispatch({ key: "serie", value: "" });
		dispatch({ key: "seasons", value: "" });
		dispatch({ key: "season", value: "" });
		dispatch({ key: "seasonIndex", value: "" });
		dispatch({ key: "episodes", value: [] });
		dispatch({ key: "episode", value: [] });
		dispatch({ key: "episodeIndex", value: [] });
	};

	return (
		<div className="account-header">
			{category && (
				<SearchInput
					className="searchbar"
					spellcheck="false"
					onChange={(e: any) => dispatch({ key: "searchText", value: e.target.value })}
					value={searchText}
				/>
			)}
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
				name="F R"
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
