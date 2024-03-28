import { Typography, Card, CardContent, Divider, useMediaQuery, Box, Button } from "@mui/material";
import WidgetWrapper from "./WidgetWrapper";
import FlexBetween from "./FlexBetween";

const EventsReq = ({ title, eventStart, eventEnd, description, location, status }) => {
    // Function to convert ISO date string to a more readable format
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
                        <Box display="flex" alignItems="center">
                            <Typography variant="h6" sx={{ color: "#FFC107" }}>
                                <strong>Description:</strong>
                            </Typography>
                            <Typography variant="h6" sx={{ color: "#FFC107" }}>
                                {description}
                            </Typography>
                        </Box>
                        <Box display="flex" alignItems="center">
                            <Typography variant="h6" sx={{ color: "#9C27B0" }}>
                                <strong>Location:</strong>
                            </Typography>
                            <Typography variant="h6" sx={{ color: "#9C27B0" }}>
                                {getLocationLabel(location)}
                            </Typography>
                        </Box>
                        <Box>
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
                    </FlexBetween>
                </CardContent>
            </Card>
        </WidgetWrapper>
    );
};

export default EventsReq;
