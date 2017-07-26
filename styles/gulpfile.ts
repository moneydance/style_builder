import * as gulp from "gulp";
import { DevGulpFile } from "./scripts/dev/dev.gulpfile";
import { DevConfig } from "./config/dev/dev.config";
import { ProdGulpFile } from "./scripts/prod/prod.gulpfile";
import { ProdConfig } from "./config/prod/prod.config";

const env = process.env.ENV;

switch (env) {
	case "DEV":
		new DevGulpFile(new DevConfig());
		break;
	case "PROD":
		new ProdGulpFile(new ProdConfig());
		break;
	default:
		console.log("Please set your ENV environment variable to either DEV or PROD")
}


