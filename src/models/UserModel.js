import mongoose from "mongoose";

const Schema = mongoose.Schema

const UserSchema = new Schema({
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    phoneNumber: String,
    birthday: String
})

export default mongoose.model("User", UserSchema)
