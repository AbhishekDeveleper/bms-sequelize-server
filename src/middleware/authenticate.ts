import { Request, Response, NextFunction } from "express";
import AppError from "../controller/AppError.js";

const clientRole = ["author", "reader", "admin"];
const checkRole = (role:string) => {
    return clientRole.includes(role);
}

//function to authenticate user and allow role based access
export const authenticateUser = (role: string) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      if (!checkRole(role)) return next(new AppError("This role doesn't exists", 400));
      console.log(role,req.user?.userRole,"roles")
      if (req.user?.userRole === role) {
        return next();  
      } else {
        return next(new AppError("You are not allowed to perform this action", 401));
      }
    };
};
  