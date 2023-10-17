import { IUser } from 'src/domain/interface/IUser.interface'

export interface IAuthController {
    // Register user
    registerUser(user: IUser): Promise<any>
    // Login user
    loginUser(auth: any): Promise<any>
    // Logout user
    logoutUser(): Promise<any>
    // Get one user
    getUserData(id: string): Promise<IUser>
}
