import { Request, Response, NextFunction } from "express";

//making this factory function to catch eror and passing it to global error handler
export const catchAsyncFunc = (fn: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};