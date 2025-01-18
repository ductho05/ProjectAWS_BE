import express from "express";
import AuthController from "../controllers/AuthController.js";
const AuthRouter = express.Router()

AuthRouter.post("/register", AuthController.RegisterUser)
AuthRouter.post("/login", AuthController.LoginUser)

export default AuthRouter
