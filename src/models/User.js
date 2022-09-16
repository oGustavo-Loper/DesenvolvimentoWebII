const{ model, Schema } = require('mongoose')
const newProductSchema = new Schema({
    id:{
        type: Number,
        AutoIncrement: true,
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
})
module.exports = model('user', newProductSchema)