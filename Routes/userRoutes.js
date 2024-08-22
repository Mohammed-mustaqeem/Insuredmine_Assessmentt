import multer from "multer";
import path, { dirname } from "path";
import express from 'express'
import { fileURLToPath } from 'url';
import { findPolicyController, userController } from "../Controller/uploadFileController.js";

const userRouter = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });



userRouter.post('/upload', upload.single('file'),userController)
userRouter.get('/policy/:username',findPolicyController)

export default userRouter;