import { Request, Response } from "express";
import Assignment from "../models/Assignment";
import User from "../models/User";


// Controller for the user to upload the assignments
export async function upload(request: Request | any, response: Response) {
  try {
    const user = request.id;
    const { userId, task, admin } = request.body;
    const assign = await Assignment.findOne({
      user: user,
      task: task,
      admin: admin,
    });
    // console.log(user, userId, task, admin);
    // console.log("Assifn", assign);
    if (assign) {
      response.status(400).send({
        success: false,
        message: "Assignment already created Wait for review",
        data: assign,
      });
      return;
    }
    const newAssign = await Assignment.create({
      user,
      userId,
      task,
      admin,
    });
    response.status(200).send({
      success: true,
      message: "Assignment Uploaded Successfully ",
      data: newAssign,
    });
    return;
  } catch (error: any) {
    console.log(error);
    response.status(401).send({
      success: false,
      message: "something went wrong while uploading assignment",
    });
    return;
  }
}


// Controller for the user to get all the Admins
export async function getAdmin(request: Request, response: Response) {
  try {
    const admins = await User.find({ userType: "Admin" });
    response.status(200).send({
      success: true,
      message: "fetched all admins successfully",
      data: admins,
    });
    return;
  } catch (error: any) {
    console.log(error);
    response.status(401).send({
      success: false,
      message: "something went wrong while uploading assignment",
    });
    return;
  }
}
