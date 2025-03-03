import { Sequelize } from "sequelize";
import { configData } from "./configs";
// Singleton Sequelize instance
class SequelizeSingleton {
  private static instance: Sequelize;

  private constructor() {} 

  public static sequelizeInstance(): Sequelize {
    if (!SequelizeSingleton.instance) {
      SequelizeSingleton.instance = new Sequelize("bmsdb", "abhishek", "password", {
        host: "localhost",
        // dialect: (process.env.DIALECT as "postgres" | "mysql" | undefined) || "postgres",
        dialect:"postgres"
          });
      
    }
    return SequelizeSingleton.instance;
  }
}


export const connectDb = async () => {
  const sequelize = SequelizeSingleton.sequelizeInstance();
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error:unknown) {
    // if (error instanceof Error) throw new Error('connection not esatablished');
    console.error("Unable to connect to the database:", error);
  }
};


export const sequelize = SequelizeSingleton.sequelizeInstance();

