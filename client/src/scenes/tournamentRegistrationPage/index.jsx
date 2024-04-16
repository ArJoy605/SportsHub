import Navbar from "@/scenes/navbar";
import WidgetWrapper from "@/components/WidgetWrapper";
import { Typography, Box, useTheme, Button, TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddTournamentModal from "@/modals/AddTournamentModal";
import { useNavigate } from "react-router-dom";

const TournamentRegistrationPage = () => {
    const { palette } = useTheme();
    const main = palette.neutral.main;
    const { tournamentId } = useParams();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const [title, setTitle] = useState("");
    const [teamName, setTeamName] = useState(""); // New state for team name
    const [maxParticipants, setMaxParticipants] = useState(null);
    const [playerInfo, setPlayerInfo] = useState([]);

    useEffect(() => {
        fetchTournament();
    }, []);

    const fetchTournament = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/tournament/get-tournament/${tournamentId}`);
            const tournament = response.data;

            setMaxParticipants(tournament.maxParticipants);
            setTitle(tournament.title);
            // Initialize playerInfo array with empty objects for each participant
            setPlayerInfo(Array.from({ length: tournament.maxParticipants }, () => ({})));

        } catch (error) {
            console.error("Error fetching tournament:", error);
        }
    }

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const updatedPlayerInfo = [...playerInfo];
        updatedPlayerInfo[index] = { ...updatedPlayerInfo[index], [name]: value };
        setPlayerInfo(updatedPlayerInfo);
    };

    const handleTeamNameChange = (e) => {
        setTeamName(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createTeam();
            
            // Show a registered message
            alert("Registration successful! Check your email for further details.");
            // Navigate to the tournament page
            navigate(`/tournament/`);
        } catch (error) {
            console.error("Error submitting registration:", error);
            // Handle error if registration fails
        }
    };
    const createTeam = async () => {
        try {
            console.log(user);
            const response = await axios.post(`http://localhost:3001/tournament/create-team`, {
                whoRegistered: user._id,
                teamName,
                tournamentId,
                teamMembers: playerInfo
            });
            console.log(response.data);
        } catch (error) {
            console.error("Error creating team:", error);
        }
    }

    return (
        <Box>
            <Navbar />
            <WidgetWrapper align='center'>
                <Typography variant="h4" fontWeight="500" color={main}>
                    Register for Tournament: {title}
                </Typography>
                {/* Add team name input field */}
                
                <form onSubmit={handleSubmit}>
                    <TextField
                    label="Team Name"
                    value={teamName}
                    onChange={handleTeamNameChange}
                    variant="outlined"
                    fullWidth
                    required
                    margin="normal"
                    sx={{ width: '50%' }} // Set the width to 50% and left margin to 10%
                />
                    {[...Array(maxParticipants)].map((_, index) => (
                        <div key={index} style={{ display: "flex", alignItems: "center" }}>
                            <Box style={{ width: "50%", marginLeft: "10%" }}>
                                <TextField
                                    label={`Player ${index + 1} Name`}
                                    name={`name`}
                                    value={playerInfo[index]?.name || ""}
                                    onChange={(e) => handleChange(e, index)}
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    required
                                />
                            </Box>
                            <Box style={{ width: "50%", margin: "auto" }}>
                                <TextField
                                    label={`Player ${index + 1} Reg No`}
                                    name={`regNo`}
                                    value={playerInfo[index]?.regNo || ""}
                                    onChange={(e) => handleChange(e, index)}
                                    variant="outlined"
                                    margin="normal"
                                    type="number"
                                    fullWidth
                                    required
                                    sx={{ width: '70%' }}
                                />
                            </Box>
                        </div>
                    ))}
                    <Button
                        variant="contained"
                        type="submit"
                    // disabled={maxParticipants !== null && maxParticipants <= 0}

                    >
                        Register
                    </Button>
                </form>

            </WidgetWrapper>
        </Box>
    );
}

export default TournamentRegistrationPage;
