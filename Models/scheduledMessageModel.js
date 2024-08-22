
import mongoose from 'mongoose';

const scheduledMessageSchema = new mongoose.Schema({
    message: { type: String },
    time: { type: String}, 
    scheduledDate: { type: Date} ,
    inserted: { type: Boolean, default: false }
});

const ScheduledModel = mongoose.model('ScheduledMessage', scheduledMessageSchema);

export default ScheduledModel;