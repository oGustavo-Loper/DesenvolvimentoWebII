import express from 'express'
import UserController from '../controller/UserController.js'

const router = express.Router()

router.post('/login', UserController.validateUser)

export default router