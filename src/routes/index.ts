/**
 * Root Router
 */
import express, { type Request, Response, Router, Express } from 'express'

import { LogInfo } from '../utils/logger'
import UsersRouter from './UsersRouter'
import AuthRouter from './AuthRouter'

// Server instance
const app: Express = express()
const rootRouter: Router = express.Router()

rootRouter.get('/', (req: Request, res: Response) => {
    LogInfo('GET: http://localhost:3000/api')
    res.send('Welcome to my API Restful: Express TypeScript Nodemon Mongoose Swagger Jest')
})

// Redirections to Routers and Controllers
app.use('/', rootRouter) // http://localhost:3000/api
app.use('/users', UsersRouter) // http://localhost:3000/api/users
app.use('/auth', AuthRouter) // http://localhost:3000/api/auth

export default app
