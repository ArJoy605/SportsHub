import Tournament from '../models/Tournament.js';
import Team from '../models/Team.js';

export const createTournament = async (req, res) => {
    try {
        const {
            start,
            end,
            title,
            color,
            location,
            description,
            maxParticipants } = req.body;
        const newTournament = new Tournament({
            start,
            end,
            title,
            color,
            location,
            description,
            maxParticipants
        });
        await newTournament.save();
        res.status(201).json(newTournament);
    }catch(err){
        res.status(409).json({ message: err.message });
    }
}

export const getTournaments = async (req, res) => {
    try {
        const tournaments = await Tournament.find();
        res.status(200).json(tournaments);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

export const deleteTournament = async (req, res) => {
    const id = req.params.id;
    try{
        await Tournament.findByIdAndDelete(id);
        res.json({ message: "Tournament deleted successfully" });   
    }catch(err){
        res.status(409).json({ message: err.message });
    }
}

export const getTournamentById = async (req, res) => {
    try {
        const id = req.params.id;
        const tournament = await Tournament.findById(id);
        if (!tournament) {
            return res.status(404).json({ message: "Tournament not found" });
        }
        res.status(200).json(tournament);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


export const createTeam = async (req, res) => {
    try{
        const { whoRegistered, tournamentId, teamName, deptName, teamMembers } = req.body;
        const newTeam = new Team({
            whoRegistered,
            tournamentId,
            teamName,
            teamMembers,
            deptName
        });
        await newTeam.save();
        res.status(201).json(newTeam);
    }
    catch(err){
        res.status(409).json({ message: err.message });
    }
}

export const getTeams = async (req, res) => {
    try {
        const teams = await Team.find();
        res.status(200).json(teams);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

export const getTeamById = async (req, res) => {
    try {
        const id = req.params.id;
        const team  = await Team.findById(id);
        if (!team) {
            return res.status(404).json({ message: "Team not found" });
        }   
        res.status(200).json(team);
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
}

export const getTeamsByTournamentId = async (req, res) => {
    try {
        const tournamentId = req.params.id;
        const teams = await Team.find({ tournamentId: tournamentId });
        
        res.status(200).json(teams);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteTeam = async (req, res) => {
    const id = req.params.id;
    try{
        await Team.findByIdAndDelete(id);
        res.json({ message: "Team deleted successfully" });   
    }catch(err){
        res.status(409).json({ message: err.message });
    }
}