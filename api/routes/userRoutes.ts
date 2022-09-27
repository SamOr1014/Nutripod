import express from 'express'
import { userController } from '../server'
import { isDietitianLoggedIn } from '../utilities/guards'

export const userRoutes = express.Router()

userRoutes.post('/login', userController.login)
userRoutes.post('/checkToken', userController.checkToken)
userRoutes.post('/register', isDietitianLoggedIn, userController.register)
userRoutes.put('/info/gender', userController.changeGender)
userRoutes.put('/info/phone', userController.changePhone)
userRoutes.put('/info/address', userController.changeAddress)
userRoutes.put('/info/email', userController.changeEmail)
userRoutes.put('/info/dietitianEmail', userController.changeDietitianEmail)

userRoutes.get('/dietitians', userController.getAllDietitian)
userRoutes.post(
	'/dietitians',
	isDietitianLoggedIn,
	userController.postDietitian
)
userRoutes.post('/verify',isDietitianLoggedIn, userController.verifyDietitian )
userRoutes.put('/dietitians/pw', userController.changeDietitianPassword)
userRoutes.put('/pw', userController.changePassword)

userRoutes.get('/hkid/:hkid', isDietitianLoggedIn, userController.getUserByHKID)
