import HttpError from "../Models/errorModel.js";
import { User } from "../Models/userModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Register a new user
// POST : api/users/register
//UNPROTECTED

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password) {
      return next(new HttpError("Fill in all the details", 422));
    }

    const newEmail = email.toLowerCase();
    const emailExists = await User.findOne({ email: newEmail });

    if (emailExists) {
      return next(new HttpError("Email already exists", 422));
    }

    if (password.trim().length < 6) {
      return next(
        new HttpError("Password should be atleast 6 characters", 422)
      );
    }

    if (password != confirmPassword) {
      return next(new HttpError("Passwords do not match", 422));
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPass = await bcryptjs.hash(password, salt);
    const newUser = await User.create({
      name,
      email: newEmail,
      password: hashedPass,
    });

    res.status(201).json(`${newUser.email} registration successful`);
  } catch (error) {
    return next(new HttpError("User registration failed", 422));
  }
};

// Login a Registered a  user
// POST : api/users/login
//UNPROTECTED

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new HttpError("Fill in all the details", 422));
    }
    const newEmail = email.toLowerCase();
    const user = await User.findOne({ email: newEmail });
    if (!user) {
      return next(new HttpError("Invalid Credentials", 422));
    }
    const comparePass = await bcryptjs.compare(password, user.password);
    if (!comparePass) {
      return next(new HttpError("Invalid Credentials", 422));
    }

    const { _id: id, name } = user;
    const token = jwt.sign({ id, name }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).json({ token, id, name });
  } catch (error) {
    return next(new HttpError("User Login failed", 422));
  }
};

// user profile
// POST : api/users/:id
//PROTECTED

const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");
    if (!user) {
      return next(new HttpError("User not found", 404));
    }
    res.status(200).json(user);
  } catch (error) {
    return next(new HttpError(error));
  }
};

// change user profile
// POST : api/users/change-avatar
//PROTECTED

const changeAvatar = async (req, res, next) => {
  try {
    //if the request coming in has the image or not
    if (!req.files.avatar) {
      return next(new HttpError("Please choose an image", 422));
    }
    //fetch the login user who will change their profile
    //find user from DB

    const user = await User.findById(req.user.id);

    //deleting the old profile if it is already uploaded

    if (user.avatar) {
      fs.unlink(path.join(__dirname, "..", "uploads", user.avatar), (err) => {
        if (err) {
          return next(new HttpError(err));
        }
      });
    }

    const { avatar } = req.files;
    //check file size

    if (avatar.size > 50000) {
      return next(
        new HttpError("Profile too big. Should be less than 500kb", 422)
      );
    }

    let fileName;
    fileName = avatar.name;
    let splittedFilename = fileName.split(".");
    let newFilename =
      splittedFilename[0] +
      uuidv4() +
      "." +
      splittedFilename[splittedFilename.length - 1];
    avatar.mv(
      path.join(__dirname, "..", "uploads", newFilename),
      async (err) => {
        if (err) {
          return next(new HttpError(err));
        }
        const updatedAvatar = await User.findByIdAndUpdate(
          req.user.id,
          { avatar: newFilename },
          { new: true }
        );

        if (!updatedAvatar) {
          return next(new HttpError("Avatar couldn't be changed", 422));
        }
        res.status(200).json(updatedAvatar);
      }
    );
  } catch (error) {
    return next(new HttpError("unable to upload file"));
  }
};

// EDIT USER DETIALS
// POST : api/users/edit-user
//PROTECTED

const editUser = async (req, res, next) => {
  try {
    const { name, email, currentPassword, newPassword, newConfirmPassword } =
      req.body;

    if (!name || !email || !currentPassword || !newPassword) {
      return next(new HttpError("Fill in all the details", 422));
    }

    //get user from DB
    const user = await User.findById(req.user.id);
    if (!user) {
      return next(new HttpError("User not found", 403));
    }
    //making sure email doesn't already exits
    const emailExists = await User.findOne({ email });

    //user already logged in with their email so not need to change the email
    if (emailExists && emailExists._id != req.user.id) {
      return next(new HttpError("Email already exists.", 422));
    }

    //comparing current password and database password
    const validatePassword = await bcryptjs.compare(
      currentPassword,
      user.password
    );

    if (!validatePassword) {
      return next(new HttpError("Invalid current Password", 422));
    }

    //compare new passwords which user is trying to change

    if (newPassword != newConfirmPassword) {
      return next(new HttpError("New passwords do not match", 422));
    }

    //if new passwords match

    const salt = await bcryptjs.genSalt(10);
    const hash = await bcryptjs.hash(newPassword, salt);

    //update user info in database
    const newInfo = await User.findByIdAndUpdate(
      req.user.id,
      { name, email, password: hash },
      { new: true }
    );

    res.status(200).json(newInfo);
  } catch (error) {
    return next(new HttpError(error));
  }
};

// get authors
// POST : api/users/author
//UNPROTECTED

const getAuthors = async (req, res, next) => {
  try {
    const authors = await User.find().select("-password");
    res.json(authors);
  } catch (error) {
    return next(new HttpError(error));
  }
};

export { registerUser, loginUser, getUser, changeAvatar, editUser, getAuthors };
