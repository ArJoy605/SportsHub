// import Event from "../models/Events.js";
// import moment from "moment";
// import express from "express";

// const router = express.Router();

// router.post("/create-event", async(req, res)=>{
//     const event = Event(req.body);
//     await event.save();
//     res.status(201).send("Everything is okay");
// });

// router.get("/get-events", async(req, res)=>{
//     const events = await Event.find({
//         start: {$gte: moment(req.query.start).toDate()},
//         end: {$lte: moment(req.query.end).toDate()},
//     });

//     res.status(201).send(events);
// })

// export default router;

import Event from "../models/Events.js";
import EventReq from "../models/EventsReq.js";
import moment from "moment";
import express from "express";

const router = express.Router();

// Create event
router.post("/create-event", async (req, res) => {
    const event = Event(req.body);
    await event.save();
    res.status(201).send("Event created successfully");
});

router.post("/req-event", async (req, res) => {
    const event = EventReq(req.body);
    await event.save();
    res.status(201).send("Event Requested successfully");
});


// Get events
router.get("/get-events", async (req, res) => {
    const events = await Event.find({
        start: { $gte: moment(req.query.start).toDate() },
        end: { $lte: moment(req.query.end).toDate() },
    });

    res.status(200).send(events);
});

router.get("/get-eventsreq", async (req, res) => {
    try {
        const events = await EventReq.find();
        res.status(200).send(events);
    } catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).send({ error: "Internal server error" });
    }
});


router.put("/update-event/:eventId", async (req, res) => {
    try {
        const eventId = req.params.eventId;
        const updatedEventData = req.body;

        // Find the event by ID and update its data
        const updatedEvent = await Event.findByIdAndUpdate(eventId, updatedEventData, { new: true });

        if (!updatedEvent) {
            return res.status(404).send("Event not found");
        }

        res.status(200).send("Event updated successfully");
    } catch (error) {
        // If an error occurs during the update process, send a 500 (Internal Server Error) response
        console.error("Error updating event:", error);
        res.status(500).send("Internal Server Error");
    }
});


router.delete("/delete-event/:eventId", async (req, res) => {
    try {
        const eventId = req.params.eventId;

        const deletedEvent = await Event.findByIdAndDelete(eventId);

        if (!deletedEvent) {
            return res.status(404).send("Event not found");
        }
        res.status(200).send("Event deleted successfully");
    } catch (error) {
        // If an error occurs during the deletion process, send a 500 (Internal Server Error) response
        console.error("Error deleting event:", error);
        res.status(500).send("Internal Server Error");
    }
});



export default router;
