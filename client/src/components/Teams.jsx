import { Typography, Card, CardContent, Divider, useMediaQuery, Box, Button, } from "@mui/material";
import WidgetWrapper from "./WidgetWrapper";
import FlexBetween from "./FlexBetween";
import DeleteTeamModal from "@/modals/DeleteTeamModal.jsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { saveAs } from "file-saver"; // Import file-saver library
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { useSelector } from "react-redux";


const Teams = ({ teamId, name, dept, tournamentName, onDelete }) => {

    const navigate = useNavigate();
    const [deleteModal, setDeleteModal] = useState(false);
    const [teamInfo, setTeamInfo] = useState(null);
    const user = useSelector((state) => state.user);



    // Use media query to check if the screen is small (mobile)
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

    const handleConfirmDelete = () => {
        onDelete(teamId);
        setDeleteModal(false);
    }

    const getTeamInfo = async () => {
        try {
            const response = await axios.get(`http://27.54.151.248:3001/tournament/get-team/${teamId}`);
            setTeamInfo(response.data);
            generatePDF(tournamentName,response.data);
            console.log(teamInfo);
        }
        catch (error) {
            console.error("Error fetching team:", error);
        }   
    }

    const generatePDF = (tournamentName, teamInfo) => {
        if (!teamInfo || !teamInfo.teamName || !teamInfo.deptName || !teamInfo.teamMembers) {
            console.error('Invalid teamInfo:', teamInfo);
            return;
        }
    
        console.log('Team Info:', teamInfo);
    
        const doc = new jsPDF();
    
        // Convert tournamentName to string
        tournamentName = String(tournamentName);
    
        // Calculate center position for the tournament name
        const textWidth = doc.getStringUnitWidth(tournamentName) * doc.internal.getFontSize() / doc.internal.scaleFactor;
        const pageWidth = doc.internal.pageSize.getWidth();
        const startX = (pageWidth - textWidth) / 2;
    
        // Add Tournament Name with center alignment
        doc.setFontSize(16);
        doc.setFont("bold");
        doc.text(tournamentName, startX+10, 10, { align: "center" });
    
        // Add Team Name and Department with left alignment
        doc.setFontSize(12);
        doc.setFont("normal");
        doc.text(`Team Name: ${teamInfo.teamName}`, 15, 30);
        doc.text(`Department: ${teamInfo.deptName}`, 15, 40);
    
        // Add Table Header
        doc.autoTable({
            startY: 50,
            head: [['Player', 'Name', 'Registration No']],
            styles: {
                cellPadding: 3,
                fontSize: 12,
                halign: 'center', // Center alignment for all columns
                valign: 'middle', // Vertical center alignment
            }
        });
    
        // Modify Team Members Data to have sequential player numbers
        const teamMembersData = teamInfo.teamMembers.map((member, index) => [index + 1, member.name, member.regNo]);
    
        // Add Team Members to the Table
        doc.autoTable({
            startY: doc.autoTable.previous.finalY + 5,
            body: teamMembersData,
            styles: {
                fontSize: 10,
                halign: 'center', // Center alignment for all columns
                valign: 'middle', // Vertical center alignment
            }
        });
    
        // Save the PDF as a blob
        const pdfBlob = doc.output("blob");
    
        // Trigger download
        saveAs(pdfBlob, "team_info.pdf");
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
                                <strong>Team Name: </strong>
                            </Typography>
                            <Typography variant="h6" style={{ marginTop: "5px", color: "#673AB7" }}>
                                {name}
                            </Typography>
                        </Box>
                        <Box display="flex" alignItems="center">
                            <Typography variant="h6" sx={{ color: "#1de9b6" }}>
                                <strong>Department: </strong>
                            </Typography>
                            <Typography variant="h6" sx={{ color: "#1de9b6" }}>
                                {dept}
                            </Typography>
                        </Box>
                        

                        

                        {user.isAdmin && <Button
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
                        </Button>}

                        {user.isAdmin && <Button
                            variant="contained"
                            type="submit"
                            style={{
                                backgroundColor: "blue",
                                color: "#FFF",
                                marginTop: "10px", // Add margin bottom for spacing between buttons
                                marginRight: "2%"
                            }}
                            onClick={getTeamInfo}
                        >
                            Download Info
                        </Button>}


                        {/* <Button
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
                        </Button> */}
                    </FlexBetween>
                </CardContent>
            </Card>
        </WidgetWrapper>
        {deleteModal && <DeleteTeamModal isOpen={deleteModal} onClose={() => setDeleteModal(false)} confirmDelete={handleConfirmDelete}/>}
        </>
    );
};

export default Teams;
