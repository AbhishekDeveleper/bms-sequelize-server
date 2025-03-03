var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import crudService from "../services/crudService.js";
import { validateModel } from "../validator/validateInput.js";
import AppError from "./AppError.js";
import { userService } from "../services/userService.js";
import { catchAsyncFunc } from "../utils/catchAsync.js";
export const getUser = catchAsyncFunc((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield crudService.getData("users.json");
    res.status(200).json({
        message: "Users are ",
        data,
    });
}));
export const addUser = catchAsyncFunc((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, userRole, password } = req.body;
    const isValidate = validateModel(req.body);
    if (!isValidate) {
        next(new AppError(`Filled id userName userRole password must be filled and id  must be of type number `, 401));
        return;
    }
    if (isValidate) {
        yield crudService.addData("user", {
            userName,
            userRole,
            password,
        });
    }
    res.status(200).json({
        message: "User added successfully .",
        data: { userName, userRole },
    });
}));
export const deleteUserById = catchAsyncFunc((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = req.params.id;
    const usersId = Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
    const userId = Number(id);
    if (userId != usersId) {
        res.status(200).json({ message: "Toekn unauthorized." });
        return;
    }
    const data = yield crudService.deleteWithId("user", userId);
    if (data == 0)
        res.status(200).json({ message: "User with this id doesnot exist" });
    else
        res.status(200).json({ message: "User deleted successfully." });
}));
export const updateUserById = catchAsyncFunc((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = Number(req.params.id);
    const userId = Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
    yield crudService.updateWithId("user", id, req.body, userId);
    res.status(200).json({ message: "User updated Successfully." });
}));
export const deleteMyBook = catchAsyncFunc((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const bookId = Number(req.params.id);
    const userid = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const userId = Number(userid);
    yield userService.deleteMyBook(userId, bookId);
    res.status(200).json({ message: "Book deleted successfully" });
}));
