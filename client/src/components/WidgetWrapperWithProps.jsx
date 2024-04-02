import { Box } from "@mui/material";
import { styled } from "@mui/system";

const StyledWidgetWrapper = styled(Box)(({ theme, width, height }) => ({
  padding: "1.5rem 1.5rem .75rem 1.5rem",
  backgroundColor: theme.palette.background.alt,
  borderRadius: "0.75rem",
  width: width, // Set width dynamically based on prop
  height: height, // Set height dynamically based on prop
}));

const WidgetWrapperWithProps = ({ width, height, children }) => {
  return (
    <StyledWidgetWrapper width={width} height={height}>
      {children}
    </StyledWidgetWrapper>
  );
};

export default WidgetWrapperWithProps;
