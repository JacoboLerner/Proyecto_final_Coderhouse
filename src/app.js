import express from "express";
import cors from "cors";
import { Server as SocketServer } from "socket.io";
import {Server as HTTPServer} from "http";
import mongoose from "mongoose";
import cookieParser from "cookie-parser"; 
import session from "express-session";
import MongoStore from "connect-mongo";
import handlebars from "express-handlebars";
import passport from "passport";
import  config  from "./config/env.js";
import cluster from "cluster";
import { cpus } from "os";
import compression from "express-compression";
import __dirname from "../dirname.js";
import errorHandlers from "./middlewares/errorHandlers.js";
import router from "./routes/indexRouter.js"
import winston from "./config/winston.js";
import initializePassport from "./config/passport.js";
import logger from "./config/loggers/loggerFactory.js";


const numberOfProcess = cpus().length-3
const app = express();
const httpServer = HTTPServer(app)
const io =  new SocketServer(httpServer)

app.use(cors());
app.engine("handlebars",handlebars.engine())
app.set("views",__dirname + "/src/views")
app.set("view engine","handlebars")
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
app.use('/', express.static(__dirname + '/public'))
const conn= mongoose.connect(config.mongoUrl)

app.use(
    session({
        secret: "wade0609",
        resave: true,
        saveUninitialized: true,
        store: MongoStore.create({
            mongoUrl: config.mongoUrl,
            dbName: "user",
            ttl: 3600,
        }),
    })
);
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use(winston)

app.use(compression({
    brotli: {
        enabled: true,
        zlib: {}
    }
}));

io.on('connection', async (socket) => {
    logger.INFO('se conecto un cliente');
})
app.use((req,res,next)=>{
    req.io=io;
    next();
    })

app.use("/api",router)

app.use(errorHandlers)

if(cluster.isPrimary){
        logger.INFO("primary");
        for ( let i=1; i<=numberOfProcess; i++){
            cluster.fork()
        }
        }else{
        console.log("worker",process.pid)
        httpServer.listen(config.port,"0.0.0.0",()=>logger.INFO(`connectados en ${config.port}`));
        }