import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import User from "../models/User";
import { NextFunction, Request, Response } from "express";
const JWT_SECRET = process.env.JWT_SECRET as Secret;

export async function auth(
  request: Request | any,
  response: Response,
  next: NextFunction
) {
  try {
    const token =
      request.body.token ||
      request.cookie?.token ||
      request.header("Authorization")?.replace("Bearer ", "");
    console.log("Token", token);
    try {
      const decode: any = jwt.verify(token, JWT_SECRET);
      console.log("decode = ", decode.userType);
      request.userType = decode.userType;
      request.user = decode.user;
      request.id = decode.id;
    } catch (error) {
      response.status(400).send({
        success: false,
        message: "Error while decoding token",
      });
      return;
    }
    next();
  } catch (error: any) {
    response.status(401).send({
      success: false,
      message: "Something Went wrong while valifating token",
    });
    return;
  }
}
export async function isAdmin(
  request: Request | any,
  response: Response,
  next: NextFunction
) {
  try {
    if (request.userType != "Admin") {
      response.status(400).send({
        success: false,
        message: "Protected Route for admin",
      });
      return;
    }
    next();
  } catch (error: any) {
    response.status(401).send({
      success: false,
      message: "Something Went wrong while valifating Admin",
    });
    return;
  }
}
export async function isUser(
  request: Request | any,
  response: Response,
  next: NextFunction
) {
  try {
    if (request.userType != "User") {
      response.status(400).send({
        success: false,
        message: "Protected Route for user",
      });
      return;
    }
    next();
  } catch (error: any) {
    response.status(401).send({
      success: false,
      message: "Something Went wrong while valifating User",
    });
    return;
  }
}
