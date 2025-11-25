import express from "express";
import {
  getLogout,
  postLogin,
  postSignUp,
} from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/signup", postSignUp);
authRouter.post("/login", postLogin);
authRouter.get("/logout", getLogout);

export default authRouter;
