import { LogError, LogWarning } from '../../utils/logger'
import User from '../entities/User.entity'
import { IAuth } from '../interface/IAuth.interface'
import { IUser } from '../interface/IUser.interface'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

// Loads .env file contents into process.env.
dotenv.config()
const secret: string = process.env.SECRETKEY || 'secret'

/**
 * ORM to connect to Auth collection
 */

// Register user
export const registerUser = async (user: IUser): Promise<any | undefined> => {
    try {
        // encrypt password
        const hash: string = await User.encryptPassword(user.password)
        const u: IUser = { ...user, password: hash }
        
        // create new  user
        const newUser: IUser = await User.create(u)
        return newUser
    } catch (error) {
        LogWarning(`[ORM ERROR] Creating user ${error}`)
        return null
    }
}

// Login user
export const loginUser = async (auth: IAuth): Promise<any | undefined> => {
    try {
        const userFound: any = await User.findOne({ email: auth.email })
        // if not user
        if (!userFound) {
            LogWarning('[ERROR Autentication in ORM] User not found')
            // throw new Error('[ERROR Autentication in ORM] User not found')
            return undefined
        }
        // Compare password with static method comparePassword()
        const validPassword = await User.comparePassword(auth.password, userFound.password)
        // if password is not valid
        if (!validPassword) {
            LogWarning('[ERROR Autentication in ORM] Invalid Email or Password')
            // throw new Error('[ERROR Autentication in ORM] Invalid Email or Password')
            return undefined
        }
        // Create token
        const token = jwt.sign({ user_id: userFound._id }, secret, {
            expiresIn: '2h'
        })

        return {
            user: userFound,
            token
        }
    } catch (error) {
        LogError(`[ORM Error] Login user ${error}`)
        // throw new Error(`[ORM Error] Login user ${error}`)
        return undefined
    }
}

// Logout user
export const logoutUser = async (): Promise<any | undefined> => {
    return undefined
}
