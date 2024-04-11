import { Typography, useTheme } from "@mui/material";
import FlexBetween from "@/components/FlexBetween";
import WidgetWrapper from "@/components/WidgetWrapper";


const AdvertWidget = () => {
    const {palette} = useTheme();
    const dark = palette.neutral.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;

    return(
        <WidgetWrapper>
            <FlexBetween>
                <Typography color={dark} variant="h5" fontWeight="500">
                    Latest Events
                </Typography>
                <Typography color={medium}>CSE Basketball Team 2024</Typography>
            </FlexBetween>
            <img 
                width="100%"
                height="auto"
                alt = "advert"
                src="http://localhost:3001/assets/frontpage.jpg"
                style={{borderRadius: "0.75rem", margin: "0.75rem 0"}}
            />
            <FlexBetween>
                {/* <Typography color={main}>ajsd;flkj;asldjf;la</Typography>
                <Typography color={medium}> al;skdjf;lkasjd;lfk</Typography> */}
            </FlexBetween>
            <Typography color={medium} m="0.5rem 0">
            SUST CSE deserves hearty congratulations for emerging as the champions in the Inter-Department Basketball Tournament 2024! Their remarkable teamwork and dedication have truly paid off, showcasing their excellence on the court. Here's to continued success for the SUST CSE team! 🏀🏆 #SUSTCSE #Champions #BasketballTournament
            </Typography>
        </WidgetWrapper>
    );
};

export default AdvertWidget;