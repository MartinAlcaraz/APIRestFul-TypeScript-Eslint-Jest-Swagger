import mongoose, { Model, Schema } from 'mongoose'
import { IUser } from '../interface/IUser.interface'
import bcrypt from 'bcrypt'

interface IUserModel extends Model<IUser> {
    encryptPassword(password: string): Promise<string>
    comparePassword(password: string, storedPassword: string): Promise<boolean>
}

const userSchema = new Schema<IUser, IUserModel>({
    name: {
        type: String, required: true, unique: true, trim: true, minlength: [3, 'El nombre debe tener al menos 3 caracteres.'], maxlength: [30, 'El nombre debe tener 30 caracteres o menos.']
    },
    age: {
        type: Number, required: true, min: 0, max: 120
    },
    email: {
        type: String, required: true, unique: true
    },
    password: {
        type: String, required: true, select: false, minlength: [4, 'El password debe tener al menos 4 caracteres.'], maxlength: [10, 'El password debe tener 10 caracteres o menos.']
        // select: false => only is selected with query select('password')
    }
})

// Encript password
userSchema.statics.encryptPassword = async (password: string): Promise<string> => {
    const hash = bcrypt.hashSync(password, 8)
    return hash
}
// compare password
userSchema.statics.comparePassword = async (password: string, storedPassword: string): Promise<boolean> => {
    return await bcrypt.compare(password, storedPassword) // devuelve true o false
}

export default mongoose.model<IUser, IUserModel>('User', userSchema)
