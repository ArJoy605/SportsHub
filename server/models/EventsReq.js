import mongoose from "mongoose";

const EventSchema = mongoose.Schema({
    start: Date,
    end: Date,
    title: String,
    description: String,
    location: Number,
    reqUserId: String,
    status:{
        type: Number,
        default: 0,
    }
}, {timestamps: true});

const EventReq = mongoose.model("EventReq", EventSchema);

export default EventReq;