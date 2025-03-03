import { Request } from "express";

//making req.user available to all request 
declare global {
    namespace Express {
      interface Request {
        user?: {id:number,userRole:string,userName:string}; 
      }
    }
  }