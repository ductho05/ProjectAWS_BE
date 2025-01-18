import { Token_Expried, Token_Key } from "../../storage.js";
import UserModel from "../models/UserModel.js";
import { ERROR_SERVER, INSERT_DATA_SUCCESS, INVALID_DATA, LOGIN_SUCCESS, NOT_FOUND_USER, PASSWORD_IS_NOT_MATCH, USER_EXIST } from "../response/Message.js";
import Response from "../response/Response.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

class UserService {
    
    // register user service
    async insert (user) {

        // initial response object
        const response = new Response(false, 500, ERROR_SERVER, null)
        try {

            // check parameter data
            if (!user) {
                response.statusCode = 400
                response.message = INVALID_DATA
                return response
            }

            // check user exist
            const checkUser = await UserModel.findOne({email: user.email})
            if (checkUser) {
                response.statusCode = 400
                response.message = USER_EXIST
                return response
            }

            // create new user
            const userCreated = new UserModel(user)

            // hash password
            const hashPassword = await bcrypt.hash(userCreated.password, 10)

            userCreated.password = hashPassword

            // save user
            await userCreated.save()
            response.status = true
            response.statusCode = 200
            response.message = INSERT_DATA_SUCCESS
            response.data = userCreated
        } catch (error) {
            console.error(error.message)
        } finally {
            return response
        }
    }

    // login user service
    async login (email, password) {

        // initial response object
        const response = new Response(false, 500, ERROR_SERVER, null)
        try {
            
            // check email & password is not blank
            if (!email && !password) {
                response.statusCode = 400
                response.message = INVALID_DATA
                return response
            }

            // check exist user
            const checkUser = await UserModel.findOne({email})
            if (!checkUser) {
                response.statusCode = 404
                response.message = NOT_FOUND_USER
                return response
            }

            // check password matched
            if (!await bcrypt.compare(password, checkUser.password)) {
                response.statusCode = 400
                response.message = PASSWORD_IS_NOT_MATCH
                return response
            }

            //  create a json web token
            const token = jwt.sign({email}, Token_Key, {expiresIn: Token_Expried})
            response.status = true
            response.statusCode = 200
            response.message = LOGIN_SUCCESS
            response.data = {user: checkUser, token}

        } catch (error) {
            console.log(error.message)
        } finally {
            return response
        }
    }
}

export default new  UserService()
