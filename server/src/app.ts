import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as dotenv from "dotenv";
import { RootRoutes } from "./routes";
import { AuthRoutes } from "./routes/auth";
import { SecuredRoutes } from "./routes/secured";

dotenv.config();

class App {
	public app: express.Application;
	public routes: RootRoutes = new RootRoutes();
	public authRoutes: AuthRoutes = new AuthRoutes();
	public securedRoutes: SecuredRoutes = new SecuredRoutes();

	constructor() {
		this.app = express();
		this.config();
		this.routes.routes(this.app);
		this.authRoutes.routes(this.app);
		this.securedRoutes.routes(this.app);
	}

	private config(): void {
		this.app.use(bodyParser.json());
		this.app.use(bodyParser.urlencoded({ extended: false }));
		this.app.use(cors());
	}
}

export default new App().app;
