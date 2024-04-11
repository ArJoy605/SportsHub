import express from "express";
import { createTournament, getTournaments, deleteTournament } from "../controllers/tournament.js";

import { verifyToken } from "../midldeware/auth.js";

const router = express.Router();

//READ
router.post("/create-tournament", createTournament);
router.get("/get-tournaments",  getTournaments);
router.delete("/delete-tournament/:id", deleteTournament);



export default router;