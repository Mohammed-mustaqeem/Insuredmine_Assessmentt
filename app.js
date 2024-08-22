import express from 'express'
const app = express();
import dotenv from 'dotenv';
import path, { dirname } from "path";
import bodyParser from "body-parser";
import connectDB from './db/connectDB.js';
import userRouter from './Routes/userRoutes.js';
import { fileURLToPath } from 'url';
import { monitorCPUUsage } from './Controller/cpuUsageController.js';
import scheduleRouter from './Routes/scheduleRoute.js';
import { startMessageInserter } from './Controller/scheduleMessageCotroller.js';

dotenv.config()
const DBSTRING = process.env.DBSTRING
const DBNAME = process.env.DBNAME
const port = process.env.PORT
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

connectDB(DBSTRING,DBNAME)

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve( __dirname,'public')));
app.use(express.json())

// Route
app.use('/',userRouter)
app.use('/schedule',scheduleRouter)

startMessageInserter()

  // Start monitoring CPU usage
  monitorCPUUsage();

app.listen(port ,()=>{
    console.log(`server started at port number ${port}`)
})