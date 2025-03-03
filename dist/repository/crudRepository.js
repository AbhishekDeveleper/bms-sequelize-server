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
import Category from "../model/categoryModel.js";
import User from "../model/userModel.js";
class CrudRepository {
    //function to addData in databse of book and categroy
    addData(modal, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (modal == 'book') {
                    const newBook = yield Book.create(data);
                    return newBook;
                }
                else if (modal == 'category') {
                    const newCategory = yield Category.create(data);
                    return newCategory;
                }
                else {
                    throw new Error("Somehig went wrong .....");
                }
            }
            catch (err) {
                if (err instanceof Error)
                    throw new Error(err.message || "Something went wrong");
                else
                    throw new Error("Failed to add Data to database...");
            }
        });
    }
    deleteWithId(modal, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (modal == 'user') {
                    const userData = yield User.destroy({ where: { id: id } });
                    return userData;
                }
                if (modal == 'book') {
                    const bookData = yield Book.destroy({ where: { bookIsbn: id } });
                    return bookData;
                }
                else if (modal == 'category') {
                    const categoryData = yield Category.destroy({ where: { id: id } });
                    return categoryData;
                }
                else {
                    throw new Error("Somehig went wrong .....");
                }
            }
            catch (err) {
                if (err instanceof Error)
                    throw new Error(err.message || "Something went wrong");
                else
                    throw new Error("Failed to delete Data from database...");
            }
        });
    }
    getData(modal) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (modal == 'user') {
                    const userData = yield User.findAll({ attributes: { exclude: ["id", "createdAt", "updatedAt"] } });
                    return userData;
                }
                if (modal == 'book') {
                    const bookData = yield Book.findAll({
                        include: [{
                                model: Category,
                                as: "Category",
                                attributes: { exclude: ["createdAt", "updatedAt"] },
                            }, {
                                model: User,
                                as: "User", // This alias should match the one used in your associations
                                attributes: { exclude: ["createdAt", "updatedAt", "password", "userRole"] },
                            }
                        ],
                        attributes: { exclude: ["id", "createdAt", "updatedAt"] },
                    });
                    return bookData;
                }
                else if (modal == 'category') {
                    const categoryData = yield Category.findAll({ attributes: { exclude: ["id", "createdAt", "updatedAt"] } });
                    return categoryData;
                }
                else {
                    throw new Error("Somehig went wrong .....");
                }
            }
            catch (err) {
                if (err instanceof Error)
                    throw new Error(err.message || "Something went wrong while fetching data");
                else
                    throw new Error("Failed to get Data from database...");
            }
        });
    }
    updateWithId(modal, id, data, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (modal == 'user') {
                    const userData = yield User.findOne({ where: { id: userId } });
                    if (userData) {
                        userData.userName = data.userName || userData.userName;
                        userData.password = data.password || userData.password;
                        yield userData.save();
                    }
                    console.log(userData);
                }
                if (modal == 'book') {
                    const book = yield Book.findOne({ where: { bookIsbn: id, bookAuthorId: userId } });
                    console.log(book);
                    if (book == null)
                        throw new Error('No book available with this id');
                    if (book) {
                        book.bookPrice = data.bookPrice || book.bookPrice;
                        book.bookTitle = data.bookTitle || book.bookTitle;
                        book.publishDate = data.publishDate || book.publishDate;
                        yield book.save();
                    }
                    console.log(book);
                }
            }
            catch (err) {
                if (err instanceof Error)
                    throw new Error(err.message || "Something went wrong while updating data");
                else
                    throw new Error("Failed to update Data in database...");
            }
        });
    }
}
const crudRepository = new CrudRepository();
export default crudRepository;
