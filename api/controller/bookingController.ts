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
			res.status(500).json({
				success: false,
				message: 'Internal server error'
			})
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
			res.status(500).json({
				success: false,
				message: 'Internal server error'
			})
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

	firstTimeBooking = async (req: Request, res: Response) => {
		try {
			const { HKID, time, date, dietitian_id } = req.body
			let formattedDate = formatDate(date)
			const result = await this.bookingService.postFirstTime(
				HKID,
				time,
				formattedDate,
				dietitian_id
			)
			if (result[0].success === false) {
				res.status(200).json({ user: false })
				return
			}
			res.status(200).json({ success: true, result: result })
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
			res.json({ success: false, message: 'Internal Server Error' })
			return
		}
	}

	getFollowUpBooking = async (req: Request, res: Response) => {
		try {
			let bid = req.params.bid
			res.status(200).json({ success: true, bid: bid })
		} catch (e) {
			logger.error(e.message)
			res.status(500).json({
				success: false,
				message: 'Internal Server Error'
			})
			return
		}
	}

	postFollowUpBooking = async (req: Request, res: Response) => {
		try {
			//check if 5 params are collected
			if (Object.keys(req.body).length !== 5) {
				res.status(400).json({
					success: false,
					rebook: false,
					message: 'Invalid information provided'
				})
				return
			}
			const { timeid, dateString, currentBooking, uid, did } = req.body

			let formattedDate = formatDate(dateString)
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
			await this.bookingService.postFollowUpBooking(
				timeid,
				dateString,
				currentBooking,
				uid,
				did
			)
			res.status(200).json({ success: true })
		} catch (e) {
			logger.error(e.message)
			res.status(500).json({
				success: false,
				message: 'Internal Server Error'
			})
			return
		}
	}

	attendance = async (req: Request, res: Response) => {
		try {
			const booking = req.body
			if (Object.keys(booking).length !== 2) {
				res.status(400).json({ success: false })
				return
			}

			await this.bookingService.attendance(
				booking.attendance,
				booking.booking
			)
			res.json({ success: true })
		} catch (e) {
			logger.error(e.message)
			res.status(500).json({
				success: false,
				message: 'Internal Server Error'
			})
			return
		}
	}
	dismiss = async (req: Request, res: Response) => {
		try {
			const { bid } = req.body
			if (!bid) {
				res.status(400).json({ success: false })
				return
			}
			await this.bookingService.dismiss(bid)
			res.json({ success: true })
		} catch (e) {
			logger.error(e.message)
			res.status(500).json({
				success: false,
				message: 'Internal Server Error'
			})
			return
		}
	}
}
