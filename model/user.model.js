import mongoose from "mongoose";
import bcrypt from "bcrypt"
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },

    email: {
        type: String,
        requied: true,
        unique: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please fill a valid email '],
        lowercase: true,
        trim: true
    },

    password: {
        type: String,
        requird: true,
        minLength: 6
    },

    userType: {
        type: String,
        requied: true,
        default: "CUSTOMER"
    },
    userStatus: {
        type: String,
        required: true,
        default: "APPROVED"
    }
}, { timestamps: true })


// if you don't know about pre post middleware in mongoose then watch a video on youtube about it

userSchema.pre("save", async function (next) {
    //{ you think why not use arrow function insted of traditional function becouse arrow function does not have its own this keyword }
    // { A trigger to hash the password before saving it to the database, so that the password is not stored as plain text in the database }
    const hash = await bcrypt.hash(this.password, 10)
    console.log("this from hash ", hash)
    this.password = hash;
})

const userModel = mongoose.model("User ", userSchema)
export default userModel;