import React from "react";
import mLogo from "media/moshed-logo.gif";
import Catalog from "screens/catalog";
import Login from "screens/login";
import HeaderButton from "components/HeaderButton";
import AccountBar from "components/AccountBar";
import { useStateValue } from "hooks/provider";
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
						<AccountBar />
					</>
				)}
			</div>
			{!isLogged ? <Login /> : <Catalog />}
		</div>
	);
};

export default Dashboard;
