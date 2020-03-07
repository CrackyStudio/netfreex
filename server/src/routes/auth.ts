import { AuthController } from "../controller/authController";

export class AuthRoutes {
    public authController: AuthController = new AuthController();

	routes(app: any): void {
        app.route("/register").post(this.authController.register)
        app.route("/login").post(this.authController.login)
	}
}