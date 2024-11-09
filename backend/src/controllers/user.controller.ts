import { Request, Response } from "express"
import { User } from "../types/user"
import userModel from "../models/user.model"
import { compareHash, hashed } from "../utils/hash.util"

// getUsers()
const getUsers = (req: Request, res: Response) => {
    const users = userModel.findAll()
    res.json(users)
}

// getUserById()
const getUserById = (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params
    const user = userModel.findById(id)
    res.json(user)
}

// getUserByUsername()
const getUserByUsername = async(req: Request< {}, {}, User>, res: Response) => {
    const { username, password } = req.body
    const user = userModel.findByUsername(username)

    if(!user){
        res.status(404).json({ message: "User not found" })
        return
    }

    const isMatch = await compareHash(password, user.password)
    if(!isMatch){
        res.status(401).json({ message: "Invalid password" })
        return
    }
    res.cookie("isAuthenticated", true, {
        httpOnly: true, 
        maxAge: 4 * 60 * 1000, 
        signed: true
    })
    res.cookie('userId', user.id, {
        httpOnly: true,
        maxAge: 3 * 60 * 1000,
        signed: true
    })
    res.json({ message: "Login authenticated" })
}


// addUser()
const addUser = async(req: Request, res: Response) => {
    const { username, password, firstname, lastname } = req.body
    const hashedPassword = await hashed(password)
    const user = userModel.create({username, password: hashedPassword, firstname, lastname})
    res.status(201).json(user)
}

// updateUserById()
const updateUserById =  (req: Request <{ id: string }, {}, User>, res: Response) => {
    const { id } = req.params
    const { username, firstname, lastname } = req.body
    const user = userModel.editUser(id, { username, firstname, lastname})
    if(!user){
        res.status(400).send("User not found")
    }
    res.json(user)
}

// deleteUserById()
const deleteUserById = (req: Request, res: Response) => {
    const { id } = req.params
    const isDeleted = userModel.delete(id)
    if(!isDeleted){
        res.status(404).send("user not found")
    }
    res.status(200).send("User deleted")
}

// checkAuth()
const checkAuth = (req: Request, res: Response) => {
    const { userId } = req.signedCookies
    const user = userModel.findById(userId)
    res.json(user)
}

// logoutUser()
const logoutUser = (req: Request, res: Response) => {
    res.clearCookie("isAuthenticated")
    res.clearCookie("userId")
    res.json({ message: "User logged out" })
}


export default {
    getUsers, 
    getUserById, 
    getUserByUsername, 
    addUser, 
    updateUserById,
    deleteUserById,
    checkAuth, 
    logoutUser
}