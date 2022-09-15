import { Request, Response } from 'express'
import { MedicalRecordServices } from '../services/medicalRecordServices'

export class MedicalRecordController {
	constructor(private medicalRecordService: MedicalRecordServices) {}

	getUserMedRecByUserID = async (req: Request, res: Response) => {
		let uid = req.params.uid
		if (!uid) {
			res.status(400).json({
				success: false,
				message: 'No ID provided'
			})
			return
		}
		const medRec = await this.medicalRecordService.getUserMedRecByUserID(
			uid
		)
		res.status(200).json({ success: true, result: medRec })
	}
}
