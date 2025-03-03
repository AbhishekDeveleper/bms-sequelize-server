var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Sequelize } from "sequelize";
// Singleton Sequelize instance
class SequelizeSingleton {
    constructor() { }
    static sequelizeInstance() {
        if (!SequelizeSingleton.instance) {
            SequelizeSingleton.instance = new Sequelize("bmsdb", "abhishek", "password", {
                host: "localhost",
                // dialect: (process.env.DIALECT as "postgres" | "mysql" | undefined) || "postgres",
                dialect: "postgres"
            });
        }
        return SequelizeSingleton.instance;
    }
}
export const connectDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const sequelize = SequelizeSingleton.sequelizeInstance();
    try {
        yield sequelize.authenticate();
        console.log("Connection has been established successfully.");
    }
    catch (error) {
        // if (error instanceof Error) throw new Error('connection not esatablished');
        console.error("Unable to connect to the database:", error);
    }
});
export const sequelize = SequelizeSingleton.sequelizeInstance();
