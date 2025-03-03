import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

class Category extends Model {
  declare id: number;
  declare name: string;
}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    categoryName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
   
  },
  {
    sequelize,
    modelName: "Category",
  }
);

export default Category;