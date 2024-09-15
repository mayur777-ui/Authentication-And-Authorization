import mongoose, { Schema } from "mongoose";

const  userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    role:{
        type: String,
        enum: ['admin', 'user'],
        default:"user",
    }
});

const User = mongoose.model("User",userSchema);

export default User;