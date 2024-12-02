import express, { Request, Response } from "express";
import { database } from "./utils/database";
import cors from "cors";
require("dotenv").config();
const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 5000;
const app = express();
database();

// Importing The Routes
import userRoutes from "./routes/user";
import adminRoutes from "./routes/admin";
import authRoutes from "./routes/auth";


// Mddlewares and Cors to allow all origins
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));

// Routing the Middlewares to their respective routes
app.use("/api/v1", authRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1", adminRoutes);

// Testing the Server for Get  Request
app.get("/", (request: Request, response: Response) => {
  response.status(400).send("Welcome to Home Page");
  return;
});

// Listening to the PORT
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
