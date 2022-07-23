import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import UserAuth from "../models/userModel";
import { Types } from "mongoose";

interface UserPayload {
  id: Types.ObjectId;
}

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as UserPayload;

      req.currentUser = await UserAuth.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("not authorized");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("not authorized, no token");
  }
});
