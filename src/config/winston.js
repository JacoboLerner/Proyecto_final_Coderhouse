import config from "./loggers/loggerFactory.js"

export default (req,res,next)=>{
    req.logger=config;
    req.logger.HTTP(`${req.method} ${req.url} - ${new Date().toLocaleDateString()}`)
    return next();
}