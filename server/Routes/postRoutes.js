import express from "express";
import {
  createPost,
  getPost,
  getPosts,
  getCatPosts,
  getUserPosts,
  editPost,
  deletePost,
} from "../Controllers/postControllers.js";

import authMiddleware from "../Middleware/authMiddleware.js";

const postRoutes = express.Router();

postRoutes.post("/", authMiddleware, createPost);
postRoutes.get("/", getPosts);
postRoutes.get("/:id", getPost);
postRoutes.get("/categories/:category", getCatPosts);
postRoutes.get("/users/:id", getUserPosts);
postRoutes.patch("/:id", authMiddleware, editPost);
postRoutes.delete("/:id", authMiddleware, deletePost);

export default postRoutes;
