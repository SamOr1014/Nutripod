import express from 'express'
import { medicalRecordController } from '../server'
import { isUserLoggedIn } from "../utilities/guards"

export const medicalRecordRoutes = express.Router()

medicalRecordRoutes.get(
	'/user/:uid',
	isUserLoggedIn,
	medicalRecordController.getUserMedRecByUserID
)
