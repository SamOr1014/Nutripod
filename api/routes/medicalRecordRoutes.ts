import express from 'express'
import { medicalRecordController } from '../server'

export const medicalRecordRoutes = express.Router()

medicalRecordRoutes.get(
	'/user/:uid',
	medicalRecordController.getUserMedRecByUserID
)
