import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.router.js";
import userRouter from "./routes/user.router.js";
import cors from "cors";
import messageRouter from "./routes/message.router.js";
import { app, server } from "./socket/socket.js";
dotenv.config();

const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: "https://chatapk-frontend.onrender.com",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/message", messageRouter);

server.listen(port, () => {
  connectDb();
  console.log("server is started", port);
});
