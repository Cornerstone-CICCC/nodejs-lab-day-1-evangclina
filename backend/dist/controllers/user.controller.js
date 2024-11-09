"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user.model"));
const hash_util_1 = require("../utils/hash.util");
// getUsers()
const getUsers = (req, res) => {
    const users = user_model_1.default.findAll();
    res.json(users);
};
// getUserById()
const getUserById = (req, res) => {
    const { id } = req.params;
    const user = user_model_1.default.findById(id);
    res.json(user);
};
// getUserByUsername()
const getUserByUsername = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = user_model_1.default.findByUsername(username);
    if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
    }
    const isMatch = yield (0, hash_util_1.compareHash)(password, user.password);
    if (!isMatch) {
        res.status(401).json({ message: "Invalid password" });
        return;
    }
    res.cookie("isAuthenticated", true, {
        httpOnly: true,
        maxAge: 4 * 60 * 1000,
        signed: true
    });
    res.cookie('userId', user.id, {
        httpOnly: true,
        maxAge: 3 * 60 * 1000,
        signed: true
    });
    res.json({ message: "Login authenticated" });
});
// addUser()
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, firstname, lastname } = req.body;
    const hashedPassword = yield (0, hash_util_1.hashed)(password);
    const user = user_model_1.default.create({ username, password: hashedPassword, firstname, lastname });
    res.status(201).json(user);
});
// updateUserById()
const updateUserById = (req, res) => {
    const { id } = req.params;
    const { username, firstname, lastname } = req.body;
    const user = user_model_1.default.editUser(id, { username, firstname, lastname });
    if (!user) {
        res.status(400).send("User not found");
    }
    res.json(user);
};
// deleteUserById()
const deleteUserById = (req, res) => {
    const { id } = req.params;
    const isDeleted = user_model_1.default.delete(id);
    if (!isDeleted) {
        res.status(404).send("user not found");
    }
    res.status(200).send("User deleted");
};
// checkAuth()
const checkAuth = (req, res) => {
    const { userId } = req.signedCookies;
    const user = user_model_1.default.findById(userId);
    res.json(user);
};
// logoutUser()
const logoutUser = (req, res) => {
    res.clearCookie("isAuthenticated");
    res.clearCookie("userId");
    res.json({ message: "User logged out" });
};
exports.default = {
    getUsers,
    getUserById,
    getUserByUsername,
    addUser,
    updateUserById,
    deleteUserById,
    checkAuth,
    logoutUser
};
