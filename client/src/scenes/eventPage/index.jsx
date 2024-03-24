import { Box } from "@mui/material";
import CalendarEvents from "@/components/CalendarEvents";
import Navbar from "@/scenes/navbar";
// import { useSelector } from "react-redux";
import {useMediaQuery} from "@mui/material";

const EventPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  // const { _id, picturePath } = useSelector((state) => state.user);
  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap=".5rem"
        justifyContent="center"
        height="90vh"
      >
        <Box 
          flexBasis={isNonMobileScreens ? "70%" : undefined}
          maxWidth="100%" 
        >
        <CalendarEvents />
        </Box>
      </Box>
    </Box>
    // <CalendarEvents/>
  );
}

export default EventPage;