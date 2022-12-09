import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost/trabalhoweb2')

let db = mongoose.connection

export default db