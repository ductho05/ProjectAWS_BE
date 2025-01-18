import ResponseClient from "../response/ResponseClient.js"
import UserService from "../services/UserService.js"


class AuthController {

    // get all user
    async GetAllUser (_, res) {
        const response = await UserService.getAll()
        res.status(response.statusCode).json(new ResponseClient(response.status, response.message, response.data))
    }

    // register
    async RegisterUser (req, res) {
        const user = req.body
        const response = await UserService.insert(user)
        res.status(response.statusCode).json(new ResponseClient(response.status, response.message, response.data))
    }

    // login user
    async LoginUser (req, res) {
        const {email, password} = req.body
        const response = await UserService.login(email, password)
        res.status(response.statusCode).json(new ResponseClient(response.status, response.message, response.data))
    }
}

export default new AuthController()
