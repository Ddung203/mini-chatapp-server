import { verifyJWTToken } from "../utils/token.js";

export const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access denied, no token provided" });
  }

  try {
    const decoded = verifyJWTToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    // console.log("error :>> ", error);
    res.status(400).json({ error: "Invalid token" });
  }
};
