import { Router } from "express";
import { createTicket,totalToPay } from "../controllers/tickets.controller.js";
import isUser from "../middlewares/isUser.js";

const router = Router();

router.post("/:cid",isUser, createTicket);
router.get("/:tid", totalToPay);

export default router;