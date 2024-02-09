import mongoose, { Schema } from "mongoose"

const animalSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    age: {
        type: String,
        minLength: 1,
        maxLength: 2,
        required: true
    },
    keeper: {
        type: Schema.ObjectId,
        required: true,
        unique: true,
        ref: 'user'
    },
    description: {
        type: String,
        required: true
    }
})

export default mongoose.model('animal', animalSchema)