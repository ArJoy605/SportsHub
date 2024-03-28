import mongoose from "mongoose";

const EventSchema = mongoose.Schema({
    start: Date,
    end: Date,
    title: String,
    color:{
        type: String,
        default: "#1fc467",
    }
});

const Event = mongoose.model("Event", EventSchema);

export default Event;