import mongoose from "mongoose";

const TeamSchema = mongoose.Schema({
    whoRegistered: {
        type: String,
      },
      tournamentId: {
        type: String,
      },
      teamMembers: {
        type: Array,
        default: []
      },
      teamName: {
        type: String,
      },
},
{
    timestamps: true
});

const Team = mongoose.model("Team", TeamSchema);

export default Team;