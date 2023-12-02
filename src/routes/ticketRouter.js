import { Router } from "express";
import { createTicket,totalToPay } from "../controllers/tickets.controller.js";

const router = Router();

router.post("/", createTicket);
router.get("/:tid", totalToPay);

export default router;