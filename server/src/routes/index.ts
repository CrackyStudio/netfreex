import { Controller } from "../controller";

export class Routes {
    public Controller: Controller = new Controller();

    public routes(app: any): void {
        app.route("/").get(this.Controller.index); 

        app.route("/films").get(this.Controller.films);
        app.route("/films/:film").get(this.Controller.getFilm);
        app.route("/films/images/:image").get(this.Controller.getFilmImage)

        app.route("/series").get(this.Controller.series); 
        app.route("/series/:serie").get(this.Controller.getSeasons);
        app.route("/series/:serie/:season").get(this.Controller.getEpisodes);
        app.route("/series/get/images/:image").get(this.Controller.getSerieImage);
        app.route("/series/:serie/:season/:episode/play").get(this.Controller.getEpisode);      
    }
}