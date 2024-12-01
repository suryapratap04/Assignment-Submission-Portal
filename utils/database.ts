import mongoose from "mongoose";
require("dotenv").config();

const url: string = process.env.MONGO_URL as string;

export function database() {
  mongoose
    .connect(url, {
      // @ts-ignore
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Database Connected Successfully"))
    .catch((error) => {
      console.error("Database Connection Failed");
      console.error(error);
      process.exit(1);
    });
}
