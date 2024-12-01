import express from "express";
const router = express.Router();

import {
  getAssignments,
  acceptAssigment,
  rejectAssigment,
} from "../controller/admin";
import { auth, isAdmin } from "../middlewares/auth";

router.get("/assignments", auth, isAdmin, getAssignments);
router.post("/assignments/:id/accept", auth, isAdmin, acceptAssigment);
router.post("/assignments/:id/reject", auth, isAdmin, rejectAssigment);

export default router;
