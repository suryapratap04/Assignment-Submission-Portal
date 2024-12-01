import { Request, Response } from "express";
import Assignment from "../models/Assignment";

interface typeAssign {
  _id: string;
  user: string;
  userId: string;
  task: string;
  admin: string;
  accepted: string;
}

export async function getAssignments(
  request: Request | any,
  response: Response
) {
  try {
    const userId = request.id;
    console.log("User id For Admin", userId);
    const assigments = await Assignment.find({ admin: userId });
    response.status(200).send({
      success: false,
      message: "Assignment fetched successfully",
      data: assigments,
    });
    return;
  } catch (error: any) {
    console.log(error);
    response.status(400).send({
      success: false,
      message: "Error while fetching assignments",
    });
    return;
  }
}

export async function acceptAssigment(
  request: Request | any,
  response: Response
) {
  try {
    const _id = request.params.id;
    const adminId = request.id;
    console.log("Admin ID:", adminId);
    console.log("Assignment ID:", _id);
    const assignment = await Assignment.findByIdAndUpdate(
      _id,
      { accepted: "accepted" },
      { new: true }
    );

    if (!assignment) {
      response.status(404).send({
        success: false,
        message: "Assignment does not exist",
      });
      return;
    }

    response.status(200).send({
      success: true,
      message: "Assignment accepted successfully",
      data: assignment,
    });
    return;
  } catch (error: any) {
    console.log(error);
    response.status(401).send({
      success: false,
      message: "Problem while accepting assignments",
    });
    return;
  }
}
export async function rejectAssigment(
  request: Request | any,
  response: Response
) {
  try {
    const _id = request.params.id;
    const adminId = request.id;
    const assignment = await Assignment.findByIdAndUpdate(
      _id,
      { accepted: "rejected" },
      { new: true }
    );

    if (!assignment) {
      response.status(404).send({
        success: false,
        message: "Assignment does not exist",
      });
      return;
    }

    response.status(200).send({
      success: true,
      message: "Assignment Rejected successfully",
      data: assignment,
    });
    return;
  } catch (error: any) {
    response.status(401).send({
      success: false,
      message: "Problem while rejecting assignments",
    });
  }
}
