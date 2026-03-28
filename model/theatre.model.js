import mongoose from "mongoose"


const theatreSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String,
    },
    description: String,
    city: {
        required: true,
        type: String
    },
    pincode: {
        required: true,
        type: Number
    },
    address: String
}, { timestamps: true })

const Theatre = mongoose.model("theatre", theatreSchema)

export default Theatre;