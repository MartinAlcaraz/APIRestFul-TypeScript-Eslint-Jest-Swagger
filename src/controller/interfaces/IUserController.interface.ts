export interface IUserController {
    // Read all users from database || Find one user by ID
    getUsers(page: number, limit: number, id?: string): Promise<any>

    // Delete User by Id
    deleteUserById (id: string): Promise<any>

    // Update User by Id
    updateUserById (id: string, name: string, age: number): Promise<any>
}
