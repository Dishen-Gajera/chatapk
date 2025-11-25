import jwt from "jsonwebtoken";

const gentoken = async (id) => {
  try {
    const token = jwt.sign({ id }, process.env.SCRETE_KEY, {
      expiresIn: "7d",
    });
    return token;
  } catch (error) {}
};

export default gentoken;
