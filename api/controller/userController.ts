import { Request, Response } from 'express'
import { logger } from '../configs/winston'
import { UserServices } from '../services/userServices'
import jwtSimple from 'jwt-simple'
import jwt from '../jwt'
import { checkPassword } from '../utilities/hash'

export class UserController {
	constructor(private userService: UserServices) { }

	checkUserByToken = async (req: Request, res: Response) => {

		try {
			const id = req.body.data.id
			const username = req.body.data.username

			if (!id || !username) {
				res.status(400).json({
					success: false,
				})
				return
			}

			const result = await this.userService.checkToken(id,username)

			if (result.length === 0) {
				res.status(400).json({
					success: false,
				})
				return
			}
			res.json({success:true, result: result[0]})


		} catch (e) {
			logger.error(e.message)
			res.status(400).json({ success: false })
		}
	}

	login = async (req: Request, res: Response) => {
		try {
			const username = req.body.data.user.username
			const password = req.body.data.user.password

			if (!username || !password) {
				res.status(400).json({
					success: false,
					message: 'username or password are missing'
				})
				return
			}

			const result = await this.userService.login(username)

			if (result.length === 0) {
				res.status(400).json({
					success: false,
					message: 'No such user'
				})
				return
			}
			const hashedPassword = result[0].password
			const matchResult = await checkPassword(password, hashedPassword)
			if (matchResult) {
				const payload = {
					id: result[0].id,
					username: result[0].username
				}
				const token = jwtSimple.encode(payload, jwt.jwtSecret as string)
				res.status(200).json({
					token: token,
					success: true,
					info: result[0]
				})
			} else {
				res.status(400).json({
					success: false,
					message: 'Incorrect password'
				})
			}
		} catch (e) {
			logger.error(e.message)
			res.status(500).json({ success: false })
		}
	}

	getAllDietitian = async (req: Request, res: Response) => {
		try {
			res.json(await this.userService.getAllDietitian())
		} catch (e) {
			logger.error(e.message)
			res.status(500).json({ success: false, message: e.message })
		}
	}

	getUserByHKID = async (req: Request, res: Response) => {
		try {
			let hkid = req.params.hkid
			hkid = hkid.toUpperCase()
			const user = await this.userService.getUserBYHKID(hkid)
			res.status(200).json({ success: true, user })
		} catch (e) {
			logger.error(e.message)
			res.status(500).json({ success: false, message: e.message })
		}
	}
}
