import { Request, Response } from 'express'
import { logger } from '../configs/winston'
import { BookingServices } from '../services/bookingServices'

export class BookingController {
	constructor(private bookingService: BookingServices) {}

	getTimeslot = async (req: Request, res: Response) => {
		try {
			res.json(await this.bookingService.getTimeslot())
		} catch (e) {
			logger.error(e.message)
			res.json({ success: false, message: 'Internal server error' })
		}
	}

	getAllUserBookingByID = async (req: Request, res: Response) => {
		try {
			let userID = req.params.id
			const results = await this.bookingService.getAllUserBooking(
				parseInt(userID)
			)
			res.json({ success: true, data: results })
		} catch (e) {
			logger.error(e.message)
			res.json({ success: false })
		}
	}

	postUserBooking = async (req: Request, res: Response) => {
		try {
			const bookingDetail: {
				date: string
				time: number
				dietitian_id: number
				user: number
			} = req.body
			if (Object.keys(bookingDetail).length < 4) {
				res.status(400).json({
					success: false,
					message: 'Invalid information provided'
				})
				return
			}
			// const result = await this.bookingService.postUserBooking()
			let { date, time, dietitian_id, user } = bookingDetail
			let dateType = new Date(date)
			let formatedDate =
				dateType.getFullYear().toString() +
				'-' +
				(dateType.getMonth() + 1).toString() +
				'-' +
				dateType.getDate().toString()
			console.log(formatedDate, time, dietitian_id, user)
			const bookingID = await this.bookingService.postUserBooking(
				user,
				dietitian_id,
				formatedDate,
				time
			)
			res.status(200).json({ success: true, bookingID: bookingID })
		} catch (e) {
			logger.error(e.message)
			res.status(500).json({
				success: false,
				message: 'INternal Server Error'
			})
		}
	}

	deleteUserBooking = async (req: Request, res: Response) => {
		try {
			let bookingID = req.params.bID
			let userID = req.params.id
			const result = await this.bookingService.deleteUserBooking(
				bookingID,
				userID
			)
			res.status(200).json({ success: true, deleteRes: result })
		} catch (e) {
			logger.error(e.message)
			res.status(500).json({ success: false })
		}
	}

	getAllBookingByDateAndDietitianID = async (req: Request, res: Response) => {
		try {
			let date = new Date(req.params.date)
			let dietitianID = req.params.dietitian
			let formatedDate =
				date.getFullYear().toString() +
				'-' +
				(date.getMonth() + 1).toString() +
				'-' +
				date.getDate().toString()
			let result =
				await this.bookingService.getAllBookingByDateAndDietitianID(
					formatedDate,
					dietitianID
				)
			res.json(result)
		} catch (e) {
			logger.error(e.message)
			res.json({ success: false, message: e.message })
		}
	}
}
