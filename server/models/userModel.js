import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        required: true,
        unique: true,
        type: String,
    },
    fullName: {
        required: true,
        type: String
    },
    password: {
        required: false,
        type: String // TODO: not only Google auth sign in
    },
    profilePicture: {
        type: String,
        default: ""
    },
    authSource: {
        type: String,
        enum: ["self", "google"],
        default: "self"
    }
});

const User = mongoose.model("User", userSchema);
export default User;