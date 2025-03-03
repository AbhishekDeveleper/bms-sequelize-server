var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import AppError from "../controller/AppError.js";
const clientRole = ["author", "reader", "admin"];
const checkRole = (role) => {
    return clientRole.includes(role);
};
//function to authenticate user and allow role based access
export const authenticateUser = (role) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        if (!checkRole(role))
            return next(new AppError("This role doesn't exists", 400));
        console.log(role, (_a = req.user) === null || _a === void 0 ? void 0 : _a.userRole, "roles");
        if (((_b = req.user) === null || _b === void 0 ? void 0 : _b.userRole) === role) {
            return next();
        }
        else {
            return next(new AppError("You are not allowed to perform this action", 401));
        }
    });
};
