import { Request, Response } from 'express'
import { logger } from '../configs/winston'
import { BookingServices } from '../services/bookingServices'

export class BookingController {
	constructor(private bookingService: BookingServices) {}

	getAllUserBookingByID = async (req: Request, res: Response) => {
		try {
			let userID = req.params.id
			const results = await this.bookingService.getAllUserBooking(
				parseInt(userID)
			)
			if (results.length === 0) {
				res.json({ success: false, message: 'You Have No Booking' })
				return
			}
			res.json({ success: true, data: results })
		} catch (e) {
			logger.error(e.message)
			res.json({ success: false })
		}
	}

	postUserBooking = async (req: Request, res: Response) => {
		// try {
		// 	const bookingDetail = req.body
		// 	const result = await this.bookingService.postUserBooking()
		// 	if (result.length === 0) {
		// 		res.json({ success: false, message: 'Error in booking' })
		// 		return
		// 	}
		// 	res.json({ success: true })
		// } catch (e) {
		// 	logger.error(e.message)
		// 	res.json({ success: false })
		// }
	}

	deleteUserBooking = async (req: Request, res: Response) => {
		try {
			let bookingID = req.params.bID
			let userID = req.params.id
			const result = await this.bookingService.deleteUserBooking(
				bookingID,
				userID
			)
			res.json({ success: true, deleteRes: result })
		} catch (e) {
			logger.error(e.message)
			res.json({ success: false })
		}
	}
}
