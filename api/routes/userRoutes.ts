import express from 'express'
import { userController } from '../server'

export const userRoutes = express.Router()

userRoutes.post('/login', userController.login)
userRoutes.post('/checkToken', userController.checkUserByToken)
userRoutes.put('/info', userController.changeInformation)
// userRoutes.put("/", userController.get)
// userRoutes.delete("/", userController.get)
userRoutes.get('/dietitians', userController.getAllDietitian)
