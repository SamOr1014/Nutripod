import express from 'express'
import { bookingController } from '../server'

export const bookingRoutes = express.Router()

bookingRoutes.get('/user/:id', bookingController.getAllUserBookingByID)

bookingRoutes.delete('/user/:id/:bID', bookingController.deleteUserBooking)
