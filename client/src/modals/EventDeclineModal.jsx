import React, { useState } from "react";
import Modal from "react-modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/system";
import { useTheme } from "@mui/material/styles";

const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999; /* Ensure modal appears on top of other content */
`;

const StyledForm = styled("form")(({ theme }) => ({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  padding: "2rem",
  backgroundColor: theme.palette.background.default,
  borderRadius: "8px",
}));


const StyledCloseButton = styled(Fab)(({ theme }) => ({
  position: "absolute",
  top: "0.1rem",
  right: ".1rem",
  backgroundColor: theme.palette.error.main,
  color: theme.palette.error.contrastText,
}));

const EventDeclineModal = ({ isOpen,confirmDecline, onClose}) => {
  const theme = useTheme();
  const [decription, setDescription] = useState("");



  const onSubmit = async (event) => {
    event.preventDefault();
    confirmDecline(decription);
    onClose();
  };

  return (
    <StyledModal isOpen={isOpen} onRequestClose={onClose}>
      <StyledForm onSubmit={onSubmit}>
        <StyledCloseButton onClick={onClose} sx={{ width: "35px", height: "15px" }}>
          <CloseIcon />
        </StyledCloseButton>
        <TextField
          label="Reason for Decline"
          variant="outlined"
          value={decription}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <Button variant="contained" type="submit" color="error">
          Sure
        </Button>
      </StyledForm>
    </StyledModal>
  );
};

export default EventDeclineModal;


