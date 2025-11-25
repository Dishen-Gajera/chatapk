import express from "express";
import http from "http";
import { Server } from "socket.io";
import { Socket } from "socket.io";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});
const onlineUsers = {};

const getScoketId = (receiver) => {
  return onlineUsers[receiver];
};
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;

  if (userId) {
    onlineUsers[userId] = socket.id;
  }
  io.emit("getOnlineUsers", Object.keys(onlineUsers));

  socket.on("disconnect", () => {
    if (userId) {
      delete onlineUsers[userId];
    }
    io.emit("getOnlineUsers", Object.keys(onlineUsers));
  });
});

export { app, server, io, getScoketId };
