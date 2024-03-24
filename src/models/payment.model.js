import mongoose, {Schema} from 'mongoose'

const orderSchema = new Schema({
    customerId: {
        type: String,
        required: true
    },
    orderItems: {
        type: Object,
        required: true
    },
    discountAmount: {
        type: Number,
        default: 0
    },
    totalAmount: {
        type: Number,
        required: true,
        default: 0
    }
})

export const Order = mongoose.model('Order', orderSchema)