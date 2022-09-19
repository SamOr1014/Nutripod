import { Request, Response } from 'express'
import { logger } from '../configs/winston'
import { DietRecordServices } from '../services/dietRecordServices'
import { formatDate, formatLastDate, formatToMonthStartAndEnd, formatToLastMonthStartAndEnd, daysInMonth } from '../utilities/formatDate'

export class DietRecordController {
	constructor(private dietRecordService: DietRecordServices) { }

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
			const { sys_bp, dia_bp, dateString, uid } = req.body
			if (!sys_bp || !dia_bp || !dateString || !uid) {
				res.status(400).json({
					success: false,
					message: 'Not Enough Information Provided'
				})
				return
			}
			let date = new Date(dateString).toISOString()
			let formattedDate = formatDate(date)
			let formattedTime = new Date(dateString).toLocaleTimeString()
			const result = await this.dietRecordService.postBP(
				sys_bp,
				dia_bp,
				formattedDate,
				formattedTime,
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
			const { bg, dateString, uid } = req.body
			if (!bg || !uid || !dateString) {
				res.status(400).json({
					success: false,
					message: 'Not Enough Information Provided'
				})
				return
			}
			let date = new Date(dateString).toISOString()
			let formattedDate = formatDate(date)
			let formattedTime = new Date(dateString).toLocaleTimeString()
			console.log(bg, formattedDate, formattedTime, uid)
			const result = await this.dietRecordService.postBG(
				bg,
				formattedDate,
				formattedTime,
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
			let uid = req.params.uid
			let date = req.params.date
			if (!uid || isNaN(parseInt(uid)) || !date) {
				res.status(400).json({
					success: false,
					message: 'No ID Provided'
				})
				return
			}
			let formattedDate = formatDate(date)
			let formattedPreviousDate = formatLastDate(date)

			const todayExercises = await this.dietRecordService.getExerciseByID(
				uid,
				formattedDate
			)

			const yesterdayExercises = await this.dietRecordService.getExerciseByID(
				uid,
				formattedPreviousDate
			)

			if (yesterdayExercises.length === 0 && todayExercises.length === 0) {
				res.status(200).json({ hasExercises: false, message: "no exercise on both days" })
				return
			}

			if (todayExercises.length === 0) {
				res.status(200).json({ hasExercises: false, message: "No exercise for today" })
				return
			}

			if (todayExercises.length > 0) {
				let todayTotalCalories = 0
				let yesterdayTotalCalories = 0
				let difference = 0
				for (let exercise of todayExercises) {
					todayTotalCalories += exercise.duration / 60 * exercise.ex_calories
				}

				if (yesterdayExercises.length > 0) {
					for (let exercise of yesterdayExercises) {
						yesterdayTotalCalories += exercise.duration / 60 * exercise.ex_calories
					}
					let floorTodayTotalCalories = Math.floor(todayTotalCalories)
					let floorYesterdayTotalCalories = Math.floor(yesterdayTotalCalories)
					difference = ((floorTodayTotalCalories - floorYesterdayTotalCalories) / floorYesterdayTotalCalories) * 100

					res.status(200).json({
						hasExercises: true, message: "had exercises",
						rate: Math.round(difference), todayCalories: floorTodayTotalCalories,
						exercise: todayExercises
					})
					return
				}
				res.status(200).json({
					hasExercises: true, message: "had exercises"
					, todayCalories: Math.floor(todayTotalCalories), exercise: todayExercises
				})
			}

		} catch (e) {
			logger.error(e.message)
			res.status(500).json({ success: false })
			return
		}
	}

	getMonthlyExercises = async (req: Request, res: Response) => {

		try {
			let uid = req.params.uid
			let date = req.params.date
			if (!uid || isNaN(parseInt(uid)) || !date) {
				res.status(400).json({
					success: false,
					message: 'No ID Provided'
				})
				return
			}

			const selectDay = new Date(date)
			const day = new Date
			const today = day.getDate()
			const numbersOfDay = daysInMonth(selectDay)

			const formattedDate = formatToMonthStartAndEnd(selectDay)
			const formattedLastDate = formatToLastMonthStartAndEnd(selectDay)

			const thisMonthExercises = await this.dietRecordService.
				getMonthlyExercisesByID(uid, formattedDate.start, formattedDate.end)

			const lastMonthExercises = await this.dietRecordService.
				getMonthlyExercisesByID(uid, formattedLastDate.start, formattedLastDate.end)

			if (lastMonthExercises.length === 0 && thisMonthExercises.length === 0) {
				res.status(200).json({ is_exercised: false, message: "No exercises in 2 months!" })
				return
			}

			if (thisMonthExercises.length === 0) {
				res.status(200).json({ is_exercised: false, message: "No exercises in this months!" })
				return
			}

			if (thisMonthExercises.length > 0) {
				let thisMonthTotalCalories = 0
				let lastMonthTotalCalories = 0
				let difference = 0
				for (let exercise of thisMonthExercises) {
					thisMonthTotalCalories += exercise.duration / 60 * exercise.ex_calories
				}
				if (lastMonthExercises.length > 0) {
					for (let exercise of lastMonthExercises) {
						lastMonthTotalCalories += exercise.duration / 60 * exercise.ex_calories
					}
					let thisMonthAverage = thisMonthTotalCalories / numbersOfDay
					let lastMonthAverage = lastMonthTotalCalories / numbersOfDay
					difference = ((thisMonthAverage - lastMonthAverage) / lastMonthAverage) * 100

					res.status(200).json({
						is_exercised: true, message: "had exercises in both months"
						, rate: Math.round(difference), averageCalories: Math.round(thisMonthTotalCalories / today)
					})
					return
				}
				res.status(200).json({
					is_exercised: true, message: "Only exercise in this month"
					, averageCalories: Math.round(thisMonthTotalCalories / today)
				})
			}


		} catch (e) {
			logger.error(e.message)
			res.status(500).json({ success: false })
			return
		}
	}

	getDailyInTakeByID = async (req: Request, res: Response) => {

		try {
			let uid = req.params.uid
			let date = req.params.date

			if (!uid || isNaN(parseInt(uid)) || !date) {
				res.status(400).json({
					success: false,
					message: 'No ID Provided'
				})
				return
			}

			let formattedDate = formatDate(date)
			let formattedPreviousDate = formatLastDate(date)

			const todayIntake = await this.dietRecordService.getFoodIntakeByID(uid, formattedDate)
			const yesterdayIntake = await this.dietRecordService.getFoodIntakeByID(uid, formattedPreviousDate)

			if (todayIntake.length === 0 && yesterdayIntake.length === 0) {
				res.status(200).json({ inTake: false, message: "No Intake for two days" })
				return
			}

			if (todayIntake.length === 0) {
				res.status(200).json({ inTake: false, message: "No Intake for today" })
				return
			}

			if (todayIntake.length > 0) {
				let todayIntakeCalories = 0
				let yesterdayIntakeCalories = 0
				let difference = 0
				for (let intake of todayIntake) {
					console.log(intake)
					todayIntakeCalories += intake.food_calories * intake.food_amount
				}
				if (yesterdayIntake.length > 0) {
					for (let intake of yesterdayIntake) {
						yesterdayIntakeCalories += intake.food_calories * intake.food_amount
					}
					difference = ((todayIntakeCalories - yesterdayIntakeCalories) / yesterdayIntakeCalories) * 100

					res.status(200).json({
						inTake: true, message: "Intake for two days",
						rate: Math.round(difference), intakeCalories: todayIntakeCalories / 100,
						diet: todayIntake
					})
					return
				}
				res.status(200).json({
					inTake: true, message: "Intake for today",
					intakeCalories: todayIntakeCalories / 100, diet: todayIntake
				})
				return
			}

		} catch (e) {
			logger.error(e.message)
			res.status(500).json({ success: false })
			return
		}
	}

	getMonthlyInTakeByID = async (req: Request, res: Response) => {

		try {
			let uid = req.params.uid
			let date = req.params.date

			if (!uid || isNaN(parseInt(uid)) || !date) {
				res.status(400).json({
					success: false,
					message: 'No ID Provided'
				})
				return
			}

			const selectDay = new Date(date)
			const day = new Date
			const today = day.getDate()
			const numbersOfDay = daysInMonth(selectDay)

			const formattedDate = formatToMonthStartAndEnd(selectDay)
			const formattedLastDate = formatToLastMonthStartAndEnd(selectDay)

			const thisMonthIntake = await this.dietRecordService.
				getFoodMonthlyIntakeByID(uid, formattedDate.start, formattedDate.end)

			const lastMonthIntake = await this.dietRecordService.
				getFoodMonthlyIntakeByID(uid, formattedLastDate.start, formattedLastDate.end)

			if (thisMonthIntake.length === 0 && lastMonthIntake.length === 0) {
				res.status(200).json({ inTake: false, message: "No intake in 2 months!" })
				return
			}

			if (thisMonthIntake.length === 0) {
				res.status(200).json({ inTake: false, message: "No intake in this month!" })
				return
			}

			if (thisMonthIntake.length > 0) {
				let thisMonthFoodIntake = 0
				let lastMonthFoodIntake = 0
				let difference = 0
				for (let intake of thisMonthIntake) {
					thisMonthFoodIntake += intake.food_calories * intake.food_amount
				}
				if (lastMonthIntake.length > 0) {
					for (let intake of lastMonthIntake) {
						lastMonthFoodIntake += intake.food_calories * intake.food_amount
					}
					let thisMonthAverage = thisMonthFoodIntake / numbersOfDay
					let lastMonthAverage = lastMonthFoodIntake / numbersOfDay
					difference = ((thisMonthAverage - lastMonthAverage) / lastMonthAverage) * 100

					res.status(200).json({
						inTake: true, message: "Have intake in both months",
						rate: Math.round(difference), thisMonthIntake: Math.round(thisMonthAverage / 100 / today)
					})
				}
				res.status(200).json({
					inTake: true, message: "intake for this month only",
					thisMonthIntake: Math.round(thisMonthFoodIntake / 100 / today)
				})
			}
		} catch (e) {
			logger.error(e.message)
			res.status(500).json({ success: false })
			return
		}
	}

	addExercise = async (req: Request, res: Response) => {

		try {
			let uid = req.params.uid
			let date = req.params.date
			let exercise = req.body.values.exercise
			let duration = req.body.values.duration
			if (!uid || isNaN(parseInt(uid)) || !date || !exercise || !duration) {
				res.status(400).json({
					success: false,
					message: 'Lack of information provided'
				})
				return
			}

			let formattedDate = formatDate(date)

			const result = await this.dietRecordService.addExercise(uid,formattedDate,exercise,duration)

			if(result) {
				res.status(200).json({success:true})
				return
			}

		} catch (e) {
			logger.error(e.message)
			res.status(500).json({ success: false })
			return
		}

	}
}


