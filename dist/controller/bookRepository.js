var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import crudService from "./crudService.js";
import fs from "fs/promises";
class BookRepository {
    buyBook(bookId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const books = yield crudService.getData("books.json");
                const book = books.filter((elem) => elem.id === bookId);
                const { id, bookTitle, bookAuthorId, bookIsbn, bookCategory, publishDate, bookUsers, bookAvailable, bookPrice, bookAuthorName } = book[0];
                let otherBook = books.filter((elem) => elem.id != bookId);
                if (book.length < 1)
                    throw new Error("Books with this id doesn't exists");
                if (bookAvailable < 1)
                    throw new Error("This book is currently  unavailabel");
                if (bookUsers === null || bookUsers === void 0 ? void 0 : bookUsers.includes(userId))
                    throw new Error("You already have this book");
                const newUser = (bookUsers !== null && bookUsers !== void 0 ? bookUsers : []).concat(userId);
                otherBook.push({ id, bookTitle, bookAuthorId, bookIsbn, bookCategory, publishDate, bookUsers: newUser, bookAvailable: bookAvailable - 1, bookPrice, bookAuthorName });
                yield fs.writeFile("books.json", JSON.stringify(otherBook, null, 2));
            }
            catch (err) {
                if (err instanceof Error)
                    throw new Error(err.message || "somehting went wrong!");
                else
                    throw new Error("Somehting went wrong");
            }
        });
    }
    widDrawBook(bookId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const books = yield crudService.getData("books.json");
                const book = books.filter((elem) => elem.id === bookId);
                const { id, bookTitle, bookAuthorId, bookIsbn, bookCategory, publishDate, bookUsers, bookAvailable, bookPrice, bookAuthorName } = book[0];
                let otherBook = books.filter((elem) => elem.id != bookId);
                if (book.length < 1)
                    throw new Error("Books with this id doesn't exists");
                if (!bookUsers)
                    throw new Error("You doesn't have this book");
                if (!bookUsers.includes(userId))
                    throw new Error("You doesn't have this book");
                let newUsers;
                if (bookUsers) {
                    if (!bookUsers.some((book) => book === userId))
                        throw new Error("You doesn't have this book");
                    const users = bookUsers.filter((book) => book != userId);
                    newUsers = users.length === 0 ? null : users;
                    otherBook.push({ id, bookTitle, bookAuthorId, bookIsbn, bookCategory, publishDate, bookUsers: newUsers, bookAvailable: bookAvailable + 1, bookPrice, bookAuthorName });
                }
                yield fs.writeFile("books.json", JSON.stringify(otherBook, null, 2));
            }
            catch (err) {
                if (err instanceof Error)
                    throw new Error(err.message || "somehting went wrong!");
                else
                    throw new Error("Somehting went wrong");
            }
        });
    }
    myBook(userId, userType) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const books = yield crudService.getData("books.json");
                if (userType === "reader") {
                    const yourBook = books.filter((book) => {
                        if (book.bookUsers) {
                            return book.bookUsers.includes(userId);
                        }
                        else {
                            return false;
                        }
                    });
                    if (yourBook.length < 1)
                        throw new Error("You have no Books");
                    return yourBook;
                }
                else {
                    const authorBook = books.filter((book) => book.bookAuthorId === userId);
                    return authorBook;
                }
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
