import express from "express";
import {
    createTournament,
    getTournaments,
    deleteTournament,
    getTournamentById,
    createTeam,
    getTeams,
    getTeamById,
    getTeamsByTournamentId,
    deleteTeam
} from "../controllers/tournament.js";

import { verifyToken } from "../midldeware/auth.js";

const router = express.Router();

//READ
router.post("/create-tournament", createTournament);
router.get("/get-tournaments", getTournaments);
router.delete("/delete-tournament/:id", deleteTournament);

router.get("/get-tournament/:id", getTournamentById);
router.post("/create-team", createTeam);
router.get("/get-teams", getTeams);
router.get("/get-team/:id", getTeamById);
router.get("/get-teams-by-tournament/:id", getTeamsByTournamentId);
router.delete("/delete-team/:id", deleteTeam);



export default router;