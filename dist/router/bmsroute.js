import express from "express";
const router = express.Router();
import { addBook, lendBook, deleteBookById, getBook, getMyBook, updateBookWithId, submitBook, myIssuedBook } from "../controller/bookController.js";
import { deleteMyBook, deleteUserById, getUser, updateUserById } from "../controller/userController.js";
import { login, logout, signup } from "../controller/authController.js";
import { authenticateUser } from "../middleware/authenticate.js";
import { protect } from "../middleware/protect.js";
import { addCategory } from "../controller/categoryController.js";
router.post("/login", login);
router.get("/logout", logout);
router.post("/users", signup);
router.use(protect);
router.get("/books", getBook);
router.delete("/users/:id", deleteUserById);
router.get("/bookstatus", myIssuedBook);
router.get("/mybooks", getMyBook);
router.get("/widdrawbook/:id", submitBook);
router.get("/buybook/:id", lendBook);
router.patch("/users/:id", updateUserById);
router.post("/books", authenticateUser("author"), addBook);
router.delete("/mybook/:id", authenticateUser("author"), deleteMyBook);
router.post("/category", authenticateUser("author"), addCategory);
router.patch("/books/:id", authenticateUser("author"), updateBookWithId);
router.use(authenticateUser("admin"));
router.get("/users", getUser);
router.delete("/books/:id", deleteBookById);
export default router;
