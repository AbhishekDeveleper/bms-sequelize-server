var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import crudService from "../services/crudService.js";
import { validateModel } from "../validator/validateInput.js";
import AppError from "./AppError.js";
import Book from "../model/bookModel.js";
import Category from "../model/categoryModel.js";
import { bookService } from "../services/bookService.js";
import { todayDateFN } from "../utils/todayDate.js";
import { catchAsyncFunc } from "../utils/catchAsync.js";
export const getBook = catchAsyncFunc((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield crudService.getData("book");
    res.status(200).json({
        message: "Fetched Successfully.",
        data,
    });
}));
export const addBook = catchAsyncFunc((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { bookTitle, bookIsbn, bookCategory, publishDate, bookPrice } = req.body;
    const loggedInAuthorId = Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
    let categoryId;
    const isValidate = validateModel(req.body);
    if (!isValidate) {
        next(new AppError(`Filled id bookTitle bookAuthorId bookIsbn bookCategory publishDate bookPrice must be filled and id and price must be of type number `, 401));
        return;
    }
    const notUniqueBookIsbn = yield Book.findOne({ where: { bookIsbn } });
    const book_category = yield Category.findOne({
        where: { categoryName: bookCategory },
    });
    if (book_category === null || book_category === void 0 ? void 0 : book_category.id) {
        categoryId = book_category.id;
        console.log(categoryId, "caidinside");
    }
    if (!(book_category === null || book_category === void 0 ? void 0 : book_category.id)) {
        const newCategory = yield Category.create({ categoryName: bookCategory });
        categoryId = newCategory === null || newCategory === void 0 ? void 0 : newCategory.id;
        console.log(categoryId, "caidn");
    }
    if (notUniqueBookIsbn === null || notUniqueBookIsbn === void 0 ? void 0 : notUniqueBookIsbn.id) {
        next(new AppError(`Book isbn must be a unique number `, 401));
        return;
    }
    if (isValidate) {
        yield crudService.addData("book", {
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
}));
export const deleteBookById = catchAsyncFunc((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const bookId = Number(id);
    const data = yield crudService.deleteWithId("book", bookId);
    if (data == 0)
        res.status(200).json({ message: "books with this id does not exist" });
    else
        res
            .status(200)
            .json({ message: `Books with id ${bookId} deleted Successffully .` });
}));
export const updateBookWithId = catchAsyncFunc((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = Number(req.params.id);
    const bookId = Number(id);
    const userId = Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
    const updatedData = yield crudService.updateWithId("book", id, req.body, userId);
    console.log(updatedData);
    res
        .status(200)
        .json({ message: `Books with id ${bookId} updated Successffully .` });
}));
export const getMyBook = catchAsyncFunc((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const id = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id;
    const userType = (_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b.userRole;
    const userId = Number(id);
    if (!userId) {
        next(new AppError("You buy no books", 400));
        return;
    }
    const data = yield bookService.myBook(userId);
    console.log(data, "in data");
    res.status(200).json({
        message: "success",
        data,
    });
}));
export const lendBook = catchAsyncFunc((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const userId = Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
    const bookId = Number((_b = req.params) === null || _b === void 0 ? void 0 : _b.id);
    const issuedDate = todayDateFN();
    const submitDate = "n";
    if (!(bookId && userId && issuedDate)) {
        next(new AppError("Invalid details for lending book", 400));
        return;
    }
    yield bookService.lendBook(bookId, userId, issuedDate, submitDate);
    res.status(200).json({
        message: "Now this Book availabel for you.",
    });
}));
export const submitBook = catchAsyncFunc((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const bookId = Number(req.params.id);
    const userId = Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
    const submitDate = todayDateFN();
    if (!(bookId && userId && submitDate)) {
        next(new AppError("Invalid details fro submitting book", 400));
        return;
    }
    yield bookService.submitBook(bookId, userId, submitDate);
    res.status(200).json({
        message: "Book submitted successfully.",
    });
}));
export const myIssuedBook = catchAsyncFunc((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
    const submitDate = req.body;
    if (!userId) {
        next(new AppError("Invalid details fro submitting book", 400));
        return;
    }
    const issuedBook = yield bookService.myIssuedBook(userId);
    res.status(200).json({
        message: "your issued books fetched successfully",
        data: issuedBook
    });
}));
