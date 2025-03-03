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
import AppError from "../controller/AppError.js";
import User from "../model/userModel.js";
//to chec user loged in or not before performing action 
export const protect = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let token;
    token = req.cookies.jwt || ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1]);
    if (!token) {
        return next(new AppError("You are not logged In ! please login to get access", 401));
    }
    try {
        const decoded = jwt.verify(token, "this is the secret key put it in dotenv");
        const currentUser = yield User.findOne({
            where: {
                id: decoded.id,
            },
        });
        console.log(currentUser);
        if (!currentUser) {
            return next(new AppError("The user belonging to this token does not exist. ", 401));
        }
        const { id, userRole, userName } = currentUser;
        req.user = { id, userName, userRole };
        console.log(req.user, "req.usre");
        res.locals.user = currentUser;
        next();
    }
    catch (err) {
        res.status(400).json({
            status: "fail",
            message: err || "something went wrong",
        });
    }
});
