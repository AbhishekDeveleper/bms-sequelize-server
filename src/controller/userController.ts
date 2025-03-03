import { NextFunction, Request, Response } from "express";
import crudService from "../services/crudService.js";
import { validateModel } from "../validator/validateInput.js";
import AppError from "./AppError.js";
import { userService } from "../services/userService.js";
import { catchAsyncFunc } from "../utils/catchAsync.js";

export const getUser = catchAsyncFunc(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await crudService.getData("users.json");
    res.status(200).json({
      message: "Users are ",
      data,
    });
  }
);

export const addUser = catchAsyncFunc(
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
    if (isValidate) {
      await crudService.addData("user", {
        userName,
        userRole,
        password,
      });
    }
    res.status(200).json({
      message: "User added successfully .",
      data: { userName, userRole },
    });
  }
);

export const deleteUserById = catchAsyncFunc(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const usersId = Number(req.user?.id);
    const userId = Number(id);

    if (userId != usersId) {
      res.status(200).json({ message: "Toekn unauthorized." });
      return;
    }
    const data = await crudService.deleteWithId("user", userId);
    if (data == 0)
      res.status(200).json({ message: "User with this id doesnot exist" });
    else res.status(200).json({ message: "User deleted successfully." });
  }
);

export const updateUserById = catchAsyncFunc(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);
    const userId = Number(req.user?.id);
    await crudService.updateWithId("user", id, req.body, userId);
    res.status(200).json({ message: "User updated Successfully." });
  }
);

export const deleteMyBook = catchAsyncFunc(
  async (req: Request, res: Response, next: NextFunction) => {
    const bookId = Number(req.params.id);
    const userid = req.user?.id;
    const userId = Number(userid);
    await userService.deleteMyBook(userId, bookId);
    res.status(200).json({ message: "Book deleted successfully" });
  }
);
