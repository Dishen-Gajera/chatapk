import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import gentoken from "../config/gentoken.js";

export const postSignUp = async (req, res) => {
  console.log("aayo call aayo");
  const { username, email, password } = req.body;

  try {
    const checkUserName = await User.findOne({ username });
    if (checkUserName) {
      return res.status(401).json({ message: "username already exist" });
    }
    const checkEmail = await User.findOne({ email });
    if (checkEmail) {
      return res.status(401).json({ message: "email already exist" });
    }
    if (password.length < 6) {
      return res
        .status(401)
        .json({ message: "password must be 6 character long" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    const token = await gentoken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: `internal server error ${error}` });
  }
};

export const postLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "user does not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "email or password does not match" });
    }
    const token = await gentoken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: `internal server error ${error}` });
  }
};

export const getLogout = async (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ message: "logout successfully" });
};
