import { Post } from "../Models/postModel.js";
import { User } from "../Models/userModel.js";
import path from "path";
import fs from "fs";
import HttpError from "../Models/errorModel.js";

// CREATE A POST
// POST : api/posts
// UNPROTECTED
const createPost = async (req, res, next) => {
  try {
    const { title, category, description } = req.body;
    if (!title || !category || !description) {
      return next(new HttpError("fill all the fields", 422));
    }
  } catch (error) {
    return next(new HttpError(error));
  }
};

// GET ALL POSTS
// GET : api/posts
// UNPROTECTED
const getPosts = async (req, res, next) => {
  res.json("Get All Posts");
};

// GET SINGLE POST
// GET : api/posts/:id
// UNPROTECTED
const getPost = async (req, res, next) => {
  res.json("Get single Post");
};

// GET POST BY CATEGORY
// GET : api/posts/categories/:catrgory
// UNPROTECTED
const getCatPosts = async (req, res, next) => {
  res.json("Get Posts by category");
};

// GET AUTHOR POST
// GET : api/posts/users/:id
// UNPROTECTED
const getUserPosts = async (req, res, next) => {
  res.json("Get user Posts");
};

// edit post
// PATCH : api/posts/:id
// PROTECTED
const editPost = async (req, res, next) => {
  res.json("Edit Posts");
};

// delete post
// delete : api/posts/:id
// PROTECTED
const deletePost = async (req, res, next) => {
  res.json("delete Posts");
};

export {
  createPost,
  getPost,
  getPosts,
  getCatPosts,
  getUserPosts,
  editPost,
  deletePost,
};
