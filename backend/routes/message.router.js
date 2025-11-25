import express from "express";
import { upload } from "../middlewares/multer.js";
import isAuth from "../middlewares/isAuth.js";
import { getChat, postSend } from "../controllers/message.controller.js";
const messageRouter = express.Router();

messageRouter.post("/send/:receiver", isAuth, upload.single("image"), postSend);
messageRouter.get("/chat/:receiver",isAuth,getChat);

export default messageRouter;
