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

export default {
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    adminName: process.env.ADMIN_EMAIL,
    adminPassword: process.env.ADMIN_PASSWORD,
    mailDelEcommerce: process.env.NODEMAILER_USER,
    mailPasswordDelEcommerce: process.env.NODEMAILER_PASSWORD,
    privateKey:process.env.PRIVATE_KEY,
    persistance:process.env.PERSISTANCE
}
