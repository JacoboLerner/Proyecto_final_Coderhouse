import { Router } from "express";
import logger from "../config/loggers/loggerFactory.js";

const router = Router()
router.get('/', async (req, res) => {
    logger.DEBUG('Esto es un mensaje de debug');
    logger.HTTP('Esto es un mensaje de http');
    logger.INFO('Esto es un mensaje de info');
    logger.WARN('Esto es un mensaje de warning');
    logger.ERROR('Esto es un mensaje de error');
    logger.FATAL('Esto es un mensaje de fatal');

    res.send('Los logs se han registrado correctamente.');
})

export default router;