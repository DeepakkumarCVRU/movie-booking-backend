import mongoose from "mongoose";
import bcrypt from "bcrypt"
import { USER_STATUS, USER_ROLE } from "../utils/constant.js";


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


    // { you have fix issu that enum is not wroking in both userType and userStatus , you will have to fix as soon as posible }

    userType: {
        type: String,
        requied: true,
        enum: {
            values: [USER_ROLE.admin, USER_ROLE.customer, USER_ROLE.client],
            message: "Invalid userrole given "
        },

        default: USER_ROLE.customer
    },

    userStatus: {
        type: String,
        required: true,

        enum: {
            values: [USER_STATUS.aproved, USER_STATUS.pending, USER_STATUS.rejected],
            message: "Invalid userStatus given by user "
        },
        enum: Object.values(USER_ROLE),
        default: USER_STATUS.approved
    }
}, { timestamps: true })





/**
 * this is goint to be a instace method for user , to compare a password with the store encripted password
 * @param {String} plainPassword  -> input password given by user in sign in request
 * @returns {Boolean} -> boolean donating whether the password is valid/same or not
**/

userSchema.methods.isValidPassword = async function (plainPassword) {
    const currentUser = this;

    const compare = await bcrypt.compare(plainPassword, currentUser.password);

    return compare
}


// if you don't know about pre post middleware in mongoose then watch a video on youtube about it

userSchema.pre("save", async function (next) {
    //{ you think why not use arrow function insted of traditional function becouse arrow function does not have its own this keyword }
    // { A trigger to hash the password before saving it to the database, so that the password is not stored as plain text in the database }
    const hash = await bcrypt.hash(this.password, 10)



    this.password = hash;
})


const userModel = mongoose.model("User", userSchema)
export default userModel;