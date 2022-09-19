import express from 'express'
import { bookingController } from '../server'
import { isUserLoggedIn } from '../utilities/guards'
export const bookingRoutes = express.Router()

bookingRoutes.get('/timeslot', bookingController.getTimeslot)

bookingRoutes.get(
	'/user/:id',
	isUserLoggedIn,
	bookingController.getAllUserBookingByID
)

bookingRoutes.post('/', isUserLoggedIn, bookingController.postUserBooking)

bookingRoutes.delete(
	'/user/:id/:bID',
	isUserLoggedIn,
	bookingController.deleteUserBooking
)

//get all booking of a specific date
bookingRoutes.get(
	'/date/:date/:dietitian',
	isUserLoggedIn,
	bookingController.getAllBookingByDateAndDietitianID
)

bookingRoutes.put('/attendance', isUserLoggedIn, bookingController.attendance)

bookingRoutes.get(
	'/followup/:bid',
	isUserLoggedIn,
	bookingController.getFollowUpBooking
)
bookingRoutes.post(
	'/followup',
	isUserLoggedIn,
	bookingController.postFollowUpBooking
)

bookingRoutes.put('/dismiss', isUserLoggedIn, bookingController.dismiss)
