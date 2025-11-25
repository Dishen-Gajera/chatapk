import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";
import uploadCloudinary from "../config/cloudinary.js";
import { getScoketId, io } from "../socket/socket.js";

export const postSend = async (req, res) => {
  try {
    const { message } = req.body;
    const sender = req.userId;
    const { receiver } = req.params;
    let image = null;
    if (req.file) {
      image = await uploadCloudinary(req.file.path);
    }
    let convesation = await Conversation.findOne({
      participants: { $all: [sender, receiver] },
    });

    const msg = await Message.create({
      sender,
      receiver,
      message,
      image,
    });

    if (!convesation) {
      convesation = await Conversation.create({
        participants: [sender, receiver],
        messages: [msg._id],
      });
    } else {
      convesation.messages.push(msg._id);
      await convesation.save();
    }

    let receiverId=getScoketId(receiver);
    if(receiverId){
      io.to(receiverId).emit("newMessage",msg);
    }
    return res.status(201).json(msg);
  } catch (error) {
    return res.status(500).json({ message: "Internal server errort" + error });
  }
};

export const getChat = async (req, res) => {
  try {
    const sender = req.userId;
    const { receiver } = req.params;
    let conversation = await Conversation.findOne({
      participants: { $all: [sender, receiver] },
    }).populate("messages");
    if (!conversation) {
      return res.status(400).json({ message: "no conversation found" });
    }

    return res.status(201).json(conversation?.messages);
  } catch (error) {
    return res.status(500).json({ message: "Internal server errort" + error });
  }
};
