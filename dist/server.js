var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import cluster from "node:cluster";
import numCPUs from "node:os";
import process from "node:process";
import dotenv from 'dotenv';
import { app } from "./index.js";
import { connectDb } from "./config/database.js";
import User from "./model/userModel.js";
import Category from "./model/categoryModel.js";
import Book from "./model/bookModel.js";
import BookAndUser from "./model/bookAndUser.js";
dotenv.config({ path: "./.env" });
console.log(process.env.DIALECT);
(() => __awaiter(void 0, void 0, void 0, function* () {
    if (cluster.isPrimary) {
        try {
            yield connectDb();
            yield User.sync({ alter: true });
            yield Category.sync({ alter: true });
            yield Book.sync({ alter: true });
            yield BookAndUser.sync({ alter: true });
        }
        catch (err) {
            console.log(err);
        }
        for (let i = 0; i < numCPUs.availableParallelism(); i++) {
            cluster.fork();
        }
        cluster.on("exit", (worker, code, signal) => {
            console.log(`worker with process id ${process.pid} is died bysignal ${signal}`);
        });
    }
    else {
        const server = app.listen(3000, () => {
            console.log(`server listening on port 3000 with process id => ${process.pid}`);
        });
        process.on("unhandledRejection", (error) => {
            console.log(`Unhandled rejection  🎇 shutting down system`);
            console.log(error);
            server.close(() => {
                process.exit(1);
            });
        });
    }
}))();
