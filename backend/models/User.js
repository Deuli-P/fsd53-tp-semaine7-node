import mongoose from "mongoose";
const {Schema, model} = mongoose

const UserSchema = new mongoose.Schema({
    gender: {
        type: String,
        required: true,
        enum :[ "male", 'female'] 
    },
    category: {
        type: String,
        required: true,
        enum :[ "Client", 'Technique', 'Marketing'] 
    },
    firstname: {
        type: String,
        required: true,
        maxLenght: 255
    },
    lastname: {
        type: String,
        required: true,
        maxLenght: 255
    },
    email: {
        type: String,
        required: true,
        maxLenght: 255
    },
    password: {
        type: String,
        required: true,
        minLenght: 8,
        maxLenght: 255
    },
    birthdate: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    photo: {
        type: String
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;