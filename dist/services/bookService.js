var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { bookRepository } from "../repository/bookRepository.js";
class BookService {
    constructor(bookRepo) {
        this.bookRepo = bookRepo;
    }
    lendBook(bookId, userId, issuedDate, submitDate) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.bookRepo.lendBook(bookId, userId, issuedDate, submitDate);
        });
    }
    myBook(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.bookRepo.myBook(userId);
        });
    }
    submitBook(bookId, userId, submitDate) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.bookRepo.submitBook(bookId, userId, submitDate);
        });
    }
    myIssuedBook(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.bookRepo.myIssuedBook(userId);
        });
    }
}
export const bookService = new BookService(bookRepository);
