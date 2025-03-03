// import { bookModel } from "../model/bookModel";
// import { genreModel } from "../model/categoryModel";
// import { authorModel } from "../model/userModel";
// genreModel.hasOne(bookModel, {
//   foreignKey: "generId",
//   as: "book",
// });
// bookModel.belongsTo(genreModel, {
//   foreignKey: "generId",
//   as: "category",
// });
// authorModel.hasMany(bookModel, {
//   foreignKey: "authorId",
//   as: "books",
// });
// bookModel.belongsTo(authorModel, {
//   foreignKey: "authorId",
//   as: "author",
// });
// export { bookModel, authorModel, genreModel };
import User from '../model/userModel.js';
import Book from '../model/bookModel.js';
import Category from '../model/categoryModel.js';
// Establishing the one-to-many relationship
User.hasMany(Book, { foreignKey: 'bookAuthorId' }); // Author has many Books
Book.belongsTo(User, { foreignKey: 'bookAuthorId' }); // Each Book belongs to one Author
Category.hasOne(Book, { foreignKey: 'categoryId' });
Book.belongsTo(Category, { foreignKey: 'categoryId' });
export { User, Book };
