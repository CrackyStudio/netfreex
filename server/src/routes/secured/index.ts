import { UserController } from "../../controller/userController";
import { VideoController } from "../../controller/videoController";
import { checkJwt } from "../../middleware/checkJwt";
import { isAdmin } from "../../middleware/isAdmin";

export class SecuredRoutes {
    public userController: UserController = new UserController();
    public videoController: VideoController = new VideoController();

	routes(app: any): void {
        // User routes
        app.route("/users")
            .get([checkJwt], this.userController.index)
        app.route("/users/:key/:value")
            .get([checkJwt, isAdmin], this.userController.show)
        app.route("/users/:id")
            .put([checkJwt, isAdmin], this.userController.update)
            .delete([checkJwt, isAdmin], this.userController.delete);
        app.route("/validate-2FA")
            .post([checkJwt], this.userController.validate);

        // Video routes
        app.route("/films").get([checkJwt], this.videoController.films);
        app.route("/films/:film").get([checkJwt], this.videoController.getFilm);
        app.route("/films/images/:image").get([checkJwt], this.videoController.getFilmImage);
        app.route("/series").get([checkJwt], this.videoController.series);
        app.route("/series/:serie").get([checkJwt], this.videoController.getSeasons);
        app.route("/series/:serie/:season").get([checkJwt], this.videoController.getEpisodes);
        app.route("/series/get/images/:image").get([checkJwt], this.videoController.getSerieImage);
        app.route("/series/:serie/:season/:episode/play").get([checkJwt], this.videoController.getEpisode);

        // REFACTO: Split videos routes by 2 controllers filmController & serieController
    }
}