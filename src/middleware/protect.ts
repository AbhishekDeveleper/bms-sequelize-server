import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import AppError from "../controller/AppError.js";
import User from "../model/userModel.js";


//to chec user loged in or not before performing action 
export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token: string;
  token = req.cookies.jwt || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return next(
      new AppError("You are not logged In ! please login to get access", 401)
    );
  }

  try {
    const decoded = jwt.verify(
      token,
      "this is the secret key put it in dotenv"
    ) as JwtPayload;

    const currentUser: any = await User.findOne({
      where: {
        id: decoded.id,
      },
    });
    console.log(currentUser);
    if (!currentUser) {
      return next(
        new AppError("The user belonging to this token does not exist. ", 401)
      );
    }
    const { id, userRole, userName } = currentUser;
    req.user = { id, userName, userRole };
    console.log(req.user, "req.usre");
    res.locals.user = currentUser;
    next();
  } catch (err: any) {
    res.status(400).json({
      status: "fail",
      message: err || "something went wrong",
    });
  }
};
