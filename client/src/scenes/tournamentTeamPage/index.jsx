import Navbar from "@/scenes/navbar";
import Teams from "@/components/Teams";
import WidgetWrapper from "@/components/WidgetWrapper";
import { Typography, Box, useTheme, Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import AddTournamentModal from "@/modals/AddTournamentModal";
import { useParams } from "react-router-dom";


const tournamentTeamPage = () => {


    const [teams, setTeams] = useState([]);
    const { palette } = useTheme();
    const main = palette.neutral.main;
    const { tournamentId } = useParams();
    const [title, setTitle] = useState("");
    const [addModalOpen, setAddModalOpen] = useState(false);

    useEffect(() => {
        fetchTeams();
    }, []);



    const fetchTeams = async () => {
        try {
            await fetchTournament();
            const response = await axios.get(`http://localhost:3001/tournament/get-teams-by-tournament/${tournamentId}`);
            const data = response.data;
            const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setTeams(sortedData);
            console.log(sortedData);
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    };

    const fetchTournament = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/tournament/get-tournament/${tournamentId}`);
            const tournament = response.data;
            setTitle(tournament.title);
        } catch (error) {
            console.error("Error fetching tournament:", error);
        }
    }


    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:3001/tournament/delete-team/${id}`);
            window.alert(res.data.message);
            fetchTeams();
        } catch (error) {
            console.error("Error deleting event:", error);
        }
    }




    return (
        <Box>
            <Navbar />
            <WidgetWrapper align='center'>
                {/* <Button
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
                </Button> */}

                <Typography variant="h4" fontWeight="500" color={main}></Typography>
                {teams.map((team) => (
                    <Box key={team._id} mb="1rem">
                        <Teams
                            teamId={team._id}
                            name={team.teamName}
                            dept= {team.deptName?team.deptName:"none"}
                            tournamentName = {title}
                            onDelete={(e)=>handleDelete(e)}
                        />
                    </Box>
                ))}
            </WidgetWrapper>

        </Box>
    )
}

export default tournamentTeamPage;