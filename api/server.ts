import express from 'express'
import { logger } from './configs/winston'
import formidable from 'formidable'
import path from 'path'
import fs from 'fs'
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

app.use(cors())

const userServices = new UserServices(knex)
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

// file upload route
// change to S3 later
const uploadDir = 'uploads'
fs.mkdirSync(uploadDir, { recursive: true })
app.use(express.static(path.join(__dirname, 'uploads')))
export const form = formidable({
	uploadDir,
	keepExtensions: true,
	maxFiles: 1,
	maxFileSize: 500 * 1024 * 1024, // the default limit is 500MB
	filter: (part) => part.mimetype?.startsWith('image/') || false
	// filename: (originalName, originalExt, part, form) => {
	// 	let fieldName = part.name
	// 	return `${fieldName}`
	// }
})

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
