import loggerDev from "./loggerDev.js";
import loggerProd from "./loggerProd.js";
import dotenv from "dotenv";
import { Command } from "commander";
const program = new Command()
//manejo de version
program.option('--mode <mode>','mode of execution','development')
program.parse()
const options = program.opts()
dotenv.config({
    path: options.mode=='production' ? './.env.production' :'./.env.development',
});

let env = process.env.ENVIRONMENT
let logger = null;

switch (env) {
  case "DEV":
    logger = loggerDev;
    break;
  case "PROD":
    logger = loggerProd;
    break;
  default: //"PROD"
    logger = loggerProd;
    break;
}
console.log(env)
export default logger;