import express from "express"
import { logger } from './tools/winston'
import formidable from 'formidable'
import path from 'path'
import fs from 'fs'
// import { routes } from "./routes/router"
// import {knex} from "./tools/knexConfig"

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//file upload route
// change to S3 later
const uploadDir = 'uploads'
fs.mkdirSync(uploadDir, { recursive: true })
app.use(express.static(path.join(__dirname, 'uploads')))
export const form = formidable({
	uploadDir,
	keepExtensions: true,
	maxFiles: 1,
	maxFileSize: 500 * 1024 * 1024, // the default limit is 500MB
	filter: (part) => part.mimetype?.startsWith('image/') || false,
	// filename: (originalName, originalExt, part, form) => {
	// 	let fieldName = part.name
	// 	return `${fieldName}`
	// }
})

// app.use("/", routes)

app.get("/testing", (req, res) => {
	res.send("hello, world")})

const PORT = 8080
app.listen(PORT, () => {
	logger.info(`Listening To Port ${PORT} `)
})
