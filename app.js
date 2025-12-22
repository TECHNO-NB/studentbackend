import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import connectDB from "./src/db/db.js";


const app = express();

// ----------------------
// 🌐 Middleware
// ----------------------
app.use(cors({
  origin: ["https://youth-earning-app.vercel.app","http://localhost:3000","https://youth-earning-app.vercel.app","https://youth-earning-app.vercel.app"], // frontend URL
  credentials: true, // allow cookies
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging (dev only)
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}




export { app };
