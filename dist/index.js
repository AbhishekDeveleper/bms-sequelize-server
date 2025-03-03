import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import AppError from "./controller/AppError.js";
import globalErrorHandler from "./controller/errorController.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import router from "./router/bmsroute.js";
export const app = express();
import "./associations/bookassociation.js";
app.use(cors({
    origin: [
        "http://localhost:4200", //allowing this origin to make request on api
        "http://127.0.0.1:4200"
    ],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
    optionsSuccessStatus: 200,
}));
app.options("*", cors());
//limiting the request per hour
const limiter = rateLimit({
    max: 200,
    windowMs: 60 * 60 * 1000,
    message: "Too many request for this IP",
});
app.use(express.json({ limit: "50kb" }));
app.use("/api", limiter);
app.use(morgan('dev'));
app.use(cookieParser());
app.get("/error", (req, res, next) => {
    const error = new AppError("Custom error message for testing error middleware ", 400);
    next(error);
});
app.use((req, res, next) => {
    console.log(`The url is ${req.originalUrl} and the method  of this url is ${req.method}`);
    next();
});
app.get("/api/home", (req, res) => {
    res.send(`Welcome to home page at url ${req.originalUrl}`);
});
app.use("/api/v1", router);
//handling invalid routes
app.use("*", (req, res, next) => {
    res.send(`The route with this url ${req.originalUrl} is not defined`);
    next();
});
app.use(globalErrorHandler);
