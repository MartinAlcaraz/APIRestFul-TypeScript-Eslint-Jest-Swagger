import express, { Request, Response } from 'express'
import { UserController } from '../controller/UsersController'
import { LogInfo } from '../utils/logger'

const UsersRouter = express.Router()

// http://localhost:3000/api/users?id=84059820458701983498
UsersRouter.route('/')
    // GET
    .get(async (req: Request, res: Response) => {
        const id: any = req?.query?.id
        const page: any = req?.query?.page || 1
        const limit: any = req?.query?.limit || 10
        LogInfo('Query Id ' + id)
        const controller: UserController = new UserController()
        const response = await controller.getUsers(page, limit, id)
        return res.status(response.status).send(response)
    })

    // DELETE
    .delete(async (req: Request, res: Response) => {
        const id: any = req?.query?.id
        LogInfo('Query Id ' + id)
        const controller: UserController = new UserController()
        const response = await controller.deleteUserById(id)
        return res.status(response.status).send(response)
    })
    // PUT
    .put(async (req: Request, res: Response) => {
        // const name: string = req.body.name
        // const age: number = req.body.age
        // const email: string = req.body.email
        const name: string = 'Peter'
        const age: number = 22
        const email: string = 'peter@gmail.com'
        // console.log(req.body)
        const id: any = req.query.id || undefined
        LogInfo(`User = Name: ${name}, Age: ${age}, E-mail: ${email}`)
        const controller: UserController = new UserController()
        const response = await controller.updateUserById(id, name, age)
        return res.status(response.status).send(response)
    })

export default UsersRouter
