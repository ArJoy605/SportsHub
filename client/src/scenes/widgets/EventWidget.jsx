import { Typography, Card, CardContent, Divider, useMediaQuery, Box, Button, useTheme, ButtonGroup } from "@mui/material";
import { useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import moment from "moment";
import EventDeclineModal from "@/modals/EventDeclineModal";
import EventAcceptModal from "@/modals/EventAcceptModal";
import FlexBetween from "@/components/FlexBetween";
import WidgetWrapperWithProps from "@/components/WidgetWrapperWithProps";

const EventWidget = ({ eventId, title, eventStart, eventEnd, eventDescription, location, eventStatus, onEventAdded }) => {
    // Function to convert ISO date string to a more readable format


    const user = useSelector((state) => state.user);
    const [status, setStatus] = useState(eventStatus);
    const [declineModal, setDeclineModal] = useState(false);
    const [acceptModal, setAcceptModal] = useState(false);
    const [description, setDescription] = useState(eventDescription);
    const { palette } = useTheme();
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;
    const formatDateString = (dateString) => {
        const date = new Date(dateString);
        const options = {
            weekday: 'long', // Display full weekday name (e.g., "Monday")
            year: 'numeric',
            month: 'long', // Display full month name (e.g., "January")
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true // Use 12-hour clock with AM/PM
        };
        return date.toLocaleString('en-US', options); // Adjust locale as needed
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
    const locationColor = getLocationColor(location);

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
        <WidgetWrapperWithProps width={isSmallScreen?320:600} height={isSmallScreen?undefined:260}>
            {/*First Row */}
            <FlexBetween
                gap="0.5rem"
                pb="1.1rem">
                <FlexBetween gap="1rem">
                    <Box
                        style={{
                            minWidth: isSmallScreen ? "130%" : "300px",
                            maxWidth: "200px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                        }}
                    >
                        <Typography
                            variant="h5"
                            color={dark}
                            sx={{
                                "&:hover": {
                                    color: palette.primary.light,
                                    cursor: "pointer"
                                }
                            }}
                        >
                            <strong>Title: </strong>
                            <span style={{ wordWrap: "break-word" }}>{title}</span>
                        </Typography>
                        <Typography color={medium}>
                            Rejection: {description}
                        </Typography>
                    </Box>
                </FlexBetween>
                {!isSmallScreen && 
                user.isAdmin && <ButtonGroup>
                    {status !=2 &&  
                         <Button disabled={status!=0} onClick={()=>setAcceptModal(true)} variant="outlined">
                             {status === 0 ? "Approve" : "Approved"}
                         </Button>
                     }
                     {status!=1 && 
                         <Button disabled={status!=0}  onClick={() => setDeclineModal(true)} variant="outlined" color="warning">
                         {status === 0 ? "Decline" : "Declined"}
                         </Button>
                     }
                 </ButtonGroup>}

                 {
                            !user.isAdmin && <Box>
                                <Button variant="contained" sx={{
                                    backgroundColor: getStatusColor(status),
                                    "&.Mui-disabled": {
                                        opacity: 0.8, // Adjust the opacity value for the background color
                                        color: '#B3C8CF',
                                        opacity: ".7", // Ensure text color remains fully opaque
                                        '&:hover': {
                                            backgroundColor: getStatusColor(status), // Ensure hover state maintains color
                                        }
                                    }
                                }}>
                                    {getStatusLabel(status)}
                                </Button>
                            </Box>
                        }

            </FlexBetween>
            <Divider />
            <Box p="1rem 0" >
                <FlexBetween >
                    <Typography color={main} fontWeight="500">Start Date: <strong>{formatDateString(eventStart)}</strong></Typography>
                    <Typography color={main} fontWeight="500">End Date: <strong>{formatDateString(eventEnd)}</strong></Typography>
                </FlexBetween>

                <Box alignContent="center" pt="1.1rem" pb="1.1rem">

                    <Typography sx={{color: locationColor, opacity:".7"}}>Location : <strong> {getLocationLabel(location)}</strong></Typography>
                </Box>
                {isSmallScreen && user.isAdmin &&<>
                    <FlexBetween>
                    {status !=2 &&  
                         <Button disabled={status!=0} onClick={()=>setAcceptModal(true)} variant="outlined">
                             {status === 0 ? "Approve" : "Approved"}
                         </Button>
                     }
                     {status!=1 && 
                         <Button disabled={status!=0}  onClick={() => setDeclineModal(true)} variant="outlined" color="warning">
                         {status === 0 ? "Decline" : "Declined"}
                         </Button>
                     }
                    </FlexBetween>
                </>
                }
            </Box>


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
        </WidgetWrapperWithProps>
    );
};

export default EventWidget;
