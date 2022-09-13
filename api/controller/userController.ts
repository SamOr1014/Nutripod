import { Request, Response } from 'express'
import { logger } from '../configs/winston'
import { UserServices } from '../services/userServices'
import jwtSimple from 'jwt-simple'
import jwt from '../jwt'

export class UserController {
	constructor(private userService: UserServices) {}

	login = async (req: Request, res: Response) => {
		try {
			console.log('received in server userController')
			let username = req.body.data.user.username
			let password = req.body.data.user.password
			const result = await this.userService.login(username, password)

			if (result.length === 0) {
				res.json({ success: false, message: 'No such user' })
				return
			}
			const payload = {
				id: result[0].id,
				username: result[0].username
			}
			const token = jwtSimple.encode(payload, jwt.jwtSecret as string)
			res.status(200).json({
				token: token,
				success: true,
				result: result
			})
		} catch (e) {
			logger.error(e.message)
			res.json({ success: false })
		}
	}

	getAllDietitian = async (req: Request, res: Response) => {
		try {
			res.json(await this.userService.getAllDietitian())
		} catch (e) {
			logger.error(e.message)
			res.status(500).json({ success: false })
		}
	}
}
