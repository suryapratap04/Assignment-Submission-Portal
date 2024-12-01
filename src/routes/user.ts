import express from "express";
const router = express.Router();

import { upload, getAdmin } from "../controller/user";
import { auth, isUser } from "../middlewares/auth";

router.post("/upload", auth, isUser, upload);
router.get("/admins", getAdmin);

export default router;
