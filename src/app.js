import express from "express";
import { Server as SocketServer } from "socket.io";
import {Server as HTTPServer} from "http";
import mongoose from "mongoose";
import cookieParser from "cookie-parser"; 
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import  config  from "./config/env.js";
import cluster from "cluster";
import { cpus } from "os";
import compression from "express-compression";



const numberOfProcess = cpus().length-1
const app = express();
const httpServer = HTTPServer(app)
const io =  new SocketServer(httpServer)

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
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

app.use(compression({
    brotli: {
        enabled: true,
        zlib: {}
    }
}));

app.use((req,res,next)=>{
    req.io=io;
    next();
    })

app.get("/", (req,res)=>{
    return res.status(200).json({message:"hola mundost"})
})

if(cluster.isPrimary){
        console.log("primary");
        for ( let i=1; i<=numberOfProcess; i++){
            cluster.fork()
        }
        }else{
        console.log("worker",process.pid)
        httpServer.listen(config.port,()=>console.log(`connectados en ${config.port}`));
        }