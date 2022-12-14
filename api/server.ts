import express from 'express'
import { logger } from './configs/winston'
import { knex } from './configs/knexConfig'
import cors from 'cors'
import { UserServices } from './services/userServices'
import { UserController } from './controller/userController'
import { PostServices } from './services/postServices'
import { PostController } from './controller/postController'
import { BookingServices } from './services/bookingServices'
import { BookingController } from './controller/bookingController'
import { MedicalRecordServices } from './services/medicalRecordServices'
import { MedicalRecordController } from './controller/medicalRecordController'
import { DietRecordServices } from './services/dietRecordServices'
import { DietRecordController } from './controller/dietRecordController'
const app = express()

app.use(
	cors({
		origin: '*'
	})
)

export const userServices = new UserServices(knex)
export const userController = new UserController(userServices)
const postServices = new PostServices(knex)
export const postController = new PostController(postServices)
const bookingServices = new BookingServices(knex)
export const bookingController = new BookingController(bookingServices)
const medicalRecordServices = new MedicalRecordServices(knex)
export const medicalRecordController = new MedicalRecordController(
	medicalRecordServices
)
const dietRecordServices = new DietRecordServices(knex)
export const dietRecordController = new DietRecordController(dietRecordServices)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

import { routes } from './routes/routes'
app.use('/api', routes)

app.get('/testing', (req, res) => {
	res.send('hello, world')
})

const PORT = 8080
app.listen(PORT, () => {
	logger.info(`Listening To Port ${PORT} `)
})
