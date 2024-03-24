// import React, { useState } from "react";
// import Modal from "react-modal";
// import Datetime from "react-datetime";

// const AddEventModal = ({isOpen, onEventAdded, onClose})=>{
//     const [title, setTitle] = useState("");
//     const [start, setStart] = useState(new Date());
//     const [end, setEnd] = useState(new Date());

//     const onSubmit = (event) =>{
//         event.preventDefault();

//         onEventAdded({
//             title,
//             start,
//             end
//         });
//         onClose();
//     }

//     return(
//         <Modal isOpen ={isOpen} onRequestClose={onClose}>
//             <form onSubmit={onSubmit}>
//                 <input placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)}/>

//                 <div>
//                 <label>Start Date</label>
//                 <Datetime value={start} onChange={(date)=>setStart(date)}/>
//                 </div>

//                 <div>
//                 <label>End Date</label>
//                 <Datetime value={end} onChange={(date)=>setEnd(date)}/>
//                 </div>

//                 <button>Add Event</button>

//             </form>

//         </Modal>
//     );
// };

// export default AddEventModal;

import React, { useState } from "react";
import Modal from "react-modal";
import Datetime from "react-datetime";
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

const StyledDatetimeContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  color: theme.palette.mode === 'dark' ? theme.palette.text.primary : theme.palette.text.secondary, // Set text color based on theme mode
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.background.paper, // Set background color based on theme mode
}));

const StyledCloseButton = styled(Fab)(({ theme }) => ({
  position: "absolute",
  top: "0.1rem",
  right: ".1rem",
  backgroundColor: theme.palette.error.main,
  color: theme.palette.error.contrastText,
}));

const AddEventModal = ({ isOpen, onEventAdded, onClose }) => {
  const theme = useTheme();
  const [title, setTitle] = useState("");
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());

  const onSubmit = (event) => {
    event.preventDefault();
    onEventAdded({
      title,
      start,
      end,
    });
    onClose();
  };

  return (
    <StyledModal isOpen={isOpen} onRequestClose={onClose}>
      <StyledForm onSubmit={onSubmit}>
        <StyledCloseButton onClick={onClose} sx={{ width: "35px", height: "15px" }}>
          <CloseIcon />
        </StyledCloseButton>
        <TextField
          label="Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <StyledDatetimeContainer theme={theme}>
          <label>Start Date</label>
          <Datetime
            value={start}
            onChange={(date) => setStart(date)}
            inputProps={{ style: { border: "1px solid #ccc", borderRadius: "4px", padding: "8px", fontSize: "16px" } }}
          />
        </StyledDatetimeContainer>
        <StyledDatetimeContainer theme={theme}>
          <label>End Date</label>
          <Datetime
            value={end}
            onChange={(date) => setEnd(date)}
            inputProps={{ style: { border: "1px solid #ccc", borderRadius: "4px", padding: "8px", fontSize: "16px" } }}
          />
        </StyledDatetimeContainer>
        <Button variant="contained" type="submit" style={{ backgroundColor: theme.palette.primary.main, color: "#FFF" }}>
          Add Event
        </Button>
      </StyledForm>
    </StyledModal>
  );
};

export default AddEventModal;


