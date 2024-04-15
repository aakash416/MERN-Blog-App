import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import userRoutes from "./Routes/userRoutes.js";
import postRoutes from "./Routes/postRoutes.js";
import { errorHandler, notFound } from "./Middleware/errorMiddleware.js";
import upload from "express-fileupload";

import { fileURLToPath } from "url";
import path from "path";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: process.env.POST_3K }));

// Initialize express-fileupload middleware
app.use(upload());

// Serve static files from the 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.use(notFound);
app.use(errorHandler);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB Server");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(process.env.PORT, () =>
  console.log(`Server running in port ${process.env.PORT}`)
);
