import express from 'express'
import UserController from '../controller/UserController.js'

const router = express.Router();

router
    .get('/user', UserController.listUser)
    .get('/user/:id', UserController.listUserId)
    .post('/user', UserController.registerUser)
    .put('/user/:id', UserController.updateUser)
    .delete('/user/:id', UserController.deleteUser)

export default router