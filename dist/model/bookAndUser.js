import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
class BookAndUser extends Model {
}
BookAndUser.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    bookId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    issuedDate: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    submitDate: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    sequelize,
    modelName: "BookAndUser",
});
export default BookAndUser;
