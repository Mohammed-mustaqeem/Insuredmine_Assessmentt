import express from 'express'
// import cron from 'node-cron'
import { ScheduledMessageController } from '../Controller/scheduleMessageCotroller.js';
const scheduleRouter = express.Router()

scheduleRouter.post('/message',ScheduledMessageController)
//  cron.schedule('* * * * *',cronScheduleController)

export default scheduleRouter;