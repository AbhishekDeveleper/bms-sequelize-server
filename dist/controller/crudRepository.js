var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fs from "fs/promises";
import { checkIdExist } from "../utils/checker.js";
class CrudRepository {
    addData(modal, modelPath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.getData(modelPath);
                const idExist = yield checkIdExist(data, modal.id);
                if (idExist)
                    throw new Error("This id already exist");
                data.push(modal);
                yield fs.writeFile(modelPath, JSON.stringify(data, null, 2), 'utf8');
            }
            catch (err) {
                if (err instanceof Error)
                    throw new Error(err.message || "Something went wrong");
                else
                    throw new Error("Failed to add Data to database...");
            }
        });
    }
    deleteWithId(id, modelPath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.getData(modelPath);
                const deletedData = data.filter((elem) => elem.id == id);
                const filteredData = data.filter((elem) => elem.id !== id);
                if (deletedData.length > 0)
                    yield fs.writeFile(modelPath, JSON.stringify(filteredData, null, 2));
                return deletedData.length;
            }
            catch (err) {
                if (err instanceof Error)
                    throw new Error(err.message || "Something went wrong");
                else
                    throw new Error("Failed to delete Data from database...");
            }
        });
    }
    getData(modelPath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield fs.readFile(modelPath, "utf8");
                const jsonData = yield JSON.parse(data);
                if (!jsonData) {
                    throw new Error('Error in getting data');
                }
                return jsonData;
            }
            catch (err) {
                if (err instanceof Error)
                    throw new Error(err.message || "Something went wrong while fetching data");
                else
                    throw new Error("Failed to get Data from database...");
            }
        });
    }
    updateWithId(id, modelPath, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.getData(modelPath);
                const index = data.findIndex((b) => b.id === id);
                if (index === -1)
                    throw new Error("invalid id !");
                let filteredData = data.filter((b) => b.id == id);
                let remainData = data.filter((b) => b.id != id);
                const { bookTitle: title, 
                // bookIsbn: isbn,
                bookCategory: gener, publishDate: date, bookPrice: price, userName: authName, } = updateData;
                if (filteredData.length > 0) {
                    if (modelPath === "users.json") {
                        const { id, userName, userRole, password } = filteredData[0];
                        remainData.push({
                            id,
                            userName: authName || userName,
                            userRole,
                            password,
                        });
                        yield fs.writeFile(modelPath, JSON.stringify(remainData, null, 2));
                        return;
                    }
                    else if (modelPath === "books.json") {
                        const { id, bookTitle, bookAuthorId, bookIsbn, bookCategory, publishDate, bookPrice, bookUsers, bookAvailable, bookAuthorName } = filteredData[0];
                        remainData.push({
                            id,
                            bookTitle: title || bookTitle,
                            bookAuthorId,
                            bookIsbn,
                            bookCategory: gener || bookCategory,
                            publishDate: date || publishDate,
                            bookPrice: price || bookPrice,
                            bookUsers,
                            bookAvailable,
                            bookAuthorName
                        });
                        yield fs.writeFile(modelPath, JSON.stringify(remainData, null, 2));
                        return;
                    }
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
