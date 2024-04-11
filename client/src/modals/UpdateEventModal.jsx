// import React, { useState, useEffect } from "react";
// import Modal from "react-modal";
// import Datetime from "react-datetime";
// import axios from "axios";

// const UpdateEventModal = ({ isOpen, onEventUpdated, onClose, event, eventID, onDeleteEvent }) => {
//     const [title, setTitle] = useState("");
//     const [start, setStart] = useState(new Date());
//     const [end, setEnd] = useState(new Date());

//     useEffect(() => {
//         if (event) {
//             // Populate modal input fields with event details when event changes
//             setTitle(event.event.title || "");
//             setStart(new Date(event.event.start) || new Date());
//             setEnd(new Date(event.event.end) || new Date());
//         }
//     }, [event]);

//     const onSubmit = async (event) => {
//         event.preventDefault();

//         // Prepare updated event object
//         try{
//             const updatedEvent = {
//                 ...event.event,
//                 title,
//                 start,
//                 end
//             };

//             await axios.put(`http://localhost:3001/api/calendar/update-event/${eventID}`, updatedEvent);
//             onEventUpdated(updatedEvent); // Pass updated event to parent component
//             onClose(); // Close the modal
//         }catch(err){
//             console.error("Error Updating event: ", err);
//         }
//     };

//     const onDelete = () => {
//         onDeleteEvent(eventID); // Pass event ID to parent component for deletion
//         onClose(); // Close the modal
//     };

//     return (
//         <Modal isOpen={isOpen} onRequestClose={onClose}>
//             <form onSubmit={onSubmit}>
//                 <input
//                     placeholder="Title"
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                 />
//                 <div>
//                     <label>Start Date</label>
//                     <Datetime value={start} onChange={(date) => setStart(date)} />
//                 </div>
//                 <div>
//                     <label>End Date</label>
//                     <Datetime value={end} onChange={(date) => setEnd(date)} />
//                 </div>
//                 <button type="submit">Update Event</button>
//                 <button type="button" onClick={onDelete}>Delete Event</button>
//             </form>
//         </Modal>
//     );
// };

// export default UpdateEventModal;


// import React, { useState, useEffect } from "react";
// import Modal from "react-modal";
// import Datetime from "react-datetime";
// import axios from "axios";
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
// import { styled } from "@mui/system";
// import { useTheme } from "@mui/material/styles";

// const StyledModal = styled(Modal)`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background-color: rgba(0, 0, 0, 0.5);
//   z-index: 9999; /* Ensure modal appears on top of other content */
// `;


// const StyledForm = styled("form")(({ theme }) => ({
//   display: "flex",
//   flexDirection: "column",
//   gap: "1rem",
//   padding: "2rem",
//   backgroundColor: theme.palette.background.default,
//   borderRadius: "8px",
// }));

// const StyledDatetimeContainer = styled("div")({
//   display: "flex",
//   flexDirection: "column",
//   gap: "0.5rem",
// });

// const UpdateEventModal = ({ isOpen, onEventUpdated, onClose, event, eventID, onDeleteEvent }) => {
//   const [title, setTitle] = useState("");
//   const [start, setStart] = useState(new Date());
//   const [end, setEnd] = useState(new Date());
//   const theme = useTheme(); // Access the current theme

//   useEffect(() => {
//     if (event) {
//       setTitle(event.event.title || "");
//       setStart(new Date(event.event.start) || new Date());
//       setEnd(new Date(event.event.end) || new Date());
//     }
//   }, [event]);

//   const onSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       const updatedEvent = {
//         ...event.event,
//         title,
//         start,
//         end
//       };

//       await axios.put(`http://localhost:3001/api/calendar/update-event/${eventID}`, updatedEvent);
//       onEventUpdated(updatedEvent);
//       onClose();
//     } catch (err) {
//       console.error("Error Updating event: ", err);
//     }
//   };

//   const onDelete = () => {
//     onDeleteEvent(eventID);
//     onClose();
//   };

//   return (
//     <StyledModal isOpen={isOpen} onRequestClose={onClose} >
//       <StyledForm onSubmit={onSubmit} theme={theme}>
//         <TextField
//           label="Title"
//           variant="outlined"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//         <StyledDatetimeContainer>
//           <label>Start Date</label>
//           <Datetime
//             value={start}
//             onChange={(date) => setStart(date)}
//             inputProps={{ style: { border: "1px solid #ccc", borderRadius: "4px", padding: "8px", fontSize: "16px" } }}
//           />
//         </StyledDatetimeContainer>
//         <StyledDatetimeContainer>
//           <label>End Date</label>
//           <Datetime
//             value={end}
//             onChange={(date) => setEnd(date)}
//             inputProps={{ style: { border: "1px solid #ccc", borderRadius: "4px", padding: "8px", fontSize: "16px" } }}
//           />
//         </StyledDatetimeContainer>
//         <Button variant="contained" type="submit" style={{ backgroundColor: theme.palette.primary.main, color: "#FFF" }}>
//           Update Event
//         </Button>
//         <Button variant="contained" onClick={onDelete} style={{ backgroundColor: theme.palette.primary.main, color: "#FFF" }}>
//           Delete Event
//         </Button>
//       </StyledForm>
//     </StyledModal>
//   );
// };

// export default UpdateEventModal;

import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Datetime from "react-datetime";
import axios from "axios";
import Button from "@mui/material/Button";
import { TextField, MenuItem, Select } from "@mui/material";
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
    position: "relative", // Add position relative to enable absolute positioning of close button
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    padding: "2rem",
    backgroundColor: theme.palette.background.default,
    borderRadius: "8px",
}));

const StyledDatetimeContainer = styled("div")({
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
});

const StyledCloseButton = styled(Fab)(({ theme }) => ({
    position: "absolute",
    top: "0.1rem",
    right: ".1rem",
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
}));

const UpdateEventModal = ({ isOpen, onEventUpdated, onClose, event, eventID, onDeleteEvent }) => {
    const [title, setTitle] = useState("");
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());
    const [location, setLocation] = useState(0);
    const [color, setColor] = useState("");
    const theme = useTheme(); // Access the current theme

    useEffect(() => {
        if (event) {
            setTitle(event.event.title || "");
            setStart(new Date(event.event.start) || new Date());
            setEnd(new Date(event.event.end) || new Date());
            getEvent(eventID);
        }
    }, [event]);

    const getEvent = async (eventID) => {
        const res = await axios.get(`http://localhost:3001/api/calendar/get-event/${eventID}`)
        setLocation(res.data.location);
    }
    const onSubmit = async (event) => {
        event.preventDefault();
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
            const updatedEvent = {
                ...event.event,
                title,
                start,
                end,
                location,
                color: x,
            };

            await axios.put(`http://localhost:3001/api/calendar/update-event/${eventID}`, updatedEvent);
            onEventUpdated(updatedEvent);
            onClose();
        } catch (err) {
            console.error("Error Updating event: ", err);
        }
    };

    const onDelete = () => {
        onDeleteEvent(eventID);
        onClose();
    };

    return (
        <StyledModal isOpen={isOpen} onRequestClose={onClose}>
            <StyledForm onSubmit={onSubmit} theme={theme}>
                <StyledCloseButton onClick={onClose} sx={{ width: "35px", height: "15px" }}>
                    <CloseIcon />
                </StyledCloseButton>
                <TextField
                    label="Title"
                    variant="outlined"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <StyledDatetimeContainer>
                    <label>Start Date</label>
                    <Datetime
                        value={start}
                        onChange={(date) => setStart(date)}
                        inputProps={{ style: { border: "1px solid #ccc", borderRadius: "4px", padding: "8px", fontSize: "16px" } }}
                    />
                </StyledDatetimeContainer>
                <StyledDatetimeContainer>
                    <label>End Date</label>
                    <Datetime
                        value={end}
                        onChange={(date) => setEnd(date)}
                        inputProps={{ style: { border: "1px solid #ccc", borderRadius: "4px", padding: "8px", fontSize: "16px" } }}
                    />
                </StyledDatetimeContainer>
                <StyledDatetimeContainer theme={theme}>
                    <label>Location</label>
                    <Select
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        label="Location"
                        variant="outlined"
                    >
                        <MenuItem value={0}>Central Field</MenuItem>
                        <MenuItem value={1}>Handball Ground</MenuItem>
                        <MenuItem value={2}>Basketball Ground</MenuItem>
                    </Select>
                </StyledDatetimeContainer>
                <Button variant="contained" type="submit" style={{ backgroundColor: theme.palette.primary.main, color: "#FFF" }}>
                    Update Event
                </Button>
                <Button variant="contained" onClick={onDelete} style={{ backgroundColor: theme.palette.primary.main, color: "#FFF" }}>
                    Delete Event
                </Button>
            </StyledForm>
        </StyledModal>
    );
};

export default UpdateEventModal;


