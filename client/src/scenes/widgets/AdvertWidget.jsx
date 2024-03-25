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
                    Sponsored
                </Typography>
                <Typography color={medium}>Sponsored Add</Typography>
            </FlexBetween>
            <img 
                width="100%"
                height="auto"
                alt = "advert"
                src="http://27.54.151.248:3001/assets/IMG_20240212_212638.jpg"
                style={{borderRadius: "0.75rem", margin: "0.75rem 0"}}
            />
            <FlexBetween>
                <Typography color={main}>ajsd;flkj;asldjf;la</Typography>
                <Typography color={medium}> al;skdjf;lkasjd;lfk</Typography>
            </FlexBetween>
            <Typography color={medium} m="0.5rem 0">
                al;ksjfd;lkasdjf;ljasd;lfj;asldkjf;lasjdf;lkjasd;flkj;asdlkfj;lskadkasdf;lkjasd;fljsladfjl
            </Typography>
        </WidgetWrapper>
    );
};

export default AdvertWidget;