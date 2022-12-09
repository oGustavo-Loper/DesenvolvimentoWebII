import mongoose from "mongoose";
// const { model, Schema, default: mongoose } = require('mongoose')

const UserSchema = new mongoose.Schema({
//     id: { type: String },
//     name: { type: String, required: true },
//     email: { type: String, required: true },
//     password: { type: String, required: true}
//     },
//     {
//         versionKey: false
//     }
// )

id: {
    type: Number,
},
name: {
    type: String,
    required: true
},
email: {
    type: String,
    required: true
},
password: {
    type: String,
    required: true
},
SectorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'sector',
    required: true,
},
})
const user = mongoose.model('user', UserSchema)
export default user

// const UserSchema = new Schema({
// module.exports = model('user', UserSchema)