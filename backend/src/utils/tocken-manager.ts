import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "./constant.js";

export const createToken = (id: string, email: string, expiresIn: string) => {
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    throw new Error("❌ JWT_SECRET is not defined in environment variables.");
  }

  const payload = { id, email };
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.signedCookies[COOKIE_NAME];

  if (!token || token.trim() === "") {
    return res.status(401).json({ message: "Token Not Received" });
  }

  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    return res.status(500).json({ message: "JWT secret not configured." });
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
