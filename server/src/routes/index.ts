import { RootController } from "../controller/rootController";
import { UserController } from "../controller/userController";
import { VideoController } from "../controller/videoController";

export class Routes {
	public rootController: RootController = new RootController();
	public userController: UserController = new UserController();
	public videoController: VideoController = new VideoController();

	public routes(app: any): void {
		// Root routes
		app.route("/").get(this.rootController.index);

		// User routes
		app.route("/users")
            .get(this.userController.index)
            .post(this.userController.create);
        app.route("/users/:key/:value")
            .get(this.userController.show)
        app.route("/users/:id")
            .put(this.userController.update)
			.delete(this.userController.delete);
		app.route("/validate-2FA")
			.post(this.userController.validate);

		// Video routes
		app.route("/films").get(this.videoController.films);
		app.route("/films/:film").get(this.videoController.getFilm);
		app.route("/films/images/:image").get(this.videoController.getFilmImage);
		app.route("/series").get(this.videoController.series);
		app.route("/series/:serie").get(this.videoController.getSeasons);
		app.route("/series/:serie/:season").get(this.videoController.getEpisodes);
		app.route("/series/get/images/:image").get(this.videoController.getSerieImage);
		app.route("/series/:serie/:season/:episode/play").get(this.videoController.getEpisode);

		// REFACTO: Split videos routes by 2 controllers filmController & serieController
	}
}
