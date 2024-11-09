import { Request, Response, Router } from "express"
import userController from "../controllers/user.controller"
import { cookieAuthCheck } from "../middleware/auth"

const userRouter = Router()

// POST /signup = add user
userRouter.post("/signup", userController.addUser)

// POST /login = check if username exist, return cookie/s with auth, id/username (sending id/username as a cookie with cookie-parser is not usually a good practice as it exposes the data! Using session-cookie, or JWT is safer.)
userRouter.post("/login", userController.getUserByUsername)

// GET /logout = clear the cookies
userRouter.get("/logout", userController.logoutUser)

// GET /check-auth = check auth cookie/s
userRouter.get('/check-auth', cookieAuthCheck, userController.checkAuth)

// GET /users = get all users
userRouter.get("/users", userController.getUsers)

// GET /user/:id = get user by id
userRouter.get("/:id", userController.getUserById)

// PUT /user/:id = update user by id
userRouter.put("/:id", userController.updateUserById)

// DELETE /user/:id = delete user by id
userRouter.delete("/:id", userController.deleteUserById)





export default userRouter