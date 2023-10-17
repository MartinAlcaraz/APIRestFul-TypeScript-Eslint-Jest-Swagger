import mongoose, { Schema } from 'mongoose'
import { IKata } from '../interface/IKata.interface'

const kataSchema = new Schema<IKata>({
    name: {
        type: String, required: true, unique: true, trim: true, minlength: [3, 'El nombre debe tener al menos 3 caracteres.'], maxlength: [30, 'El nombre debe tener 30 caracteres o menos.']
    },
    description: {
        type: String, required: true, unique: true
    },
    level: { type: String, required: true },
    intents: { type: Number, required: true },
    stars: { type: Number, required: true },
    creatorId: { type: String, required: true }, // id of user
    solution: { type: String, required: true },
    participants: { type: [], required: true }
})

export default mongoose.model<IKata>('Kata', kataSchema)
