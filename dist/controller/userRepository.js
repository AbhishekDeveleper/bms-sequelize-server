var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fs from 'fs/promises';
import crudService from "./crudService.js";
class UserRepository {
    deleteMyBook(userId, bookId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bookData = yield crudService.getData("books.json");
                const deleteBook = bookData.filter((book) => book.id === bookId);
                const otherBook = bookData.filter((book) => book.id != bookId);
                console.log(userId);
                if (!deleteBook.some((book) => book.bookAuthorId === userId))
                    throw new Error("Sorry this book doesn't belong to you .");
                yield fs.writeFile("books.json", JSON.stringify(otherBook, null, 2));
            }
            catch (err) {
                if (err instanceof Error)
                    throw new Error(err.message || "somehting went wrong!");
                else
                    throw new Error("Somehting went wrong in deleting you book");
            }
        });
    }
}
export const userRepository = new UserRepository();
