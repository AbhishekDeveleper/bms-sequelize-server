import { NextFunction, Request, Response } from "express";
import crudService from "../services/crudService.js";
import { validateModel } from "../validator/validateInput.js";
import AppError from "./AppError.js";
import { userService } from "../services/userService.js";
import { catchAsyncFunc } from "../utils/catchAsync.js";

export const addCategory = catchAsyncFunc(
  async (req: Request, res: Response, next: NextFunction) => {
    const { categoryName } = req.body;
    await crudService.addData("category", {
      categoryName,
    });
    res.status(200).json({
      message: "new Category added successfully .",
      data: categoryName,
    });
  }
);
