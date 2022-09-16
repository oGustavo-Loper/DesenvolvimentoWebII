const express = require('express')
const ProductController = require('./controller/ProductController')
const UserController = require('./controller/UserController')
const login = require("./middleware/login")
const routes = express('routes');

routes.get('/', login, ProductController.index)
routes.post('/', ProductController.create)
routes.get('/search/:id', ProductController.searchById)
routes.delete('/delete/:id', ProductController.delete)
routes.put('/update/:id', ProductController.Update)

routes.get('/users', UserController.index);
routes.post('/login', UserController.Login);
routes.post('/users', UserController.Create);


module.exports = routes