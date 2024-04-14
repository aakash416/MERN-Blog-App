import express from "express";
import {
  registerUser,
  loginUser,
  getUser,
  changeAvatar,
  editUser,
  getAuthors,
} from "../Controllers/userControllers.js";

import authMiddleware from "../Middleware/authMiddleware.js";

const userRoutes = express.Router();

userRoutes.post("/register", registerUser);
userRoutes.post("/login", loginUser);
userRoutes.get("/:id", getUser);
userRoutes.get("/", getAuthors);
userRoutes.post("/change-avatar", authMiddleware, changeAvatar);
userRoutes.patch("/edit-user", authMiddleware, editUser);

export default userRoutes;
