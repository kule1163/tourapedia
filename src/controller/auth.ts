import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import UserAuth from "../models/userModel";
import { Types } from "mongoose";
import asyncHandler from "express-async-handler";
import cloudinary from "../utils/cloudinary";

const sendEmail = require("../utils/sendEmail");

const generateToken = (id: Types.ObjectId) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: "30d",
  });
};

export const forgetPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await UserAuth.findOne({ email });

  if (!user) {
    res.status(400).send("no user by this email");
  }

  if (user) {
    const reset_token = generateToken(user._id);

    await user?.updateOne({
      expireToken: reset_token,
    });

    const url = `http://localhost:3000/reset-password/${reset_token}`;

    sendEmail(email, url);

    res.status(200).json(reset_token);
  }
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { newPassword } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  if (req.currentUser.expireToken) {
    const user = await UserAuth.findOneAndUpdate(
      { _id: req.currentUser._id, expireToken: req.currentUser.expireToken },
      {
        password: hashedPassword,
        _id: req.currentUser._id,
        firstname: "b",
        expireToken: "",
      },
      { new: true }
    );

    res.status(200).json(user);
  } else {
    res.status(400).send("no reset token");
  }
});

export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { firstname, lastname, email, password } = req.body;

    if (!firstname || !lastname || !email || !password) {
      res.status(400);
      throw new Error("please add all field");
    }

    const userExist = await UserAuth.findOne({ email });

    if (userExist) {
      res.status(400).send("user already exist");
      /* throw new Error("user already exist"); */
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let result;

    if (req.file) {
      result = await cloudinary.uploader.upload(req.file?.path);
    }

    const user = await UserAuth.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      profilePhoto: {
        url: result
          ? result.secure_url
          : "https://res.cloudinary.com/da30n9tw5/image/upload/v1659043847/cld-sample-2.jpg",
        public_id: result ? result.public_id : "default",
      },
    });

    if (user) {
      res.status(201).json({
        _id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        profilePhoto: {
          url: result
            ? result.secure_url
            : "https://res.cloudinary.com/da30n9tw5/image/upload/v1659043847/cld-sample-2.jpg",
          public_id: result ? result.public_id : "default",
        },
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("invalid user");
    }
  }
);

export const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  const newUser = {
    password: hashedPassword,
    _id: req.currentUser._id,
  };

  const user = await UserAuth.findOne({ email: req.currentUser.email });

  if (user && (await bcrypt.compare(oldPassword, user.password))) {
    await user.updateOne(newUser, {
      new: true,
    });
    res.status(200).json("password changed");
  } else {
    res.status(400).send("your old password doesnt match");
  }
});

export const editProfile = asyncHandler(async (req, res) => {
  const auth = await UserAuth.findById(req.currentUser._id);

  let newUser;

  if (auth) {
    console.log(auth);

    if (req.file) {
      await cloudinary.uploader.destroy(auth.profilePhoto.public_id);
      const result = await cloudinary.uploader.upload(req.file?.path);

      newUser = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        profilePhoto: {
          url: result
            ? result.secure_url
            : "https://res.cloudinary.com/da30n9tw5/image/upload/v1659043847/cld-sample-2.jpg",
          public_id: result ? result.public_id : "default",
        },
        _id: req.currentUser._id,
      };
    } else {
      newUser = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        _id: req.currentUser._id,
      };
    }

    const editedUser = await UserAuth.findByIdAndUpdate(
      req.currentUser._id,
      newUser,
      { new: true }
    ).select("-password");

    res
      .status(200)
      .json({ editedUser, token: generateToken(req.currentUser._id) });
  }
});

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await UserAuth.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      _id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      profilePhoto: user.profilePhoto,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).send("invalid user");
  }
});

export const getMe = asyncHandler(async (req: Request, res: Response) => {
  if (req.currentUser) {
    res.status(200).json(req.currentUser);
  } else {
    throw new Error("there isnt current user");
  }
});
