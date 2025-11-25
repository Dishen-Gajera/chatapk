import uploadCloudinary from "../config/cloudinary.js";
import { upload } from "../middlewares/multer.js";
import User from "../models/user.model.js";
import { server } from "../socket/socket.js";

export const getCurrent = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: `internal server error ${error}` });
  }
};

export const putProfile = async (req, res) => {
  try {
    let { name } = req.body;
    let image;
    if (req.file) {
      image = await uploadCloudinary(req.file.path);
    }

    let user = await User.findByIdAndUpdate(
      req.userId,
      {
        name,
        image,
      },
      { new: true }
    );
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: `internal server error ${error}` });
  }
};

export const getOthers = async (req, res, next) => {
  try {
    let others = await User.find({ _id: { $ne: req.userId } }).select(
      "-password"
    );
    return res.status(200).json(others);
  } catch (error) {
    return res.status(500).json({ message: `internal server error ${error}` });
  }
};

export const getSearch = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Query is not found" });
    }

    let search = await User.find({
      _id: { $ne: req.userId },
      $or: [
        { username: { $regex: query, $options: "i" } },
        { name: { $regex: query, $options: "i" } },
      ],
    }).select("-password");

    return res.status(200).json(search);
  } catch (error) {
    return res.status(500).json({ message: `internal server error ${error}` });
  }
};
