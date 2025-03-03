import cluster from "node:cluster";
import numCPUs from "node:os";
import process from "node:process";
import dotenv from 'dotenv'
import { app } from "./index.js";
import { connectDb } from "./config/database.js";
import User from "./model/userModel.js";
import Category from "./model/categoryModel.js";
import Book from "./model/bookModel.js";
import BookAndUser from "./model/bookAndUser.js";
dotenv.config({ path: "./.env" });
console.log(process.env.DIALECT);
(async () => {
  if (cluster.isPrimary) {
    try {
      await connectDb();
      await User.sync({ alter: true });
      await Category.sync({ alter: true });
      await Book.sync({ alter: true });
      await BookAndUser.sync({ alter:true})
    } catch (err) {
      console.log(err);
    }
    for (let i = 0; i < numCPUs.availableParallelism(); i++) {
      cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
      console.log(
        `worker with process id ${process.pid} is died bysignal ${signal}`
      );
    });
  } else {
    const server = app.listen(3000, () => {
      console.log(
        `server listening on port 3000 with process id => ${process.pid}`
      );
    });
    process.on(
      "unhandledRejection",
      (error: { name?: string; message?: string }) => {
        console.log(`Unhandled rejection  🎇 shutting down system`);
        console.log(error);
        server.close(() => {
          process.exit(1);
        });
      }
    );
  }
})();
