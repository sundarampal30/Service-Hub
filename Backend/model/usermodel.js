import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["user", "provider", "admin"],
        default: "user"
    },
    Phone: {
        type: Number
    },
    address: {
        full: String,   // "123 Street, Rohini"
        city: String,   // "New Delhi"
        state: String,  // "Delhi"
        pincode: String,
        country: String // "India"
    },

    avatar: {
        type: String,
        default: ""
    },
    theme: {
        type: String,
        default: "dark"
    },
    service: {
        type: String,
        default: ""
    },
    fee: {
        type: Number,
        default: 0
    },
    experience: {
        type: String,
        default: ""
    }
}, { timestamps: true })
const User = mongoose.model('User', UserSchema);
export default User;