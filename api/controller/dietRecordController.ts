import { Request, Response } from 'express'
import { logger } from '../configs/winston'
import { DietRecordServices } from '../services/dietRecordServices'
import { formatDate } from '../utilities/formatDate'

export class DietRecordController {
	constructor(private dietRecordService: DietRecordServices) {}

	//##############Weight BP BG Record Controller#############################

	getWeightByUserID = async (req: Request, res: Response) => {
		try {
			let userID = req.params.uid
			const weightRec = await this.dietRecordService.getWeightByUserID(
				userID
			)
			res.status(200).json({ success: true, weightRec: weightRec })
		} catch (e) {
			logger.error(e.message)
			res.status(500).json({ success: false })
			return
		}
	}

	postWeight = async (req: Request, res: Response) => {
		try {
			const { weight, date, uid } = req.body
			if (!weight || !date || !uid) {
				res.status(400).json({
					success: false,
					message: 'Invalid Info Provided'
				})
				return
			}
			let formattedDate = formatDate(date)
			const result = await this.dietRecordService.postWeight(
				weight,
				formattedDate,
				uid
			)
			res.status(200).json({ success: true, result: result })
		} catch (e) {
			logger.error(e.message)
			res.status(500).json({ success: false })
			return
		}
	}

	deleteWeightRecord = async (req: Request, res: Response) => {
		try {
			let rid = req.params.rid
			if (!rid || isNaN(parseInt(rid))) {
				res.status(400).json({
					success: false,
					message: 'Invaild Information Provided'
				})
				return
			}
			const deletedRec = await this.dietRecordService.deleteWeightRecord(
				rid
			)
			res.status(200).json({ success: true, deletedRec: deletedRec })
		} catch (e) {
			logger.error(e.message)
			res.status(500).json({ success: false })
			return
		}
	}

	getBPByUserID = async (req: Request, res: Response) => {
		try {
			const bpRec = await this.dietRecordService.getBPByUserID(
				req.params.uid
			)
			res.status(200).json({ success: true, bpRec: bpRec })
		} catch (e) {
			logger.error(e.message)
			res.status(500).json({ success: false })
			return
		}
	}

	postBP = async (req: Request, res: Response) => {
		try {
			const { sys_bp, dia_bp, date, time, uid } = req.body
			if (!sys_bp || !dia_bp || !date || !time || !uid) {
				res.status(400).json({
					success: false,
					message: 'Not Enough Information Provided'
				})
				return
			}
			let formattedDate = formatDate(date)
			const result = await this.dietRecordService.postBP(
				sys_bp,
				dia_bp,
				formattedDate,
				time,
				uid
			)
			res.status(200).json({ success: true, data: result })
		} catch (e) {
			logger.error(e.message)
			res.status(500).json({ success: false })
			return
		}
	}

	deleteBPRecord = async (req: Request, res: Response) => {
		try {
			let rid = req.params.rid
			if (!rid || isNaN(parseInt(rid))) {
				res.status(400).json({
					success: false,
					message: 'Invaild Information Provided'
				})
				return
			}
			const deletedRec = await this.dietRecordService.deleteBPRecord(rid)
			res.status(200).json({ success: true, deletedRec: deletedRec })
		} catch (e) {
			logger.error(e.message)
			res.status(500).json({ success: false })
			return
		}
	}

	getBGByUserID = async (req: Request, res: Response) => {
		try {
			const bgRec = await this.dietRecordService.getBGByUserID(
				req.params.uid
			)
			res.status(200).json({ success: true, bgRec: bgRec })
		} catch (e) {
			logger.error(e.message)
			res.status(500).json({ success: false })
			return
		}
	}

	postBGlu = async (req: Request, res: Response) => {
		try {
			const { bg, date, time, uid } = req.body
			if (!bg || !date || !uid || !time) {
				res.status(400).json({
					success: false,
					message: 'Not Enough Information Provided'
				})
				return
			}
			let formattedDate = formatDate(date)
			const result = await this.dietRecordService.postBG(
				bg,
				formattedDate,
				time,
				uid
			)
			res.status(200).json({ success: true, data: result })
		} catch (e) {
			logger.error(e.message)
			res.status(500).json({ success: false })
			return
		}
	}

	deleteBGRecord = async (req: Request, res: Response) => {
		try {
			let rid = req.params.rid
			if (!rid || isNaN(parseInt(rid))) {
				res.status(400).json({
					success: false,
					message: 'Invaild Information Provided'
				})
				return
			}
			const deletedRec = await this.dietRecordService.deleteBGRecord(rid)
			res.status(200).json({ success: true, deletedRec: deletedRec })
		} catch (e) {
			logger.error(e.message)
			res.status(500).json({ success: false })
			return
		}
	}

	//#########################Exercise Controllers##################################

	getExercisesByID = async (req: Request, res: Response) => {
		try {
			console.log("received in backend")
			let uid = req.params.uid
			let date = req.params.date
			if (!uid || isNaN(parseInt(uid)) || !date) {
				res.status(400).json({
					success: false,
					message: 'No ID Provided'
				})
			}
			let formattedDate = formatDate(date)
			console.log(formattedDate)
			const exerciseRec = await this.dietRecordService.getExerciseByID(
				uid,
				formattedDate
			)
			res.status(200).json({ success: true, exercises: exerciseRec })
		} catch (e) {
			logger.error(e.message)
			res.status(500).json({ success: false })
			return
		}
	}
}
