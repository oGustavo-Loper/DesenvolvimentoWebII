const express = require('express')
require('dotenv').config()
const routes = require('./routes')
const app = express()
const port = process.env.PORT

require('./config/database')
app.use(express.json());
app.use(routes)
app.listen(port, () => {
    console.log(`App is running port ` + port);
})