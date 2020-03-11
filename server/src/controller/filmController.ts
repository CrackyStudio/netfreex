import { Request, Response } from "express";
import { normalize } from "path";
import { readdirSync } from "fs";
import { sortByDate } from "../utils/functions";

require('dotenv').config()

const { FILES_BASE } = process.env

export class FilmController {
	public getAll(_req: Request, res: Response) {
		const dir = normalize(FILES_BASE + "/videos/films");
		let files = readdirSync(dir);
		files = sortByDate(dir, files);
		files.forEach((film, i) => {
			files[i] = film.replace(/\.[^/.]+$/, "");
		});
		res.json({
			Films: files
		});
	}

	public getFilm(req: Request, res: Response) {
		const film: string = req.params.film;
		console.log(req.params.film)
		const file = normalize(FILES_BASE + `/videos/films/${film}.mp4`);
		res.download(file);
	}

	public getImage(req: Request, res: Response) {
		const image: string = req.params.film;
		const file = normalize(FILES_BASE + `/images/films/${image}.jpg`);
		res.download(file);
	}
}
