import express from 'express'
import db from './config/database.js'
import routes from './routes/index.js'

db.on('erro', console.log.bind(console, 'Err Conection'))
db.once('open', () => {
    console.log("Run Project")
})

const app = express()
app.use(express.json())
routes(app)

export default app