import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "abc123";

const generateJWTToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
};

// Function to verify JWT token
const verifyJWTToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error("Invalid token");
  }
};

// Function to verify JWT token
const verifyJWTTokenTime = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET).exp > Math.floor(Date.now() / 1000);
  } catch (error) {
    return false;
  }
};

export { generateJWTToken, verifyJWTToken, verifyJWTTokenTime };
