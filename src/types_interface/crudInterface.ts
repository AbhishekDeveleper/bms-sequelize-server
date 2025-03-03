import Book from "../model/bookModel.js";
import Category from "../model/categoryModel.js";
import User from "../model/userModel.js";
import { BookInstance} from "./bookInterface.js";

export interface UpdateBody{
  bookTitle?: string;
  bookIsbn?: string;
  bookCategory?: string;
  publishDate?: string;
  bookPrice?: number;
  userName?: string;
}

export  type bookCreational = Omit<BookInstance,"id">

export interface CRUD_INTERFACE{
    addData(modal:string,data:any): Promise<Book|Category> ;
    deleteWithId(modal:string,id: number): Promise<number> ;
    getData(modal:string): Promise<Book[]|User[]|Category[]> ;
    updateWithId(modal:string,id: number,data:any,userId:number): Promise<void> ;
  }