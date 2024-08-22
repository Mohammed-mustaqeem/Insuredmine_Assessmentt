import moment from "moment";
import ScheduledModel from "../Models/scheduledMessageModel.js";
import cron from 'node-cron';


export const ScheduledMessageController = async (req, res) => {

    const { message, day, time } = req.body
    console.log(req.body)
    try {
        if (!message || !day || !time) {
            return res.status(400).json({ error: 'Message, day, and time are required.' });
        }
    const isValidDay = moment(day, 'YYYY-MM-DD', true).isValid();
    const isValidTime = moment(time, 'HH:mm:ss', true).isValid();

    if (!isValidDay || !isValidTime) {
        return res.status(400).json({ error: 'Invalid date format. Please use "YYYY-MM-DD" for day and "HH:mm:ss" for time.' });
    }
        const scheduledDate = moment(`${day} ${time}`, 'YYYY-MM-DD HH:mm:ss', true).toDate();


        const scheduledMessage = new ScheduledModel({
            message,
            time,
            scheduledDate,
            inserted: false
        });

        await scheduledMessage.save();
        return res.status(201).json({ message: 'Message scheduled successfully.' });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: error.message });
    }
};

export const startMessageInserter = () => {
    cron.schedule('* * * * *', async () => {  
        const now = new Date();

        try {
            const messagesToInsert = await ScheduledModel.find({                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
                scheduledDate: { $lte: now },
                inserted: false
            });

            for (const msg of messagesToInsert) {
                console.log(`Inserting message: "${msg.message}" scheduled for ${msg.scheduledDate}`);
                msg.inserted = true;
                await msg.save();
            }
        } catch (error) {
            console.error(`Error inserting messages: ${error.message}`);
        }
    });

    console.log('Message inserter cron job started.');
};