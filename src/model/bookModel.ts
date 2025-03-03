import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

import { sequelize } from "../config/database.js";

class Book extends Model<InferAttributes<Book>, InferCreationAttributes<Book>> {
  declare id: CreationOptional<number>;
  declare bookTitle: string;
  declare bookIsbn: number;
  declare publishDate: string;
  declare bookPrice: number;
  declare bookAuthorId: number;
  declare categoryId: number;
}

// Initialize the Book model
Book.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    bookTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bookIsbn: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    publishDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bookPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    bookAuthorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users", // Reference to the Authors table
        key: "id", // The 'id' field in the Authors table
      },
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Categories",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Book",
  }
);

export default Book;
