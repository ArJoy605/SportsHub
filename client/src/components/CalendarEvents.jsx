import Calendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import { useEffect, useRef, useState } from "react";
import AddEventModal from "@/modals/AddEventModal";
import UpdateEventModal from "@/modals/UpdateEventModal";
import ReqEventModal from "@/modals/ReqEventModal";
import EventsReq from "./EventsReq";
import moment from "moment";
import axios from "axios";
import { Button, Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import styled from "@emotion/styled";
import Events from "./Events";
import WidgetWrapper from "./WidgetWrapper";
import { set } from "date-fns";




const CalendarEvents = () => {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [reqModalOpen, setReqModalOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [eventsReq, setEventsReq] = useState([]);
  const user = useSelector((state) => state.user);
  const calendarRef = useRef(null);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const theme = useTheme();
  const [seeEvents, setSeeEvents] = useState(false);
  const [seeReqEvents, setSeeReqEvents] = useState(false);


  useEffect(() => {
    if (currentEvent) {
      // console.log(currentEvent.event.extendedProps._id);
      setUpdateModalOpen(true);
    }
  }, [currentEvent]);

  const onEventAdded = (event) => {
    let calendarApi = calendarRef.current.getApi();
    calendarApi.addEvent({
      start: moment(event.start).toDate(),
      end: moment(event.end).toDate(),
      title: event.title,
      color: "#1fc467"
    });

  }

  const onEventUpdated = async (updatedEvent) => {
    setEvents(prevEvents => {
      // Find the index of the event to be updated
      const index = prevEvents.findIndex(event => event.id === updatedEvent.id);
      if (index !== -1) {
        // Update the event in the events array
        const updatedEvents = [...prevEvents];
        updatedEvents[index] = updatedEvent;
        return updatedEvents;
      }
      return prevEvents;
    });


    // setEvents(prevEvents => {
    //     // Remove the previous event from the events array
    //     const filteredEvents = prevEvents.filter(event => event.id === updatedEvent.id);
    //     // Add the updated event to the events array
    //     return [...filteredEvents];
    // });

    // Close the update modal
    setUpdateModalOpen(false);

    await fetchEvents();

  };



  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://27.54.151.248:3001/api/calendar/get-events", {
        params: {
          start: moment().startOf('month').toISOString(), // Adjust as needed
          end: moment().endOf('month').toISOString() // Adjust as needed
        }
      });
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleSeeReqEvents = async () => {
    fetchEventsReq();
    setSeeReqEvents(!seeReqEvents);
  }

  const fetchEventsReq = async () => {
    try {
      const response = await axios.get("http://27.54.151.248:3001/api/calendar/get-eventsreq");
      setEventsReq(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };



  const handleEventClick = (info) => {
    // const eventId = info.event.extendedProps._id; // Extract event ID
    // console.log("Event ID:", eventId);
    if (user.isAdmin) {
      setCurrentEvent(info);
    }


    // Perform event removal logic (e.g., send a request to the backend to delete the event)
    //removeEvent(eventId);
  };

  const removeEvent = async (eventId) => {
    try {
      // Send a request to delete the event by its ID
      await axios.delete(`http://27.54.151.248:3001/api/calendar/delete-event/${eventId}`);
      await fetchEvents();

    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };





  const handleEventAdd = async (data) => {
    axios.post("http://27.54.151.248:3001/api/calendar/create-event", data.event);
  };

  const handleDatesSet = async (data) => {
    const response = await axios.get("http://27.54.151.248:3001/api/calendar/get-events?start=" + moment(data.start).toISOString() + "&end=" + moment(data.end).toISOString());
    setEvents(response.data);
  }




  return (
    <>
      {seeEvents && <WidgetWrapper>
        <Typography variant="h4" align="center">Events</Typography>
        {events.map(event => (
          <Events key={event._id} title={event.title} eventStart={event.start} eventEnd={event.end} />

        ))}
      </WidgetWrapper>}

      {seeReqEvents && <WidgetWrapper>
        <Typography variant="h4" align="center">Events</Typography>
        {eventsReq.map(event => (
          <EventsReq
            key={event._id}
            title={event.title}
            eventStart={event.start}
            eventEnd={event.end}
            description={event.description}
            location={event.location}
            status={event.status}
          />

        ))}
      </WidgetWrapper>}
      <WidgetWrapper p={2} display="flex" flexDirection="column" > {/* Adjust padding as needed */}


        <Box mb={2} mt={0} >
          {user.isAdmin && <> <Button
            variant="contained"
            type="submit"
            style={{
              backgroundColor: theme.palette.primary.main,
              color: "#FFF",
              marginTop: "10px", // Add margin bottom for spacing between buttons
              marginRight: "2%"
            }}
            onClick={() => setAddModalOpen(true)}
          >
            Add Event
          </Button>

            <Button
              variant="contained"
              style={{
                backgroundColor: "#ffc400", // Different color
                color: "#FFF",
                marginTop: "10px", // Add margin bottom for spacing between buttons
                marginRight: "2%",
                "&:hover": {
                  backgroundColor: "#b28900"
                }
              }}
            >
              Click on Any Event to Update/Delete
            </Button>

            <Button
              variant="contained"
              style={{
                backgroundColor: theme.palette.secondary.main, // Different color
                color: "#76ff03",
                marginTop: "10px", // Add margin bottom for spacing between buttons
                marginRight: "2%"
              }}

              onClick={() => setSeeEvents(!seeEvents)}
            >
              {!seeEvents ? "Show" : "Hide"} Event List of This Month
            </Button></>}





          <Button
            variant="contained"
            style={{
              backgroundColor: theme.palette.secondary.main, // Different color
              color: "#76ff03",
              marginTop: "10px", // Add margin bottom for spacing between buttons
              marginRight: "2%"
            }}

            onClick={() => setReqModalOpen(true)}
          >
            Request an Event
          </Button>

          <Button
            variant="contained"
            style={{
              backgroundColor: theme.palette.secondary.main, // Different color
              color: "#76ff03",
              marginTop: "10px", // Add margin bottom for spacing between buttons
              marginRight: "2%"
            }}

            onClick={() => handleSeeReqEvents()}
          >
            Requested Events Status
          </Button>
        </Box>

        <div style={{ position: "relative", zIndex: 0, height: "100vh" }}>
          <Calendar
            ref={calendarRef}
            events={events}
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            eventAdd={(event) => handleEventAdd(event)}
            datesSet={(date) => handleDatesSet(date)}
            editable={true}
            eventClick={(data) => handleEventClick(data)}
            
          />
        </div>

        <Box mt={2}></Box>
        <AddEventModal isOpen={addModalOpen} onClose={() => setAddModalOpen(false)}
          onEventAdded={(e) => onEventAdded(e)} />
        <ReqEventModal isOpen={reqModalOpen} onClose={() => setReqModalOpen(false)}
          onEventAdded={(e) => onEventRequested(e)} />
        {updateModalOpen && <UpdateEventModal isOpen={updateModalOpen} onClose={() => setUpdateModalOpen(false)}
          onEventUpdated={(e) => onEventUpdated(e)} event={currentEvent} eventID={currentEvent.event.extendedProps._id} onDeleteEvent={removeEvent} />}
      </WidgetWrapper>
    </>
  );
};

export default CalendarEvents;

