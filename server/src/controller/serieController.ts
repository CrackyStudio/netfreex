import { Request, Response } from "express";
import { normalize, join } from "path";
import { readdirSync, statSync } from "fs";
import { sortByDate } from "../utils/functions";

require('dotenv').config()

const { FILES_BASE } = process.env

export class SerieController {
	public getAll(_req: Request, res: Response) {
		const path = normalize(FILES_BASE + "/videos/series");
		let directories = readdirSync(path);
		directories = sortByDate(path, directories);
		res.json({
			Series: directories
		});
	}

	public getSeasons(req: Request, res: Response) {
		const serie: string = req.params.serie;
		const path = normalize(FILES_BASE + `/videos/series/${serie}`);
		const seasons = readdirSync(path).filter(f => statSync(join(path, f)).isDirectory());
		res.json({
			Seasons: seasons
		});
	}

	public getEpisodes(req: Request, res: Response) {
		const serie: string = req.params.serie;
		const season: string = req.params.season;
		const files = readdirSync(normalize(FILES_BASE + `/videos/series/${serie}/${season}`));
		files.forEach((episode, i) => {
			files[i] = episode.replace(/\.[^/.]+$/, "");
		});
		res.json({
			Episodes: files
		});
	}

	public getEpisode(req: Request, res: Response) {
		const serie: string = req.params.serie;
		const season: string = req.params.season;
		const episode: string = req.params.episode;
		const file = normalize(FILES_BASE + `/videos/series/${serie}/${season}/${episode}.mp4`);
		res.download(file);
	}

	public getImage(req: Request, res: Response) {
		const image: string = req.params.serie;
		const file = normalize(FILES_BASE + `/images/series/${image}.jpg`);
		res.download(file);
	}
}
