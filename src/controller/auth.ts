import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET as string;

interface typeUser {
  _id?: string;
  userName: string;
  email: string;
  password: string;
  userType: string;
}

export async function register(request: Request, response: Response) {
  try {
    const { userName, email, userType, password }: typeUser = request.body;
    // console.log(userName, lastName, email, userType, password);
    if (!userName || !email || !userType || !password) {
      response.status(400).send({
        success: false,
        message: "all fields are required",
      });
      return;
    }
    const user = await User.findOne({ email: email });
    if (user) {
      response.status(400).send({
        success: false,
        message: "User already exists",
      });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      userName: userName,
      email: email,
      password: hashedPassword,
      userType: userType,
    });
    response.status(200).send({
      success: true,
      message: "User Created Successfully",
      data: newUser,
    });
  } catch (error: any) {
    console.log(error);
    response.status(500).send({
      success: false,
      message: "User cannot be registered. Please try again.",
    });
    return;
  }
}

export async function login(request: Request, response: Response) {
  try {
    const { email, password }: typeUser = request.body;
    const user: typeUser | null = await User.findOne({ email });
    if (!user) {
      response.status(400).send({
        success: false,
        message: "user does not exist",
      });
      return;
    } else {
      if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign(
          { user: user, userType: user.userType, id: user._id },
          JWT_SECRET,
          {
            expiresIn: "24h",
          }
        );
        const options = {
          expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          httpOnly: true,
        };
        response.cookie("token", token, options).status(200).send({
          success: true,
          token,
          user,
          message: `User Login SuccessFully`,
        });
      } else {
        response.status(401).send({
          success: false,
          message: `Password is incorrect`,
        });
      }
    }
  } catch (error: any) {
    response.status(500).send({
      success: false,
      message: "User Cannot Login,Try again",
    });
  }
}
