import { Typography, Card, CardContent, Divider, useMediaQuery, Box } from "@mui/material";
import WidgetWrapper from "./WidgetWrapper";
import FlexBetween from "./FlexBetween";

const Events = ({ title, eventStart, eventEnd }) => {
    // Function to convert ISO date string to a more readable format
    const formatDateString = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString(); // Adjust according to your locale preferences
    };

    // Use media query to check if the screen is small (mobile)
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

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
                    </FlexBetween>
                </CardContent>
            </Card>
        </WidgetWrapper>
    );
};

export default Events;
