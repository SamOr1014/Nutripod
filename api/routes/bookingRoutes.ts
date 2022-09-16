import express from 'express'
import { bookingController } from '../server'
import { isUserLoggedIn } from "../utilities/guards"
export const bookingRoutes = express.Router()

bookingRoutes.get('/timeslot', bookingController.getTimeslot)

bookingRoutes.get('/user/:id',isUserLoggedIn, bookingController.getAllUserBookingByID)

bookingRoutes.post('/', isUserLoggedIn, bookingController.postUserBooking)

bookingRoutes.delete('/user/:id/:bID', isUserLoggedIn, bookingController.deleteUserBooking)

//get all booking of a specific date
bookingRoutes.get(
	'/date/:date/:dietitian',
	isUserLoggedIn,
	bookingController.getAllBookingByDateAndDietitianID
)
