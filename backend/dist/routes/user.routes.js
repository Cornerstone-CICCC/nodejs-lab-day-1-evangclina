"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const auth_1 = require("../middleware/auth");
const userRouter = (0, express_1.Router)();
// POST /signup = add user
userRouter.post("/signup", user_controller_1.default.addUser);
// POST /login = check if username exist, return cookie/s with auth, id/username (sending id/username as a cookie with cookie-parser is not usually a good practice as it exposes the data! Using session-cookie, or JWT is safer.)
userRouter.post("/login", user_controller_1.default.getUserByUsername);
// GET /logout = clear the cookies
userRouter.get("/logout", user_controller_1.default.logoutUser);
// GET /check-auth = check auth cookie/s
userRouter.get('/check-auth', auth_1.cookieAuthCheck, user_controller_1.default.checkAuth);
// GET /users = get all users
userRouter.get("/users", user_controller_1.default.getUsers);
// GET /user/:id = get user by id
userRouter.get("/:id", user_controller_1.default.getUserById);
// PUT /user/:id = update user by id
userRouter.put("/:id", user_controller_1.default.updateUserById);
// DELETE /user/:id = delete user by id
userRouter.delete("/:id", user_controller_1.default.deleteUserById);
exports.default = userRouter;
