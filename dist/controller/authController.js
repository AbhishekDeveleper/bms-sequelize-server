var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jwt from "jsonwebtoken";
import User from "../model/userModel.js";
import { validateModel } from "../validator/validateInput.js";
import AppError from "./AppError.js";
import { catchAsyncFunc } from "../utils/catchAsync.js";
const signToken = (id) => {
    return jwt.sign({ id }, "this is the secret key put it in dotenv", {
        expiresIn: "5 days",
    });
};
const sendToken = (user, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = yield signToken(user.id);
        res.cookie("jwt", token, {
            expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: false,
            sameSite: "none",
            path: "/",
        });
        res.status(200).json({
            message: "User data and token send Successfully",
            userData: user,
            token,
        });
    }
    catch (err) {
        console.log(err);
        throw new Error("Something went wrong while sending cookie");
    }
});
export const login = catchAsyncFunc((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, userPassword } = req.body;
    const userData = yield User.findOne({ where: { id: userId } });
    if (!(userData === null || userData === void 0 ? void 0 : userData.password))
        throw new Error("Invalid credentials!");
    const { password, userName, userRole, id } = userData;
    if (password === userPassword) {
        sendToken({ id, userName, userRole }, res);
    }
    else {
        res.status(401).json({
            message: "unauthorized invalid credentials !",
        });
    }
}));
export const signup = catchAsyncFunc((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, userRole, password } = req.body;
    const isValidate = validateModel(req.body);
    if (!isValidate) {
        next(new AppError(`Filled id userName userRole password must be filled and id  must be of type number `, 401));
        return;
    }
    const userData = yield User.create(req.body);
    if (!userData) {
        next(new AppError(`Invalid data or something went wrong `, 401));
        return;
    }
    if (userData && (userData === null || userData === void 0 ? void 0 : userData.id)) {
        const { id } = userData;
        sendToken({ id, userName, userRole }, res);
    }
    else {
        res
            .status(400)
            .json({ status: "error", message: "Something went wrong !" });
    }
}));
export const logout = (req, res) => {
    res.clearCookie("jwt", {
        httpOnly: true,
        secure: false,
    });
    res.status(200).json({
        message: "logout successfully",
    });
};
