import mongoose, {Schema} from 'mongoose'

const itemSchema = new Schema({
    items: {
        type: Object,
        required: true
    }
})

export const Item = mongoose.model('Item', itemSchema)