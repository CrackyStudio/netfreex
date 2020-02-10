import { Request, Response } from "express";
import { resolve, join } from "path";
import { readdirSync, statSync } from 'fs';

export class Controller {
    public index(_req: Request, res: Response) {
        res.json({
            message: "Hello"
        });
    }

    public films(_req: Request, res: Response) {
        const files = readdirSync(`${resolve(__dirname, "../../public/videos/films")}`);
        files.forEach((film, i) => {
            files[i] = film.replace(/\.[^/.]+$/, "")
        })
        res.json({
            Films: files
        });
    }

    public getFilm(req: Request, res: Response) {
        const film: string = req.params.film;
        const file = `${resolve(__dirname, `../../public/videos/films/${film}.mp4`)}`
        res.download(file);
    }

    public getFilmImage(req: Request, res: Response) {
        const image: string = req.params.image;
        const file = `${resolve(__dirname, `../../public/images/films/${image}.jpg`)}`
        res.download(file);
    }
    
    public series(_req: Request, res: Response) {
        const path = `${resolve(__dirname, "../../public/videos/series")}`;
        const directories = readdirSync(path).filter(f => statSync(join(path, f)).isDirectory())
        res.json({
            Series: directories
        });
    }

    public getSerieImage(req: Request, res: Response) {
        const image: string = req.params.image;
        const file = `${resolve(__dirname, `../../public/images/series/${image}.jpg`)}`
        res.download(file);
    }

    public getSeasons(req: Request, res: Response) {
        const serie: string = req.params.serie;
        const path = `${resolve(__dirname, `../../public/videos/series/${serie}`)}`;
        const seasons = readdirSync(path).filter(f => statSync(join(path, f)).isDirectory())
        res.json({
            Seasons: seasons
        });
    }

    public getEpisodes(req: Request, res: Response) {
        const serie: string = req.params.serie;
        const season: string = req.params.season
        const files = readdirSync(`${resolve(__dirname, `../../public/videos/series/${serie}/${season}`)}`);
        files.forEach((episode, i) => {
            files[i] = episode.replace(/\.[^/.]+$/, "")
        })
        res.json({
            Episodes: files
        });
    }

    public getEpisode(req: Request, res: Response) {
        const serie: string = req.params.serie;
        const season: string = req.params.season;
        const episode: string = req.params.episode;
        const file = `${resolve(__dirname, `../../public/videos/series/${serie}/${season}/${episode}.mp4`)}`
        res.download(file);
    }
}