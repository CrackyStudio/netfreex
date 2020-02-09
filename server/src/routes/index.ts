import { Controller } from "../controller";

export class Routes {
    public Controller: Controller = new Controller();

    public routes(app: any): void {
        app.route("/").get(this.Controller.index); 

        app.route("/films").get(this.Controller.films);
        app.route("/films/:film").get(this.Controller.getFilm);
        app.route("/films/images/:image").get(this.Controller.getFilmImage)

        app.route("/series").get(this.Controller.series);        
    }
}