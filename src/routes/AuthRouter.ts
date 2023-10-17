import express, { Request, Response } from 'express'
import { AuthController } from '../controller/AuthController'
import { IUser } from '../domain/interface/IUser.interface'
import bodyParser from 'body-parser'
import { verifyToken } from '../middlewares/verifyToken.middleware'

const AuthRouter = express.Router()
// Middleware
const jsonParser = bodyParser.json()

// http://localhost/api/auth/register
AuthRouter.route('/register')
    .post(jsonParser, async (req: Request, res: Response) => {
        const { name, age, email, password } = req.body

        if (!(name && age && email && password)) {
            return res.status(400).send({
                message: 'Need name, age, email and password to register a new user.'
            })
        }
        const user: IUser = { name, age, email, password }
        const controller: AuthController = new AuthController()
        const response = await controller.registerUser(user)
        return res.status(response.status).send(response)
    }
    )

// http://localhost/api/auth/login
AuthRouter.route('/login')
    .post(jsonParser, async (req: Request, res: Response) => {
        const { email, password } = req.body

        if (!(email && password)) {
            return res.status(400).send({
                message: 'Need email and password to login a user.'
            })
        }
        const controller: AuthController = new AuthController()
        const response = await controller.loginUser({ email, password })
        return res.status(response.status).send(response)
    }
    )

// http://localhost/api/auth/logout
AuthRouter.route('/logout')
    .post(async (req: Request, res: Response) => {
        const { email, password } = req.body

        if (!(email && password)) {
            return res.status(400).send({
                message: 'Need email and password to login a user.'
            })
        }
        const controller: AuthController = new AuthController()
        const response = await controller.loginUser({ email, password })
        return res.status(response.status).send(response)
    }
    )

// http://localhost/api/auth/me
AuthRouter.route('/me')
    .post(verifyToken, async (req: Request, res: Response) => {
        // Obtain id of user data
        const id: any = req?.query?.id
        let response: any
        if (id) {
            const controller: AuthController = new AuthController()
            response = await controller.getUserData(id)
        } else {
            response = {
                status: 401,
                message: 'Need id of user in query string'
            }
        }
        return res.status(response.status).send(response)
    }
    )

export default AuthRouter
