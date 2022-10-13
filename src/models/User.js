import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    id: { type: String },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true}
    },
    {
        versionKey: false
    }
)
const user = mongoose.model('user', UserSchema)

export default user