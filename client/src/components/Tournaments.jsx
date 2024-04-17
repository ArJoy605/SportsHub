import { Typography, Card, CardContent, Divider, useMediaQuery, Box, Button, } from "@mui/material";
import WidgetWrapper from "./WidgetWrapper";
import FlexBetween from "./FlexBetween";
import DeleteTournamentModal from "@/modals/DeleteTournamentModal";
import {useState} from "react";
import {useNavigate} from "react-router-dom";


const Tournaments = ({ tournamentId, title, start, end, location,maxParticipents, onDelete }) => {

    const navigate = useNavigate();
    const [deleteModal, setDeleteModal] = useState(false);
    const [alreadyRegistered, setAlreadyRegistered] = useState(false);


    // Function to convert ISO date string to a more readable format
    const formatDateString = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString(); // Adjust according to your locale preferences
    };

    // Use media query to check if the screen is small (mobile)
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

    const handleConfirmDelete = () => {
        onDelete(tournamentId);
        setDeleteModal(false);
    }

    return (
        <>
        <WidgetWrapper>
            <Card variant="outlined" sx={{ border: "1px solid #e0e0e0" }}>
                <CardContent>
                    <FlexBetween
                        gap={isSmallScreen ? "0.5rem" : "1rem"}
                        flexDirection={isSmallScreen ? "column" : "row"}
                    >
                        <Box
                            style={{
                                minWidth: isSmallScreen ? "100%" : "200px",
                                maxWidth: "200px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                            }}
                        >
                            <Typography variant="h6" sx={{ color: "#673AB7" }}>
                                <strong>Title:</strong>
                            </Typography>
                            <Typography variant="h6" style={{ marginTop: "5px", color: "#673AB7" }}>
                                {title}
                            </Typography>
                        </Box>
                        <Box display="flex" alignItems="center">
                            <Typography variant="h6" sx={{ color: "#1de9b6" }}>
                                <strong>Start Date:</strong>
                            </Typography>
                            <Typography variant="h6" sx={{ color: "#1de9b6" }}>
                                {formatDateString(start)}
                            </Typography>
                        </Box>
                        <Box display="flex" alignItems="center">
                            <Typography variant="h6" sx={{ color: "#f50057" }}>
                                <strong>End Date:</strong>
                            </Typography>
                            <Typography variant="h6" sx={{ color: "#f50057" }}>
                                {formatDateString(end)}
                            </Typography>
                        </Box>

                        <Box display="flex" alignItems="center">
                            <Typography variant="h6" sx={{ color: "#f50057" }}>
                                <strong>MaxParticipants: </strong>
                            </Typography>
                            <Typography variant="h6" sx={{ color: "#f50057" }}>
                                {maxParticipents}
                            </Typography>
                        </Box>

                        <Box display="flex" alignItems="center">
                            <Typography variant="h6" sx={{ color: "#f50057" }}>
                                <strong>Location: </strong>
                            </Typography>
                            <Typography variant="h6" sx={{ color: "#f50057" }}>
                                {location}
                            </Typography>
                        </Box>

                        <Button
                            variant="contained"
                            type="submit"
                            style={{
                                backgroundColor: "red",
                                color: "#FFF",
                                marginTop: "10px", // Add margin bottom for spacing between buttons
                                marginRight: "2%"
                            }}
                            onClick={() => setDeleteModal(true)}
                        >
                            Delete
                        </Button>


                        <Button
                            variant="contained"
                            type="submit"
                            style={{
                                backgroundColor: "green",
                                color: "#FFF",
                                marginTop: "10px", // Add margin bottom for spacing between buttons
                                marginRight: "2%"
                            }}
                            onClick={() => navigate(`/tournament/registration/${tournamentId}`)}
                        >
                            {alreadyRegistered ? "Register Another" : "Register"}
                        </Button>

                        <Button
                            variant="contained"
                            type="submit"
                            style={{
                                backgroundColor: "blue",
                                color: "#FFF",
                                marginTop: "10px", // Add margin bottom for spacing between buttons
                                marginRight: "2%"
                            }}
                            onClick={() => navigate(`/tournament/teams/${tournamentId}`)}
                        >
                            Registered Teams
                        </Button>
                    </FlexBetween>
                </CardContent>
            </Card>
        </WidgetWrapper>
        {deleteModal && <DeleteTournamentModal isOpen={deleteModal} onClose={() => setDeleteModal(false)} confirmDelete={handleConfirmDelete}/>}
        </>
    );
};

export default Tournaments;
