import { Request, Response } from 'express'
import { logger } from '../configs/winston'
import { BookingServices } from '../services/bookingServices'
import { formatDate } from '../utilities/formatDate'

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
			return
		}
	}

	postUserBooking = async (req: Request, res: Response) => {
		try {
			const bookingDetail: {
				date: string
				time: number
				dietitian_id: number
				uid: number
			} = req.body
			//check if 4 params are collected
			if (Object.keys(bookingDetail).length < 4) {
				res.status(400).json({
					success: false,
					rebook: false,
					message: 'Invalid information provided'
				})
				return
			}
			let { date, time, dietitian_id, uid } = bookingDetail
			let formattedDate = formatDate(date)
			//Prevent rebooking in the same date
			const checkRebookInSameDay =
				await this.bookingService.checkIfSameDayHasBooking(
					uid,
					formattedDate
				)
			if (checkRebookInSameDay.length > 0) {
				res.status(403).json({
					success: false,
					rebook: true,
					message: 'Cannot Rebook in the same day'
				})
				return
			}
			const bookingID = await this.bookingService.postUserBooking(
				uid,
				dietitian_id,
				formattedDate,
				time
			)
			res.status(200).json({ success: true, bookingID: bookingID })
		} catch (e) {
			logger.error(e.message)
			res.status(500).json({
				success: false,
				message: 'Internal Server Error'
			})
			return
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
			return
		}
	}

	getAllBookingByDateAndDietitianID = async (req: Request, res: Response) => {
		try {
			let dietitianID = req.params.dietitian
			let formatedDate = formatDate(req.params.date)
			let result =
				await this.bookingService.getAllBookingByDateAndDietitianID(
					formatedDate,
					dietitianID
				)
			res.json(result)
		} catch (e) {
			logger.error(e.message)
			res.json({ success: false, message: e.message })
			return
		}
	}
}
