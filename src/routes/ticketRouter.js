import { Router } from "express";
import { createTicket,totalToPay } from "../controllers/tickets.controller.js";
import isUser from "../middlewares/isUser.js";

const router = Router();

router.get("/:cid",isUser, createTicket);
router.get("/total/:tid", totalToPay);

export default router;