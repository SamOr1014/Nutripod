import express from 'express'
import { dietRecordController } from '../server'
import { isUserLoggedIn } from "../utilities/guards"

export const dietRecordRoutes = express.Router()

//Weight BP BG Record Routes
dietRecordRoutes.get('/weight/:uid',isUserLoggedIn, dietRecordController.getWeightByUserID)
dietRecordRoutes.get('/bp/:uid', isUserLoggedIn, dietRecordController.getBPByUserID)
dietRecordRoutes.get('/bg/:uid', isUserLoggedIn, dietRecordController.getBGByUserID)

dietRecordRoutes.post('/weight',isUserLoggedIn, dietRecordController.postWeight)
dietRecordRoutes.post('/bp',isUserLoggedIn, dietRecordController.postBP)
dietRecordRoutes.post('/bg',isUserLoggedIn, dietRecordController.postBGlu)

dietRecordRoutes.delete('/weight/:rid',isUserLoggedIn, dietRecordController.deleteWeightRecord)
dietRecordRoutes.delete('/bp/:rid', isUserLoggedIn, dietRecordController.deleteBPRecord)
dietRecordRoutes.delete('/bg/:rid', isUserLoggedIn, dietRecordController.deleteBGRecord)

// Exercise Routes
dietRecordRoutes.get("/exercises/:uid/:date",isUserLoggedIn,dietRecordController.getExercisesByID)
dietRecordRoutes.get("/monthlyExercises/:uid/:date",isUserLoggedIn,dietRecordController.getMonthlyExercises)
dietRecordRoutes.post("/exercises/:uid/:date", isUserLoggedIn, dietRecordController.addExercise)

dietRecordRoutes.get("/search/:food",isUserLoggedIn,dietRecordController.searchFood)
dietRecordRoutes.post("/foodIntake",isUserLoggedIn,dietRecordController.postFood)
dietRecordRoutes.get("/dailyDiet/:uid/:date",isUserLoggedIn,dietRecordController.getDailyInTakeByID)
dietRecordRoutes.get("/monthlyDiet/:uid/:date",isUserLoggedIn,dietRecordController.getMonthlyInTakeByID)


