import mongoose from "mongoose";

const TournamentSchema = mongoose.Schema({
    start: Date,
    end: Date,
    title: String,
    color: String,
    location: Number,
    maxParticipants: Number,
    description: String,
},
{
    timestamps: true
});

const Tournament = mongoose.model("Tournament", TournamentSchema);

export default Tournament;