import mongoose from "mongoose";

const EventSchema = mongoose.Schema({
    start: Date,
    end: Date,
    title: String,
    color: String,
    location: Number
});

const Event = mongoose.model("Event", EventSchema);

export default Event;