import express from 'express'
import { userController } from '../server'
import { isUserLoggedIn } from '../utilities/guards'

export const userRoutes = express.Router()

userRoutes.post('/login', userController.login)
userRoutes.post('/checkToken', userController.checkUserByToken)
userRoutes.put('/info/username', userController.changeUsername)
userRoutes.put('/info/phone', userController.changePhone)
userRoutes.put('/info/address', userController.changeAddress)
userRoutes.put('/info/email', userController.changeEmail)

// userRoutes.put("/", userController.get)
// userRoutes.delete("/", userController.get)
userRoutes.get('/dietitians', userController.getAllDietitian)

userRoutes.get('/hkid/:hkid', isUserLoggedIn, userController.getUserByHKID)
