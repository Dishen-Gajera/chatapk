import jwt from "jsonwebtoken";
const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({ message: "token is not get" });
    }
    const varifytoken = jwt.verify(token, process.env.SCRETE_KEY);
    req.userId = varifytoken.id;
    next();
  } catch (error) {
    console.error("JWT verification failed:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default isAuth;
