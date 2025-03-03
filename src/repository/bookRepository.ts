import { LendAndSubmitBook } from "../types_interface/bookInterface.js";
import Book from "../model/bookModel.js";
import Category from "../model/categoryModel.js";
import User from "../model/userModel.js";
import BookAndUser from "../model/bookAndUser.js";

class BookRepository implements LendAndSubmitBook {
  async lendBook(
    bookId: number,
    userId: number,
    issuedDate: string,
    submitDate: string
  ): Promise<void> {
    try {
      const bookAvailable = await Book.findOne({ where: { bookIsbn: bookId } });
      if (!bookAvailable) throw new Error("this book doesnot exists"); //checking this book availbale in database or not
      const isTaken = await BookAndUser.findOne({
        where: { bookId: bookId, userId: userId, submitDate: "n" },
      }); //checking if book is already taken by you
      if (isTaken) throw new Error("This book is already issued by you");
      const updatedBook: any = await BookAndUser.create({
        bookId,
        userId,
        issuedDate,
        submitDate,
      });
      if (updatedBook) console.log("Book lend by user", updatedBook);
      if (!updatedBook) console.log("somehintg went wrong while granting book");
    } catch (err: unknown) {
      if (err instanceof Error)
        throw new Error(err.message || "somehting went wrong!");
      else throw new Error("Somehting went wrong");
    }
  }

  async submitBook(
    bookId: number,
    userId: number,
    submitDate: string
  ): Promise<void> {
    try {
      const updatedBook: any = await BookAndUser.update(
        { submitDate: submitDate },
        { where: { bookId: bookId, userId: userId, submitDate: "n" } }
      );
      if (updatedBook) console.log("Book submit by user", updatedBook);
      if (!updatedBook)
        console.log("somehintg went wrong while submiting book");
    } catch (err: unknown) {
      if (err instanceof Error)
        throw new Error(err.message || "somehting went wrong!");
      else throw new Error("Somehting went wrong");
    }
  }

  async myBook(userId: number) {
    try {
      //getting book and also association data with other table
      const data = await Book.findAll({
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
      if (!data) throw new Error("You have written 0 books");
      return data;
    } catch (err: unknown) {
      if (err instanceof Error)
        throw new Error(err.message || "somehting went wrong!");
      else throw new Error("Somehting went wrong");
    }
  }

  async myIssuedBook(userId: number): Promise<any> {
    try {
      const issuedBook = await BookAndUser.findAll({
        where: { userId: userId },
      });
      console.log(issuedBook, "isTaken");
      return issuedBook;
    } catch (err: unknown) {
      if (err instanceof Error)
        throw new Error(err.message || "somehting went wrong!");
      else throw new Error("Somehting went wrong");
    }
  }
}

export const bookRepository = new BookRepository();
