import express from 'express'
import { userRoutes } from './userRoutes'
import { bookingRoutes } from './bookingRoutes'
import { postRoutes } from './postRoutes'
import { medicalRecordRoutes } from './medicalRecordRoutes'
import { dietRecordRoutes } from './dietRecordRoutes'
export const routes = express.Router()

routes.use('/user', userRoutes)

routes.use('/booking', bookingRoutes)

routes.use('/medical', medicalRecordRoutes)

routes.use('/diet', dietRecordRoutes)

routes.use('/post', postRoutes)
