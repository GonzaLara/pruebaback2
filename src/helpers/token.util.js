import jwt from "jsonwebtoken";

const createToken = (data) => {
  try {
    const token = jwt.sign(
      data,
      process.env.SECRET,
      { expiresIn: 7 * 24 * 60 * 60 }
    );
    return token;
  } catch (error) {
    error.statusCode = 401;
    throw error;
  }
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.SECRET);
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return { expired: true };
    }
    return null;
  }
};

export { createToken, verifyToken };
