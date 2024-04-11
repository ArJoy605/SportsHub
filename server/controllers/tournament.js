import tournament from '../models/Tournament.js';

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
        const newTournament = new tournament({
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
        const tournaments = await tournament.find();
        res.status(200).json(tournaments);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

export const deleteTournament = async (req, res) => {
    const id = req.params.id;
    try{
        await tournament.findByIdAndDelete(id);
        res.json({ message: "Tournament deleted successfully" });   
    }catch(err){
        res.status(409).json({ message: err.message });
    }
}