var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Book from "../model/bookModel.js";
import Category from "../model/categoryModel.js";
import User from "../model/userModel.js";
import BookAndUser from "../model/bookAndUser.js";
class BookRepository {
    lendBook(bookId, userId, issuedDate, submitDate) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bookAvailable = yield Book.findOne({ where: { bookIsbn: bookId } });
                if (!bookAvailable)
                    throw new Error("this book doesnot exists"); //checking this book availbale in database or not
                const isTaken = yield BookAndUser.findOne({
                    where: { bookId: bookId, userId: userId, submitDate: "n" },
                }); //checking if book is already taken by you
                if (isTaken)
                    throw new Error("This book is already issued by you");
                const updatedBook = yield BookAndUser.create({
                    bookId,
                    userId,
                    issuedDate,
                    submitDate,
                });
                if (updatedBook)
                    console.log("Book lend by user", updatedBook);
                if (!updatedBook)
                    console.log("somehintg went wrong while granting book");
            }
            catch (err) {
                if (err instanceof Error)
                    throw new Error(err.message || "somehting went wrong!");
                else
                    throw new Error("Somehting went wrong");
            }
        });
    }
    submitBook(bookId, userId, submitDate) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedBook = yield BookAndUser.update({ submitDate: submitDate }, { where: { bookId: bookId, userId: userId, submitDate: "n" } });
                if (updatedBook)
                    console.log("Book submit by user", updatedBook);
                if (!updatedBook)
                    console.log("somehintg went wrong while submiting book");
            }
            catch (err) {
                if (err instanceof Error)
                    throw new Error(err.message || "somehting went wrong!");
                else
                    throw new Error("Somehting went wrong");
            }
        });
    }
    myBook(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //getting book and also association data with other table
                const data = yield Book.findAll({
                    include: [
                        {
                            model: Category,
                            as: "Category",
                            attributes: { exclude: ["createdAt", "updatedAt"] },
                        },
                        {
                            model: User,
                            as: "User",
                            attributes: {
                                exclude: ["createdAt", "updatedAt", "password", "userRole"],
                            },
                        },
                    ],
                    attributes: { exclude: ["id", "createdAt", "updatedAt"] },
                    where: { bookAuthorId: userId },
                });
                if (!data)
                    throw new Error("You have written 0 books");
                return data;
            }
            catch (err) {
                if (err instanceof Error)
                    throw new Error(err.message || "somehting went wrong!");
                else
                    throw new Error("Somehting went wrong");
            }
        });
    }
    myIssuedBook(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const issuedBook = yield BookAndUser.findAll({
                    where: { userId: userId },
                });
                console.log(issuedBook, "isTaken");
                return issuedBook;
            }
            catch (err) {
                if (err instanceof Error)
                    throw new Error(err.message || "somehting went wrong!");
                else
                    throw new Error("Somehting went wrong");
            }
        });
    }
}
export const bookRepository = new BookRepository();
