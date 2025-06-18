import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "./constant.js";

// ✅ Ensure JWT_SECRET is defined
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("❌ JWT_SECRET is not defined in environment variables.");
}

export const createToken = (id: string, email: string, expiresIn: string) => {
  const payload = { id, email };

  // ✅ Use the validated JWT_SECRET
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn });
  return token;
};

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.signedCookies[`${COOKIE_NAME}`];

  if (!token || token.trim() === "") {
    return res.status(401).json({ message: "Token Not Received" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.locals.jwtData = decoded;
    return next();
  } catch (err: unknown) {
    const error = err as Error;
    return res.status(401).json({ message: error.message || "Token Expired" });
  }
};
