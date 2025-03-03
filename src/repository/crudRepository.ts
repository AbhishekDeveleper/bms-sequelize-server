import Book from "../model/bookModel.js";
import Category from "../model/categoryModel.js";
import User from "../model/userModel.js";
import {CRUD_INTERFACE,} from "../types_interface/crudInterface.js";


class CrudRepository implements CRUD_INTERFACE {
  //function to addData in databse of book and categroy
  async addData(
    modal:string,
    data:any
  ):Promise<Book|Category> {
    try {   
      if (modal == 'book') {
        const newBook: Book = await Book.create(data)
        return newBook
      } else if (modal == 'category') {
        const newCategory: Category = await Category.create(data)
        return newCategory;
      } else {
        throw new Error("Somehig went wrong .....")
      }
         
    } catch (err: unknown) {
      if (err instanceof Error)
        throw new Error(err.message || "Something went wrong");
      else throw new Error("Failed to add Data to database...");
    }
  }

  async deleteWithId(modal:string,id: number): Promise<number> {
    try {

      if (modal == 'user') {
        const userData = await User.destroy({ where: { id: id } });
        return userData;
      }
      if (modal == 'book') {
        const bookData = await Book.destroy({ where: { bookIsbn: id } })
        return bookData
      } else if (modal == 'category') {
        const categoryData = await Category.destroy({ where: { id: id } })
        return categoryData
      } else {
        throw new Error("Somehig went wrong .....")
      }    
      
    } catch (err) {
      if (err instanceof Error)
        throw new Error(err.message || "Something went wrong");
      else throw new Error("Failed to delete Data from database...");
    }
  }

  async getData(
    modal:string
  ): Promise<Book[]|User[]|Category[]> {
    try {
      if (modal == 'user') {
        const userData:User[] = await User.findAll({ attributes: { exclude: ["id", "createdAt", "updatedAt"] }})
        return userData;
      }
      if (modal == 'book') {
        const bookData:Book[] = await Book.findAll({
          include: [{
            model: Category,
            as: "Category",
            attributes: { exclude: ["createdAt", "updatedAt"] },
          }, {
              model: User,
              as: "User", // This alias should match the one used in your associations
              attributes: { exclude: ["createdAt", "updatedAt","password","userRole"] },
            }
          ],
          attributes: { exclude: ["id", "createdAt", "updatedAt"] },
        })
        return bookData;
      } else if (modal == 'category') {
        const categoryData:Category[] = await Category.findAll({ attributes: { exclude: ["id", "createdAt", "updatedAt"] } })
        return categoryData;
      } else {
        throw new Error("Somehig went wrong .....")
      }
         
    } catch (err: unknown) {
      if (err instanceof Error)
        throw new Error(
          err.message || "Something went wrong while fetching data"
        );
      else throw new Error("Failed to get Data from database...");
    }
  }

  async updateWithId(
    modal:string,
    id: number,
    data: any,
    userId:number
  ): Promise<void> {
    try {
      if (modal == 'user') {
        const userData:any = await User.findOne({ where: { id: userId } });
        if (userData) {
        userData.userName = data.userName || userData.userName;
        userData.password = data.password || userData.password;
        await userData.save();
        }
        console.log(userData);
      }
      if (modal == 'book') {
        const book: any = await Book.findOne({ where: { bookIsbn: id ,bookAuthorId:userId} });
        console.log(book);
        if(book==null) throw new Error('No book available with this id')
      if (book) {
        book.bookPrice = data.bookPrice || book.bookPrice;
        book.bookTitle = data.bookTitle || book.bookTitle;
        book.publishDate = data.publishDate || book.publishDate;
        await book.save();
      }
        console.log(book);
      }
      
    } catch (err: unknown) {
      if (err instanceof Error)
        throw new Error(
          err.message || "Something went wrong while updating data"
        );
      else throw new Error("Failed to update Data in database...");
    }
  }
}

const crudRepository = new CrudRepository();
export default crudRepository;
