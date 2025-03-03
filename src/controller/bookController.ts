import { NextFunction, Request, Response } from "express";
import crudService from "../services/crudService.js";
import { validateModel } from "../validator/validateInput.js";
import AppError from "./AppError.js";
import Book from "../model/bookModel.js";
import Category from "../model/categoryModel.js";
import { bookService } from "../services/bookService.js";
import { todayDateFN } from "../utils/todayDate.js";
import { catchAsyncFunc } from "../utils/catchAsync.js";

export const getBook = catchAsyncFunc(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await crudService.getData("book");
    res.status(200).json({
      message: "Fetched Successfully.",
      data,
    });
  }
);

export const addBook = catchAsyncFunc(
  async (req: Request, res: Response, next: NextFunction) => {
    const { bookTitle, bookIsbn, bookCategory, publishDate, bookPrice } =
      req.body;
    const loggedInAuthorId = Number(req.user?.id);
    let categoryId;
    const isValidate = validateModel(req.body);
    if (!isValidate) {
      next(
        new AppError(
          `Filled id bookTitle bookAuthorId bookIsbn bookCategory publishDate bookPrice must be filled and id and price must be of type number `,
          401
        )
      );
      return;
    }

    const notUniqueBookIsbn: any = await Book.findOne({ where: { bookIsbn } });
    const book_category: any = await Category.findOne({
      where: { categoryName: bookCategory },
    });
    if (book_category?.id) {
      categoryId = book_category.id;
      console.log(categoryId, "caidinside");
    }
    if (!book_category?.id) {
      const newCategory = await Category.create({ categoryName: bookCategory });
      categoryId = newCategory?.id;
      console.log(categoryId, "caidn");
    }
    if (notUniqueBookIsbn?.id) {
      next(new AppError(`Book isbn must be a unique number `, 401));
      return;
    }

    if (isValidate) {
      await crudService.addData("book", {
        bookTitle,
        bookAuthorId: loggedInAuthorId,
        bookIsbn,
        publishDate,
        bookPrice,
        categoryId: categoryId,
      });
    }

    res.status(200).json({
      message: "Book added successfully .",
    });
  }
);

export const deleteBookById = catchAsyncFunc(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const bookId = Number(id);
    const data = await crudService.deleteWithId("book", bookId);
    if (data == 0)
      res.status(200).json({ message: "books with this id does not exist" });
    else
      res
        .status(200)
        .json({ message: `Books with id ${bookId} deleted Successffully .` });
  }
);

export const updateBookWithId = catchAsyncFunc(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);

    const bookId = Number(id);
    const userId = Number(req.user?.id);
    const updatedData = await crudService.updateWithId(
      "book",
      id,
      req.body,
      userId
    );
    console.log(updatedData);
    res
      .status(200)
      .json({ message: `Books with id ${bookId} updated Successffully .` });
  }
);

export const getMyBook = catchAsyncFunc(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req?.user?.id;
    const userType = req?.user?.userRole as string;
    const userId = Number(id);
    if (!userId) {
      next(new AppError("You buy no books", 400));
      return;
    }
    const data = await bookService.myBook(userId);
    console.log(data, "in data");
    res.status(200).json({
      message: "success",
      data,
    });
  }
);

export const lendBook = catchAsyncFunc(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = Number(req.user?.id);
    const bookId = Number(req.params?.id);
    const issuedDate = todayDateFN();
    const submitDate: string = "n";
    if (!(bookId && userId && issuedDate)) {
      next(new AppError("Invalid details for lending book", 400));
      return;
    }
    await bookService.lendBook(bookId, userId, issuedDate, submitDate);
    res.status(200).json({
      message: "Now this Book availabel for you.",
    });
  }
);

export const submitBook = catchAsyncFunc(
  async (req: Request, res: Response, next: NextFunction) => {
    const bookId = Number(req.params.id);
    const userId = Number(req.user?.id);
    const submitDate = todayDateFN();
    if (!(bookId && userId && submitDate)) {
      next(new AppError("Invalid details fro submitting book", 400));
      return;
    }
    await bookService.submitBook(bookId, userId, submitDate);

    res.status(200).json({
      message: "Book submitted successfully.",
    });
  }
);

export const myIssuedBook = catchAsyncFunc(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = Number(req.user?.id);
    const submitDate = req.body;
    if (!userId) {
      next(new AppError("Invalid details fro submitting book", 400));
      return;
    }
    const issuedBook = await bookService.myIssuedBook(userId);

    res.status(200).json({
      message: "your issued books fetched successfully",
      data:issuedBook
    });
  }
);
