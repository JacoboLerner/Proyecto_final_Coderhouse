import { createLogger, format, transports, addColors} from "winston"


const {simple,colorize}= format

const levels = {
    FATAL:0,
    ERROR:1,
    WARN:2,
    INFO:3,
    HTTP:4,
    DEBUG:5
}

const colors = {
    ERROR:"white",
    FATAL: "red",
    WARN: "yellow",
    INFO: "green",
    HTTP: "blue",
    DEBUG: "cyan"
}
addColors(colors)

export default createLogger({
    levels, 
    format:colorize(),
    transports: [
        new transports.Console({
                level: "INFO", // info, fatal, warn
                format: simple()
            }),
        new transports.File({
            level: "ERROR",
            format:simple(),
            filename: "./errors.log"
        })
    ]
})


