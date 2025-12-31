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
  origin: ["https://scholarship.worldhinduvision.org/","http://localhost:3000","https://scholarship.worldhinduvision.org","https://studentschoolership.vercel.app/","https://studentschoolership.vercel.app","http://localhost:3001"], // frontend URL
  credentials: true, // allow cookies
}));

app.use(cookieParser());
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));

// Logging (dev only)
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}




export { app };
