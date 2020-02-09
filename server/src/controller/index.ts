import { Request, Response } from "express";
import { resolve } from "path";
import { readdirSync } from 'fs';

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

    public async getFilm(req: Request, res: Response) {
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
        // toDo
    }
}