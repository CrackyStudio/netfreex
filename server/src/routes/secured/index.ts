import { UserController } from "../../controller/userController";
import { FilmController } from "../../controller/filmController";
import { SerieController } from "../../controller/serieController";
import { checkJwt } from "../../middleware/checkJwt";
import { isAdmin } from "../../middleware/isAdmin";

export class SecuredRoutes {
    public userController: UserController = new UserController();
    public filmController: FilmController = new FilmController();
    public serieController: SerieController = new SerieController();

	routes(app: any): void {
        const { userController, filmController, serieController } = this;

        // User routes
        app.route("/users")
            .get([checkJwt], userController.index)
        app.route("/users/:key/:value")
            .get([checkJwt, isAdmin], userController.show)
        app.route("/users/:id")
            .put([checkJwt, isAdmin], userController.update)
            .delete([checkJwt, isAdmin], userController.delete);
        app.route("/validate-2FA")
            .post([checkJwt], userController.validate);

        // Films routes
        app.route("/films").get([checkJwt], filmController.getAll);
        app.route("/films/:film").get([checkJwt], filmController.getFilm);
        app.route("/films/:film/image").get([checkJwt], filmController.getImage);
        
        // Series routes
        app.route("/series").get([checkJwt], serieController.getAll);
        app.route("/series/:serie").get([checkJwt], serieController.getSeasons);
        app.route("/series/:serie/:season").get([checkJwt], serieController.getEpisodes);
        app.route("/series/:serie/:season/:episode").get([checkJwt], serieController.getEpisode);
        app.route("/series/:serie/:season/:episode/image").get([checkJwt], serieController.getImage);
    }
}