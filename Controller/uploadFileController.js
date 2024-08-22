
import { Worker } from 'worker_threads';
import path, { dirname } from 'path';
import { fileURLToPath } from "url";
import policyInfoModel from "../Models/policyInfo.js";
import userModel from '../Models/userModel.js'
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export  let userController=(req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  
  const filePath = req.file.path;
  const worker = new Worker(path.resolve(__dirname, './dataProcessor.js'), {
    workerData: { filePath },
  });

  worker.on('message', (message) => {
    res.send(message);
  });

  worker.on('error', (error) => {
    res.status(500).send(`Worker error: ${error.message}`);
  });

  worker.on('exit', (code) => {
    if (code !== 0 && !res.headersSent)
      res.status(500).send(`Worker stopped with exit code ${code}`);
  });

  };

  export const findPolicyController = async(req,res)=>{
    try {
      const {username}=req.params
      const user = await userModel.findOne({firstname:username})
      // console.log(user)
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const policies = await policyInfoModel.find({ userId: user._id })
    if (policies.length === 0) {
        return res.status(404).json({ message: 'No policies found for this user' });
    }
    res.json(policies);
      
    } catch (error) {
      console.log('Error fetching policies',error.message)
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  