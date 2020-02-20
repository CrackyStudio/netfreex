import React from "react";
import mLogo from "media/moshed-logo.gif";
import Catalog from "screens/catalog";
import Login from "screens/login";
import HeaderButton from "components/HeaderButton";
import { useStateValue } from "hooks/provider";
import { Avatar, IconButton } from "evergreen-ui";
import "styles/screens/dashboard.css";

const Dashboard: React.FC = () => {
	const [{ isLogged }, dispatch] = useStateValue() as Array<any>;

	const goHome = () => {
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
		<div className="main">
			<div className={isLogged ? "header" : "header-centered"}>
				<img className="logo" src={mLogo} alt="netfreex-logo" onClick={() => goHome()} />
				{isLogged && (
					<>
						<HeaderButton text="Films" />
						<HeaderButton text="Series" />
						<HeaderButton text="Musiques" enabled={false} />
						<HeaderButton text="Apps" enabled={false} />
						<div className="account-header">
							<IconButton
								className="account-icon disabled"
								appearance="minimal"
								icon="search"
								intent="none"
							/>
							<IconButton
								className="account-icon disabled"
								appearance="minimal"
								icon="history"
								intent="none"
							/>
							<IconButton
								className="account-icon disabled"
								appearance="minimal"
								icon="cloud-download"
								intent="none"
							/>
							<IconButton
								className="account-icon disabled"
								appearance="minimal"
								icon="heart"
								intent="none"
							/>
							<IconButton className="account-icon" appearance="minimal" icon="log-out" intent="danger" />
							<Avatar className="account-logo" name="Cracky Studio" size={40} isSolid color="red" />
						</div>
					</>
				)}
			</div>
			{!isLogged ? <Login /> : <Catalog />}
		</div>
	);
};

export default Dashboard;
