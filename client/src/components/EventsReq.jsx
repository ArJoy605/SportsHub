import { Typography, Card, CardContent, Divider, useMediaQuery, Box, Button } from "@mui/material";
import WidgetWrapper from "./WidgetWrapper";
import FlexBetween from "./FlexBetween";
import { useSelector } from "react-redux";
import {useState} from "react";
import axios from "axios";
import moment from "moment";
import EventDeclineModal from "@/modals/EventDeclineModal";
import EventAcceptModal from "@/modals/EventAcceptModal";

const EventsReq = ({eventId, title, eventStart, eventEnd, eventDescription, location, eventStatus, onEventAdded }) => {
    // Function to convert ISO date string to a more readable format
    const user = useSelector((state) => state.user);
    const [status, setStatus] = useState(eventStatus);
    const [declineModal, setDeclineModal] = useState(false);
    const [acceptModal, setAcceptModal] = useState(false);
    const [description, setDescription] = useState(eventDescription);
    const formatDateString = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString(); // Adjust according to your locale preferences
    };

    // Use media query to check if the screen is small (mobile)
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

    // Function to get the status label based on the status value
    const getStatusLabel = (status) => {
        switch (status) {
            case 0:
                return "Pending";
            case 1:
                return "Approved";
            case 2:
                return "Declined";
            default:
                return "";
        }
    };

    // Function to get the color of the status button based on the status value
    const getStatusColor = (status) => {
        console
        switch (status) {
            case 0:
                return "#FFC107"; // Yellow for Pending
            case 1:
                return "#4CAF50"; // Green for Approved
            case 2:
                return "#F44336"; // Red for Declined
            default:
                return "#FFFFFF"; // Default color
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


    const getLocationColor = (location) =>{
        let x;
        if (location === 0) {
            x = "#42FF74";
        }
        else if (location === 1) {
            x = "#FFAE42";
        }
        else {
            x = "#9543FF"
        }

        return x;
    }

    const confirmAccept = async () => {
        await handleApprove();
    }

    const confirmDecline = async (declineDescription) => {
         await handleDecline(declineDescription);
         setDescription(declineDescription);
    }

    const handleApprove = async () => {
        setStatus(1);
        let x;
        if (location === 0) {
            x = "#42FF74";
        }
        else if (location === 1) {
            x = "#FFAE42";
        }
        else {
            x = "#9543FF"
        }

        try {
            const newEvent = {
                title,
                start: moment(eventStart).toDate(),
                end: moment(eventEnd).toDate(),
                location,
                status,
                color: x
            };
            await axios.post("http://27.54.151.248:3001/api/calendar/create-event", newEvent);

            const updatedEventReq = {
                title,
                start: eventStart,
                end: eventEnd,
                description,
                location,
                status: 1,
            }
            await axios.put(`http://27.54.151.248:3001/api/calendar/update-eventreq/${eventId}`, updatedEventReq);
            
            onEventAdded({
                title,
                start: eventStart,
                end: eventEnd,
                location,
                color: x
            })
        }
        catch (err) {
            console.error("Error Approving event: ", err);
        }
    }


    const handleDecline = async (declineDescription) => {
        setStatus(2);
        const updatedEventReq = {
            title,
            start: eventStart,
            end: eventEnd,
            description: declineDescription,
            location,
            status: 2,
        }
        console.log("Decline Description: ", declineDescription);
        await axios.put(`http://27.54.151.248:3001/api/calendar/update-eventreq/${eventId}`, updatedEventReq);
    }

    return (
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
                                {formatDateString(eventStart)}
                            </Typography>
                        </Box>
                        <Box display="flex" alignItems="center">
                            <Typography variant="h6" sx={{ color: "#f50057" }}>
                                <strong>End Date:</strong>
                            </Typography>
                            <Typography variant="h6" sx={{ color: "#f50057" }}>
                                {formatDateString(eventEnd)}
                            </Typography>
                        </Box>
                        {status==2 && <Box display="flex" alignItems="center">
                            <Typography variant="h6" sx={{ color: "#FFC107" }}>
                                <strong>Reason:</strong>
                            </Typography>
                            <Typography variant="h6" sx={{ color: "#FFC107" }}>
                                {description}
                            </Typography>
                        </Box>}
                        <Box display="flex" alignItems="center">
                            <Typography variant="h6" sx={{ color: "#9C27B0" }}>
                                <strong>Location:</strong>
                            </Typography>
                            <Typography variant="h6" sx={{ color: "#9C27B0" }}>
                                {getLocationLabel(location)}
                            </Typography>
                        </Box>
                        {
                            !user.isAdmin && <Box>
                                <Button variant="contained" sx={{
                                    backgroundColor: getStatusColor(status),
                                    "&.Mui-disabled": {
                                        opacity: 0.8, // Adjust the opacity value for the background color
                                        color: 'rgba(0, 0, 0, 0.87)', // Ensure text color remains fully opaque
                                        '&:hover': {
                                            backgroundColor: getStatusColor(status), // Ensure hover state maintains color
                                        }
                                    }
                                }}>
                                    {getStatusLabel(status)}
                                </Button>
                            </Box>
                        }

                        {user.isAdmin && <>
                           {status !=2 &&  <Box>
                                <Button disabled={status!=0} onClick={()=>setAcceptModal(true)} variant="contained" color="success">
                                    {status === 0 ? "Approve" : "Approved"}
                                </Button>
                            </Box>}
                            {status!=1 && <Box>
                                <Button disabled={status!=0}  onClick={() => setDeclineModal(true)} variant="contained" color="error">
                                {status === 0 ? "Decline" : "Declined"}
                                </Button>
                            </Box>}
                        </>}
                    </FlexBetween>
                </CardContent>
            </Card>

            <EventDeclineModal 
            isOpen={declineModal} 
            onClose={() => setDeclineModal(false)}
            confirmDecline={(e)=>confirmDecline(e)}
           />

           <EventAcceptModal
              isOpen={acceptModal}
              onClose={() => setAcceptModal(false)}
            confirmAccept={()=>confirmAccept()}
                />
        </WidgetWrapper>
    );
};

export default EventsReq;
