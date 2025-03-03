import { BookInterface, LendAndSubmitBook } from "../types_interface/bookInterface";
import { bookRepository } from "../repository/bookRepository.js";

class BookService {
    constructor(private bookRepo: LendAndSubmitBook) { }
    async lendBook(bookId: number, userId: number,issuedDate:string,submitDate:string): Promise<void>{
       await this.bookRepo.lendBook(bookId, userId,issuedDate,submitDate);
    }
    async myBook(userId: number): Promise<BookInterface[]>{
       return await this.bookRepo.myBook(userId);
  }
    async submitBook(bookId: number, userId: number,submitDate:string): Promise<void>{
       await this.bookRepo.submitBook(bookId, userId,submitDate);
    }
   
   async myIssuedBook(userId: number) {
     return await this.bookRepo.myIssuedBook(userId);
   }
    
}

export const bookService = new BookService(bookRepository);