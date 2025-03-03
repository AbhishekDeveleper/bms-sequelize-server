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
class UserRepository {
    deleteMyBook(userId, bookId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleteBook = yield Book.destroy({ where: { bookIsbn: bookId, bookAuthorId: userId } });
                console.log(userId, bookId);
                console.log(deleteBook, 'dele');
                if (deleteBook == 0)
                    throw new Error('No book exists with this id');
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
