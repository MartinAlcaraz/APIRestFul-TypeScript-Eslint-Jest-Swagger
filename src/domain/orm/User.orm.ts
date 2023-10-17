import User from '../entities/User.entity'
import { LogError } from '../../utils/logger'
import { IUser } from '../interface/IUser.interface'
// CRUD

/**
 * Methods to obtain all Users from collection 'User' in MongoDB
 */

export const getAllUsers = async (page: number, limit: number): Promise<any | undefined> => {
    const response: any = {}
    try {
        // Search all users
        const users = await User.find({})
            .limit(limit)
            .skip((page - 1) * limit)
        const totalDocuments = await User.countDocuments()
        
        response.page = page
        response.limit = limit
        response.totalPages = Math.ceil(totalDocuments / limit)
        response.users = users

        return response
    } catch (error) {
        LogError(`[ORM ERROR]: Getting all users: ${error}`)
        return undefined
    }
}

export const createUser = async (user: any): Promise<IUser | undefined> => {
    try {
        // Create a new user
        const newUser = await User.create(user)
        return newUser
    } catch (error) {
        LogError(`[ORM ERROR]: Creating new User: ${error}`)
        return undefined
    }
}

export const deleteUserById = async (id: string): Promise<IUser | undefined> => {
    try {
        // Delete one user by ID
        const user = await User.findByIdAndDelete(id)

        if (user !== null) {
            return user
        } else {
            return undefined
        }
    } catch (error) {
        LogError(`[ORM ERROR]: Deleting user by ID: ${error}`)
        return undefined
    }
}

export const updateUserById = async (id: string, user: any): Promise<IUser | undefined> => {
    try {
        // Update one user by ID
        const updatedUser = await User.findByIdAndUpdate(id, user,
            { new: true }) // devuelve el registro actualizado
    
        if (updatedUser) {
            return updatedUser
        } else {
            return undefined
        }
    } catch (error) {
        LogError(`[ORM ERROR]: Updating user by ID: ${error}`)
        return undefined
    }
}

export const getUserById = async (id: string): Promise<IUser | undefined> => {
    try {
        // Search one user by ID
        const user = await User.findById(id)
        return (user !== null) ? user : undefined
    } catch (error) {
        LogError(`[ORM ERROR]: Getting one user by ID: ${error}`)
        return undefined
    }
}

export const findUserByName = async (name: string): Promise<IUser | undefined> => {
    try {
        // Find one user by Name
        const user = await User.findOne({ name })
        return (user !== null) ? user : undefined
    } catch (error) {
        LogError(`[ORM ERROR]: Finding user by Name: ${error}`)
        return undefined
    }
}

export const findUserByEmail = async (email: string): Promise<IUser | undefined> => {
    try {
        // Find one user by Email
        const user = await User.findOne({ email })
        console.log('findUserByEmail: ', user)
        return (user !== null) ? user : undefined
    } catch (error) {
        LogError(`[ORM ERROR]: Finding user by Name: ${error}`)
        return undefined
    }
}
