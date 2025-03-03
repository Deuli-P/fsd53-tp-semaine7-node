import mongoose from "mongoose";
const {Schema, model} = mongoose

const UserSchema = new mongoose.Schema({
    
}, {
    timestamps: true
})

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;