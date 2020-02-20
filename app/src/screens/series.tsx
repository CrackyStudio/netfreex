import React, { useEffect } from "react";
import fetch from "services/fetch";
import BackButton from "components/BackButton";
import VideoPlayer from "components/VideoPlayer";
import { useStateValue } from "hooks/provider";
import { Pane, Tablist, SidebarTab } from "evergreen-ui";
import "styles/screens/series.css";

const Series: React.FC = () => {
	const [
		{ series, showPlayer, playerSource, serie, seasons, season, seasonIndex, episodes, episode, episodeIndex },
		dispatch
	] = useStateValue() as Array<any>;
	const serverIp = process.env.REACT_APP_SERVER_IP;

	useEffect(() => {
		const getSeries = async () => {
			await fetch.getSeries().then((response: { Series: any }) => {
				dispatch({ key: "series", value: response.Series });
			});
		};

		getSeries();
	}, [dispatch]);

	const getSeasons = async (serie: string) => {
		dispatch({ key: "serie", value: serie });
		await fetch.getSeasons(serie).then((response: { Seasons: any }) => {
			dispatch({ key: "seasons", value: response.Seasons });
		});
	};

	const getEpisodes = async (serie: string, season: string, index: number) => {
		dispatch({ key: "seasonIndex", value: index });
		dispatch({ key: "season", value: season });
		dispatch({ key: "episode", value: "" });
		dispatch({ key: "episodeIndex", value: null });
		await fetch.getEpisodes(serie, season).then((response: { Episodes: any }) => {
			dispatch({ key: "episodes", value: response.Episodes });
		});
	};

	const ListSeries = () => {
		if (series !== undefined) {
			let arr: JSX.Element[] = [];
			series.forEach((serie: any, idx: number) => {
				arr.push(
					<div className="serie-container" key={idx}>
						<div className="show-content" onClick={() => getSeasons(serie)}>
							<div className="show-content-overlay"></div>
							<img
								className="show-content-image"
								src={`http://${serverIp}:4242/series/get/images/${serie}`}
								alt="serie-img"
							/>
							<div className="show-content-details fadeIn-top">
								<h1>{serie}</h1>
							</div>
						</div>
					</div>
				);
			});
			return arr;
		}
	};

	const ListSeasons = () => {
		return (
			<Pane display="flex">
				<Tablist className="season-tabs">
					{seasons.map((tab: any, index: number) => (
						<SidebarTab
							className={index === seasonIndex ? "season-tab-active" : "season-tab"}
							key={tab}
							id={tab}
							onSelect={() => getEpisodes(serie, tab, index)}
							isSelected={index === seasonIndex}
							aria-controls={`panel-${tab}`}
						>
							{tab}
						</SidebarTab>
					))}
				</Tablist>
				<Pane flex="1">
					{seasons.map((tab: any, index: number) => (
						<Pane
							key={tab}
							id={`panel-${tab}`}
							role="tabpanel"
							aria-labelledby={tab}
							aria-hidden={index !== seasonIndex}
							display={index === seasonIndex ? "block" : "none"}
						>
							{ListEpisodes()}
						</Pane>
					))}
				</Pane>
			</Pane>
		);
	};

	const ListEpisodes = () => {
		if (episodes !== undefined) {
			return (
				<Pane display="flex">
					<Tablist className="season-tabs">
						{episodes.map((tab: any, index: number) => (
							<SidebarTab
								className={index === episodeIndex ? "season-tab-active" : "season-tab"}
								key={tab}
								id={tab}
								onSelect={() => enablePlayer(true, serie, season, tab, index)}
								isSelected={index === episodeIndex}
								aria-controls={`panel-${tab}`}
							>
								{tab}
							</SidebarTab>
						))}
					</Tablist>
					<Pane flex="1">
						{episodes.map((tab: any, index: number) => (
							<Pane
								key={tab}
								id={`panel-${tab}`}
								role="tabpanel"
								aria-labelledby={tab}
								aria-hidden={index !== episodeIndex}
								display={index === episodeIndex ? "block" : "none"}
								className="video-pane"
							>
								{showPlayer && episode === tab && (
									<VideoPlayer source={playerSource} backButton={false} />
								)}
							</Pane>
						))}
					</Pane>
				</Pane>
			);
		}
	};

	const enablePlayer = (
		show: boolean,
		serie: string = "",
		season: string = "",
		episode: string = "",
		index: number
	) => {
		dispatch({ key: "episode", value: episode });
		dispatch({ key: "episodeIndex", value: index });
		dispatch({
			key: "playerSource",
			value: `http://${serverIp}:4242/series/${serie}/${season}/${episode}/play`
		});
		dispatch({ key: "showPlayer", value: show });
	};

	return (
		<>
			{!seasons && <div className="series-container">{ListSeries()}</div>}
			{seasons && (
				<div className="main-serie-container">
					<BackButton screen="serie" />
					<img
						className="serie-image"
						src={`http://${serverIp}:4242/series/get/images/${serie}`}
						alt="serie-img"
					/>
					{ListSeasons()}
				</div>
			)}
		</>
	);
};

export default Series;
