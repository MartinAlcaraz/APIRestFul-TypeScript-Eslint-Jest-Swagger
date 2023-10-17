import { Tags, Route, Body, Post, Get, Query } from 'tsoa'
import { IAuthController } from './interfaces/IAuthController.interface'
import { LogSuccess, LogWarning } from '../utils/logger'
import { IUser } from 'src/domain/interface/IUser.interface'
// ORM - Auht collection
import { registerUser, loginUser, logoutUser } from '../domain/orm/Auth.orm'
import { findUserByEmail, getUserById } from '../domain/orm/User.orm'

import { IAuth } from 'src/domain/interface/IAuth.interface'
import { AuthResponse, ErrorResponse } from './types'

@Route('api/auth')
@Tags('AuthController')

export class AuthController implements IAuthController {
    /**
    * Endpoint to logout session
    * @returns Message that return the result
    */
    @Post('/logout')
    public async logoutUser (): Promise<any> {
        let response: any
        const logout = await logoutUser()
        if (logout || !logout) {
            response = {
                status: 200,
                message: 'Logout successful'
            }
        }
        return response
    }

    /**
    * Endpoint to login a user
    * @param {IAuth} auth Credentials to login a user
    * @returns Message that return the result
    */
    @Post('/login')
    public async loginUser (auth: IAuth): Promise<AuthResponse | ErrorResponse> {
        let response: AuthResponse | ErrorResponse
        if (!auth) {
            response = {
                status: 400,
                message: 'Need credentials to login (email & password)',
                error: '[AUTH ERROR] Need credentials to login (email & password)'
            }
            LogWarning('[/login] Need credentials to login (email & password)')
        }

        const data = await loginUser(auth)
        if (data) {
            response = {
                status: 200,
                message: 'Loggin successful, welcome ' + data.user.name,
                token: data.token
            }
        } else {
            response = {
                status: 401,
                message: 'Failed to loggin, wrong email or password',
                error: '[AUTH ERROR] Failed to loggin, wrong email or password'
            }
        }
        return response
    }

    /**
    * Endpoint to create one user in the collection 'users' in DB
    * @param {IUser} user User to be created
    * @returns Message that return the result
    */
    @Post('/register')
    public async registerUser (@Body() user: IUser): Promise<any> {
        const existUser = await findUserByEmail(user.email)
        let response: any
        if (existUser) {
            response = {
                status: 400,
                message: `The user with the email ${user.email} already exist`
            }
            LogWarning(`[/api/auth/register] The user with name "${user.email}" already exist`)
            return response
        }

        // si no existe el email se crea el usuario
        const newUser: IUser = await registerUser(user)
        if (newUser !== null) {
            response = {
                status: 201,
                message: 'User created'
            }
            LogSuccess('[/api/auth/register] Created new user')
        } else {
            response = {
                status: 500,
                message: 'The user could not be created'
            }
            LogWarning('[/api/auth/register] The user could not be created')
        }
        return response
    }

    /**
     * Endpoint to retrieve the data user in collection 'users' in DB
     * Middleware varifyToken
     * The headers must contain the property 'x-access-token' with valid JWT
     * @param {string} id Id of User to retrieve
     * @returns The user found by Id or null
     */
    @Get('/me')
    public async getUserData (@Query() id: string): Promise<any> {
        let response: any
        const user = await getUserById(id)
        if (user !== null) {
            response = {
                status: 200,
                message: 'Requested user',
                data: user
            }
            LogSuccess('[/api/auth/me] Get one user by ID request')
        } else {
            response = {
                status: 404,
                message: 'The user with id provided does not exist',
                data: null
            }
            LogSuccess('[/api/auth/me] The user with id provided does not exist')
        }
        return response
    }
}
