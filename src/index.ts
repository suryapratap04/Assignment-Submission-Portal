import express, { Request, Response } from "express";
import { database } from "./utils/database";
import cors from "cors";
require("dotenv").config();
const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 5000;

import userRoutes from "./routes/user";
import adminRoutes from "./routes/admin";
import authRoutes from "./routes/auth";

const app = express();
database();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));

app.use("/api/v1", authRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1", adminRoutes);
app.get("/", (request: Request, response: Response) => {
  response.status(400).send("Welcome to Home Page");
  return;
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
