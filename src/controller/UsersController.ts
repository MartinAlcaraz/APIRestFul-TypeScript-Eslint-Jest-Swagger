import { Get, Tags, Route, Query, Delete, Put } from 'tsoa'
import { IUserController } from './interfaces/IUserController.interface'
import { LogSuccess, LogWarning } from '../utils/logger'
// ORM - users collection
import { getAllUsers, getUserById, deleteUserById, updateUserById } from '../domain/orm/User.orm'

@Route('api/users')
@Tags('UserController')

export class UserController implements IUserController {
    /**
     * Endpoint to retrieve the users in collection 'users' in DB
     * @param {string} id Id of User to retrieve(optional)
     * @returns All Users or one user found by Id
     */
    @Get('/')
    public async getUsers (@Query() page: number, @Query() limit: number, @Query() id?: string | undefined): Promise<any> {
        let response: any = {}
        if (id) {
            const user = await getUserById(id)
            if (user !== null) {
                response = {
                    status: 200,
                    message: 'Requested user',
                    data: user
                }
                LogSuccess('[/api/users] Get one user by ID request')
            } else {
                response = {
                    status: 400,
                    message: 'The user do not exist'
                }
                LogWarning('[/api/users] The user do not exist')
            }
        } else {
            const result = await getAllUsers(page, limit)
            response = {
                status: 200,
                message: 'All users of DB',
                data: {
                    page: result.page,
                    limit: result.limit,
                    totalPages: result.totalPages,
                    users: result.users
                }
            }
            LogSuccess('[/api/users] Get all users request')
        }
        return response
    }

    /**
    * Endpoint to delete one user in the collection 'users' in DB
    * @param {string} id Id of User to delete
    * @returns Message that return the result
    */
    @Delete('/')
    public async deleteUserById (@Query() id: string): Promise<any> {
        let response: any
        if (id) {
            const user = await deleteUserById(id)
            if (user !== null) {
                response = {
                    status: 200,
                    message: `User with Id ${id} was deleted`
                }
                LogSuccess('[/api/users] Delete one User by Id')
            } else {
                response = {
                    status: 400,
                    message: `The user with Id ${id} does not exist`
                }
                LogWarning(`[/api/users] The user with Id ${id} could not be deleted`)
            }
        } else {
            LogWarning('[/api/users] Need an ID to delete a User')
            response = {
                status: 400,
                message: 'Please provide an Id to delete a User'
            }
        }
        return response
    }

    /**
    * Endpoint to update one user in the collection 'users' in DB
    * @param {any} user User to be updated
    * @param {string} id Id of User to update
    * @returns Message that return the result
    */
    @Put('/')
    public async updateUserById (id: string, name: string, age: number): Promise<any> {
        const existUser = await getUserById(id)
        let response: any
        if (existUser) {
            const updatedUser: any = await updateUserById(id, { name, age })
            if (updatedUser !== undefined) {
                response = {
                    status: 200,
                    message: 'User updated'
                }
                LogSuccess('[/api/users] Updated user request')
            } else {
                response = {
                    status: 400,
                    message: 'The user could not be updated'
                }
                LogWarning('[/api/users] The user could not be updated')
            }
        } else {
            response = {
                status: 400,
                message: `The user with Id "${id}" do not exist`
            }
            LogWarning(`[/api/users] The user with Id "${id}" do not exist`)
        }
        return response
    }
}
