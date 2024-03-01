// jwtUtils.ts
import jwt from "jsonwebtoken";
import User from "../Models/user.model";

export const generateToken = (details: User): string => {
  // Implement logic to generate JWT token
  const maxAge = 3 * 24 * 60 * 60; // 3 days in seconds
  const JWT_SECRET = process.env.JWT_SECRET as string;
  const token = jwt.sign({ details }, JWT_SECRET, {
    expiresIn: maxAge,
  });
  return token;
};

export const verifyToken = (token: string): any => {
  // Implement logic to verify JWT token
};
