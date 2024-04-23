import Calendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import { useEffect, useRef, useState } from "react";
import AddEventModal from "@/modals/AddEventModal";
import UpdateEventModal from "@/modals/UpdateEventModal";
import ReqEventModal from "@/modals/ReqEventModal";
import EventsReq from "./EventsReq";
import moment from "moment";
import axios from "axios";
import { Button, Box, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import styled from "@emotion/styled";
import Events from "./Events";
import WidgetWrapper from "./WidgetWrapper";
import { set } from "date-fns";
import EventWidget from "@/scenes/widgets/EventWidget";




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
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");


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
      color: event.color
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
      const data = response.data;
      const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setEventsReq(sortedData);
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
    console.log(data.event);
    axios.post("http://27.54.151.248:3001/api/calendar/create-event", data.event);
  };

  const handleDatesSet = async (data) => {
    const response = await axios.get("http://27.54.151.248:3001/api/calendar/get-events?start=" + moment(data.start).toISOString() + "&end=" + moment(data.end).toISOString());
    setEvents(response.data);
  }



  const itemsPerPage = 6;

  const [currentPage, setCurrentPage] = useState(1);

  const totalEventPages = Math.ceil(eventsReq.length / itemsPerPage);

  const paginatedEvents = eventsReq.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);


  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };




  return (
    <>
      {seeEvents && <WidgetWrapper>
        <Typography variant="h4" align="center">Events</Typography>
        {events.map(event => (
          <Events key={event._id}
            title={event.title}
            eventStart={event.start}
            eventEnd={event.end}
          />
        ))}
      </WidgetWrapper>}

      {/* {seeReqEvents && <WidgetWrapper>
        <Typography variant="h4" align="center">Events</Typography>
        {eventsReq.map(event => (
          <EventsReq
            key={event._id}
            eventId={event._id}
            title={event.title}
            eventStart={event.start}
            eventEnd={event.end}
            eventDescription={event.description}
            location={event.location}
            eventStatus={event.status}
            onEventAdded={(e) => onEventAdded(e)}
          />

        ))}
      </WidgetWrapper>} */}

      {seeReqEvents && (!isNonMobileScreens ? <>
        <Typography variant="h4" align="center">Events Requested</Typography>
        {paginatedEvents.map(event => (
          <Box
            key={event._id}
            width="100%"
            padding="2rem 6%"
            display={isNonMobileScreens ? "flex" : "block"}
            gap=".5rem"
            justifyContent="space-between"
          >
            <EventWidget
              eventId={event._id}
              title={event.title}
              eventDescription={event.description}
              eventStart={event.start}
              eventEnd={event.end}
              location={event.location}
              onEventAdded={(e) => onEventAdded(e)}
              eventStatus={event.status}
            />
          </Box>
        ))}
        <Box display="flex" justifyContent="center" marginTop="1rem">
          <Button disabled={currentPage === 1} onClick={handlePrevPage}>Previous</Button>
          <Typography variant="body1" component="span" style={{ margin: '0 1rem' }}>{currentPage} of {totalEventPages}</Typography>
          <Button disabled={currentPage === totalEventPages} onClick={handleNextPage}>Next</Button>
        </Box>
      </> :
        (
          <>
            <Typography variant="h4" align="center">Events Requested</Typography>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
              {paginatedEvents.map((event, index) => (
                <Box
                  key={event._id}
                  width="calc(50% - 0.5rem)"
                  padding="1rem 0%"
                  marginBottom="1rem"
                  display="flex"
                  gap=".5rem"
                  flexDirection={isNonMobileScreens ? 'row' : 'column'}
                >
                  <EventWidget
                    eventId={event._id}
                    title={event.title}
                    eventDescription={event.description}
                    eventStart={event.start}
                    eventEnd={event.end}
                    location={event.location}
                    onEventAdded={(e) => onEventAdded(e)}
                    eventStatus={event.status}
                  />
                </Box>
              ))}
            </div>
            <Box display="flex" justifyContent="center" marginTop="1rem" pb="1.1rem">
              <Button disabled={currentPage === 1} onClick={handlePrevPage}>Previous</Button>
              <Typography variant="body1" component="span" style={{ margin: '0 1rem' }}>{currentPage} of {totalEventPages}</Typography>
              <Button disabled={currentPage === totalEventPages} onClick={handleNextPage}>Next</Button>
            </Box>
          </>
        ))

      }
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





          {user.isDept && <><Button
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
          </Button></>}

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
          <Box display="flex" justifyContent="center" mb={2} flexDirection="row">
            <Box display="flex" alignItems="center" mr={1}>
              <Box width={20} height={20} bgcolor="#42FF74" mr={1}></Box>
              <span>Central Field</span>
            </Box>
            <Box display="flex" alignItems="center" mr={1}>
              <Box width={20} height={20} bgcolor="#FFAE42" mr={1}></Box>
              <span>Handball Ground</span>
            </Box>
            <Box display="flex" alignItems="center">
              <Box width={20} height={20} bgcolor="#9543FF" mr={1}></Box>
              <span>Basketball Ground</span>
            </Box>
          </Box>
          <Calendar
            ref={calendarRef}
            events={events}
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
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

