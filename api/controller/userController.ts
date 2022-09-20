import { Request, Response } from 'express'
import { logger } from '../configs/winston'
import { UserServices } from '../services/userServices'
import jwtSimple from 'jwt-simple'
import jwt from '../jwt'
import { hashPassword, checkPassword } from '../utilities/hash'
import { generateP } from "../utilities/generater"

export class UserController {
	constructor(private userService: UserServices) { }

	checkUserByToken = async (req: Request, res: Response) => {
		try {
			const id = req.body.data.id
			const username = req.body.data.username

			if (!id || !username) {
				res.status(400).json({
					success: false
				})
				return
			}

			const result = await this.userService.checkToken(id, username)

			if (result.length === 0) {
				res.status(400).json({
					success: false
				})
				return
			}
			res.json({ success: true, result: result[0] })
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

	changeUsername = async (req: Request, res: Response) => {
		try {
			const uid = req.body.id
			const username = req.body.username

			const result = await this.userService.changeUsername(uid, username)

			if (result) {
				res.status(200).json({ success: true })
				return
			}
			res.status(400).json({ success: false })
			return
		} catch (e) {
			logger.error(e.message)
			res.status(500).json({ success: false, message: e.message })
		}
	}

	changeGender = async (req: Request, res: Response) => {
		try {
			const uid = req.body.id
			const gender = req.body.gender

			const result = await this.userService.changeGender(uid, gender)

			if (result) {
				res.status(200).json({ success: true })
				return
			}
			res.status(400).json({ success: false })
			return
		} catch (e) {
			logger.error(e.message)
			res.status(500).json({ success: false, message: e.message })
		}
	}

	changePhone = async (req: Request, res: Response) => {
		try {
			const uid = req.body.id
			const phone = req.body.phone

			const result = await this.userService.changePhone(uid, phone)

			if (result) {
				res.status(200).json({ success: true })
				return
			}
			res.status(400).json({ success: false })
			return
		} catch (e) {
			logger.error(e.message)
			res.status(500).json({ success: false, message: e.message })
		}
	}

	changeAddress = async (req: Request, res: Response) => {
		try {
			const uid = req.body.id
			const address = req.body.address

			const result = await this.userService.changeAddress(uid, address)

			if (result) {
				res.status(200).json({ success: true })
				return
			}
			res.status(400).json({ success: false })
			return
		} catch (e) {
			logger.error(e.message)
			res.status(500).json({ success: false, message: e.message })
		}
	}

	changeEmail = async (req: Request, res: Response) => {
		try {
			const uid = req.body.id
			const email = req.body.email

			const result = await this.userService.changeEmail(uid, email)

			if (result) {
				res.status(200).json({ success: true })
				return
			}
			res.status(400).json({ success: false })
			return
		} catch (e) {
			logger.error(e.message)
			res.status(500).json({ success: false, message: e.message })
		}
	}

	register = async (req: Request, res: Response) => {
		try {
			const { firstName, lastName, username, email, birthday, height, weight,
				phone, address, hkid, gender, profession, chronic_condition, education } = req.body.values

			if (!firstName || !lastName || !username || !email || !birthday || !height || !weight || !phone
				|| !address || !hkid || !gender || !profession || !chronic_condition || !education) {
				res.status(400).json({ success: false })
				return
			}

			const password = generateP()
			const hashedPassword = await hashPassword(password)

			const checkUser = await this.userService.checkIfExist(username,email,phone,hkid)

			if (checkUser.length > 0) {
				res.status(400).json({success:false, message:"重複用戶"})
				return
			}


			const result = await this.userService.register(firstName,
				lastName,
				username,
				hashedPassword,
				email,
				birthday,
				height,
				weight,
				phone,
				address,
				hkid,
				gender,
				profession,
				chronic_condition,
				education)

			if (result.length === 0) {
				res.status(400).json({ success: false, message:"註冊失敗"})
				return
			}
			res.status(200).json({ success: true, username: username, password: password })

		} catch (e) {
			logger.error(e.message)
			res.status(500).json({ success: false, message: e.message })
		}
	}

}
