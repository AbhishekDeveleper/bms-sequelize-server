var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { bookRepository } from "./bookRepository.js";
class BookService {
    constructor(bookRepo) {
        this.bookRepo = bookRepo;
    }
    buyBook(bookId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.bookRepo.buyBook(bookId, userId);
        });
    }
    myBook(userId, userType) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.bookRepo.myBook(userId, userType);
        });
    }
    widDrawBook(bookId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.bookRepo.widDrawBook(bookId, userId);
        });
    }
}
export const bookService = new BookService(bookRepository);
