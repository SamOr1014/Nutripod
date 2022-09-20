import { Request, Response } from 'express'
import { logger } from '../configs/winston'
import { MedicalRecordServices } from '../services/medicalRecordServices'

export class MedicalRecordController {
	constructor(private medicalRecordService: MedicalRecordServices) {}

	getUserMedRecByUserID = async (req: Request, res: Response) => {
		try {
			let uid = req.params.uid
			if (!uid) {
				res.status(400).json({
					success: false,
					message: 'No ID provided'
				})
				return
			}
			const medRec =
				await this.medicalRecordService.getUserMedRecByUserID(uid)
			res.status(200).json({ success: true, result: medRec })
		} catch (e) {
			logger.error(e.message)
			res.status(500).json({ success: false })
			return
		}
	}

	postUserMedRecRefCurrentBooking = async (req: Request, res: Response) => {
		try {
			let medRec = req.body
			if (Object.keys(req.body).length !== 7) {
				res.status(400).json({
					success: false,
					message: 'Invalid Information'
				})
				return
			}
			console.log(medRec)
			await this.medicalRecordService.postUserMedRecRefCurrentBooking(
				medRec.bid,
				medRec.content,
				medRec.height,
				medRec.weight,
				medRec.sys,
				medRec.dia,
				medRec.bg
			)
			res.status(200).json({ success: true })
		} catch (e) {
			logger.error(e.message)
			res.status(500).json({
				success: false,
				message: 'Internal Server Error'
			})
			return
		}
	}
}
