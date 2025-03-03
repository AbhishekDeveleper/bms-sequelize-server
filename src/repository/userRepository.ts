import { BookInterface } from "../types_interface/bookInterface.js";
import { DeleteMyBook } from "../types_interface/userInterface.js";
import fs from 'fs/promises'
import crudService from "../services/crudService.js";
import { where } from "sequelize";
import Book from "../model/bookModel.js";


class UserRepository implements DeleteMyBook{
    async deleteMyBook(userId: number,bookId:number): Promise<void> {
        try {
            const deleteBook = await Book.destroy({ where: { bookIsbn: bookId, bookAuthorId: userId } })
            console.log(userId,bookId)
            console.log(deleteBook,'dele');
            if (deleteBook==0) throw new Error('No book exists with this id');

        }catch(err: unknown) {
            if (err instanceof Error) throw new Error(err.message || "somehting went wrong!")
            else throw new Error("Somehting went wrong in deleting you book");
        }
       
    }
}


export const userRepository = new UserRepository();