import Navbar from "@/scenes/navbar";
import Tournaments from "@/components/Tournaments";
import WidgetWrapper from "@/components/WidgetWrapper";
import { Typography, Box, useTheme, Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import AddTournamentModal from "@/modals/AddTournamentModal";


const tournamentPage = () => {


    const [tournaments, setTournaments] = useState([]);
    const { palette } = useTheme();
    const main = palette.neutral.main;
    const [addModalOpen, setAddModalOpen] = useState(false);

    useEffect(() => {
        fetchTournaments();
    }, []);

    const handleTournamentAdd = () => {
        fetchTournaments();
    };


    const fetchTournaments = async () => {
        try {
            const response = await axios.get("http://localhost:3001/tournament/get-tournaments");
            const data = response.data;
            const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setTournaments(sortedData);
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    };

    const getLocationLabel = (location) => {
        switch (location) {
            case 0:
                return "Central Field";
            case 1:
                return "HandBall Ground";
            case 2:
                return "BasketBall Ground";
            default:
                return "";
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/tournament/delete-tournament/${id}`);
            fetchTournaments();
        } catch (error) {
            console.error("Error deleting event:", error);
        }
    }




    return (
        <Box>
            <Navbar />
            <WidgetWrapper align='center'>
                <Button
                    variant="contained"
                    type="submit"
                    style={{
                        backgroundColor: {main},
                        color: "#FFF",
                        marginTop: "10px", // Add margin bottom for spacing between buttons
                        marginRight: "2%"
                    }}
                    onClick={() => setAddModalOpen(true)}
                >
                    Add a new Tournament
                </Button>

                <Typography variant="h4" fontWeight="500" color={main}></Typography>
                {tournaments.map((tournament) => (
                    <Box key={tournament._id} mb="1rem">
                        <Tournaments
                            tournamentId={tournament._id}
                            title={tournament.title}
                            start={tournament.start}
                            end={tournament.end}
                            location = {getLocationLabel(tournament.location)}
                            maxParticipents={tournament.maxParticipants}
                            onDelete={(e)=>handleDelete(e)}
                        />
                    </Box>
                ))}
            </WidgetWrapper>
            {addModalOpen && <AddTournamentModal isOpen={addModalOpen} onClose={() => setAddModalOpen(false)} onTournamentAdded={handleTournamentAdd}/>}

        </Box>
    )
}

export default tournamentPage;