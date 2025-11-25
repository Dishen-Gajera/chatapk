import express from "express";
import {
  getCurrent,
  getOthers,
  getSearch,
  putProfile,
} from "../controllers/user.controller.js";
import isAuth from "../middlewares/isAuth.js";
import multer from "multer";
import { upload } from "../middlewares/multer.js";
const userRouter = express.Router();

userRouter.get("/current", isAuth, getCurrent);
userRouter.put("/profile", isAuth, upload.single("image"), putProfile);
userRouter.get("/others", isAuth, getOthers);
userRouter.get("/search", isAuth, getSearch);

export default userRouter;
