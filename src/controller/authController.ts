import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../model/userModel.js";
import { validateModel } from "../validator/validateInput.js";
import AppError from "./AppError.js";
import { catchAsyncFunc } from "../utils/catchAsync.js";

const signToken = (id: number) => {
  return jwt.sign({ id }, "this is the secret key put it in dotenv", {
    expiresIn: "5 days",
  });
};

const sendToken = async (
  user: { id: number; userRole: string; userName: string },
  res: Response
) => {
  try {
    const token = await signToken(user.id);
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: false,
      sameSite: "none",
      path: "/",
    });
    res.status(200).json({
      message: "User data and token send Successfully",
      userData: user,
      token,
    });
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong while sending cookie");
  }
};

export const login = catchAsyncFunc(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId, userPassword } = req.body;
    const userData:any = await User.findOne({ where: { id: userId } });
    if (!userData?.password) throw new Error("Invalid credentials!");
    const { password, userName, userRole, id } = userData;

    if (password === userPassword) {
      sendToken({ id, userName, userRole }, res);
    } else {
      res.status(401).json({
        message: "unauthorized invalid credentials !",
      });
    }
  }
);

export const signup = catchAsyncFunc(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userName, userRole, password } = req.body;
    const isValidate = validateModel(req.body);
    if (!isValidate) {
      next(
        new AppError(
          `Filled id userName userRole password must be filled and id  must be of type number `,
          401
        )
      );
      return;
    }
    const userData:User  = await User.create(req.body) ;
    if (!userData) {
      next(new AppError(`Invalid data or something went wrong `, 401));
      return;
    }
    if (userData && userData?.id) {
      const { id } = userData;
      sendToken({ id, userName, userRole }, res);
    } else {
      res
        .status(400)
        .json({ status: "error", message: "Something went wrong !" });
    }
  }
);
export const logout = (req: Request, res: Response) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: false,
  });
  res.status(200).json({
    message: "logout successfully",
  });
};
