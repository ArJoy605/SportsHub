import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Datetime from "react-datetime";
import axios from "axios";

const UpdateEventModal = ({ isOpen, onEventUpdated, onClose, event, eventID, onDeleteEvent }) => {
    const [title, setTitle] = useState("");
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());

    useEffect(() => {
        if (event) {
            // Populate modal input fields with event details when event changes
            setTitle(event.event.title || "");
            setStart(new Date(event.event.start) || new Date());
            setEnd(new Date(event.event.end) || new Date());
        }
    }, [event]);

    const onSubmit = async (event) => {
        event.preventDefault();

        // Prepare updated event object
        try{
            const updatedEvent = {
                ...event.event,
                title,
                start,
                end
            };
    
            await axios.put(`http://27.54.151.248:3001/api/calendar/update-event/${eventID}`, updatedEvent);
            onEventUpdated(updatedEvent); // Pass updated event to parent component
            onClose(); // Close the modal
        }catch(err){
            console.error("Error Updating event: ", err);
        }
    };

    const onDelete = () => {
        onDeleteEvent(eventID); // Pass event ID to parent component for deletion
        onClose(); // Close the modal
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose}>
            <form onSubmit={onSubmit}>
                <input
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <div>
                    <label>Start Date</label>
                    <Datetime value={start} onChange={(date) => setStart(date)} />
                </div>
                <div>
                    <label>End Date</label>
                    <Datetime value={end} onChange={(date) => setEnd(date)} />
                </div>
                <button type="submit">Update Event</button>
                <button type="button" onClick={onDelete}>Delete Event</button>
            </form>
        </Modal>
    );
};

export default UpdateEventModal;
