import React, { useEffect } from "react";
import fetch from "services/fetch";
import VideoPlayer from "components/VideoPlayer";
import { useStateValue } from "hooks/provider";
import "styles/screens/films.css";

const Films: React.FC = () => {
	const [{ films, showPlayer, playerSource }, dispatch] = useStateValue() as Array<any>;
	const { REACT_APP_SERVER_IP } = process.env;

	useEffect(() => {
		const getFilms = async () => {
			await fetch.getFilms().then((response: { Films: any }) => {
				dispatch({ key: "films", value: response.Films });
			});
		};

		getFilms();
	}, [dispatch]);

	const ListFilms = () => {
		if (films !== undefined) {
			let arr: JSX.Element[] = [];
			films.forEach((film: any, idx: number) => {
				arr.push(
					<div className="film-container" key={idx}>
						<div className="show-content" onClick={() => enablePlayer(true, film)}>
							<div className="show-content-overlay"></div>
							<img
								className="show-content-image"
								src={`http://${REACT_APP_SERVER_IP}:4242/films/images/${film}`}
								alt="film-img"
							/>
							<div className="show-content-details fadeIn-top">
								<h1>{film}</h1>
							</div>
						</div>
					</div>
				);
			});
			return arr;
		}
	};

	const enablePlayer = (show: boolean, film: string = "") => {
		dispatch({
			key: "playerSource",
			value: `http://${REACT_APP_SERVER_IP}:4242/films/${film}`
		});
		dispatch({ key: "showPlayer", value: show });
	};

	return (
		<>
			{!showPlayer && <div className="films-container">{ListFilms()}</div>}
			{showPlayer && <VideoPlayer source={playerSource} />}
		</>
	);
};

export default Films;
